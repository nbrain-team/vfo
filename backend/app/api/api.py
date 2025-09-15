from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from app.db import crud
from app.schemas.user import User, UserCreate, UserUpdate, Entity, EntityCreate, Contact, ContactCreate, Matter, MatterCreate, Intake, IntakeCreate, FieldMapping, PublicLead
from app.db.database import get_db
from app.core.security import create_access_token, ALGORITHM, verify_password
from app.core.config import settings
from datetime import timedelta, datetime
from app.models.user import User as UserModel
from app.models.crm import Contact as ContactModel, Matter as MatterModel
from typing import List


router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/token")

# Dependency
def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = crud.get_user_by_email(db, email=email)
    if user is None:
        raise credentials_exception
    return user

@router.post("/token")
def login_for_access_token(db: Session = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()):
    user = crud.get_user_by_email(db, email=form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    # Include user's name and role in the response
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "user_name": user.name if hasattr(user, 'name') and user.name else user.email.split('@')[0],
        "role": user.role if hasattr(user, 'role') else "Client",
        "user_id": user.id
    }

@router.get("/users/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user

@router.get("/users/me/default-entity")
def get_or_create_default_entity(db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    entity = None
    if current_user.entities:
        entity = current_user.entities[0]
    if not entity:
        # Create a default entity for the user
        entity = crud.create_entity(db=db, entity=EntityCreate(name=current_user.name or current_user.email.split('@')[0]))
        # Link entity to user
        current_user.entities.append(entity)
        db.add(current_user)
        db.commit()
        db.refresh(current_user)
    return {"entity_id": entity.id}

@router.get("/entities/", response_model=List[Entity])
async def read_entities_for_user(current_user: User = Depends(get_current_user)):
    return current_user.entities

@router.post("/users/", response_model=User)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    # Check if username is taken (for advisors)
    if user.username:
        existing_username = db.query(UserModel).filter(UserModel.username == user.username).first()
        if existing_username:
            raise HTTPException(status_code=400, detail="Username already taken")
    return crud.create_user(db=db, user=user)

@router.get("/advisors/", response_model=List[User])
def get_active_advisors(db: Session = Depends(get_db)):
    """Get list of active advisors for client signup"""
    return db.query(UserModel).filter(
        UserModel.role == "Advisor",
        UserModel.is_active == True
    ).all()

@router.get("/advisors/check-username/{username}")
def check_username_availability(username: str, db: Session = Depends(get_db)):
    """Check if username is available for advisor"""
    existing = db.query(UserModel).filter(UserModel.username == username).first()
    return {"available": existing is None}

@router.patch("/users/{user_id}", response_model=User)
def update_user(user_id: int, user_update: UserUpdate, db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    """Update user details"""
    # Only allow admins to update other users, or users to update themselves
    if current_user.role != "Admin" and current_user.id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to update this user")
    
    user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    update_data = user_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(user, key, value)
    
    db.commit()
    db.refresh(user)
    return user

@router.post("/entities/", response_model=Entity)
def create_entity(entity: EntityCreate, db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    return crud.create_entity(db=db, entity=entity) 

# --- CRM ---
@router.post("/contacts/", response_model=Contact)
def create_contact(contact: ContactCreate, db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    from app.models.crm import Contact as ContactModel
    db_obj = ContactModel(**contact.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@router.get("/contacts/", response_model=List[Contact])
def list_contacts(db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    from app.models.crm import Contact as ContactModel
    return db.query(ContactModel).all()

@router.post("/matters/", response_model=Matter)
def create_matter(matter: MatterCreate, db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    from app.models.crm import Matter as MatterModel
    db_obj = MatterModel(**matter.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@router.get("/matters/", response_model=List[Matter])
def list_matters(db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    from app.models.crm import Matter as MatterModel
    return db.query(MatterModel).all()

@router.patch("/matters/{matter_id}")
def update_matter(matter_id: int, stage: str = None, db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    """Update matter stage or other properties"""
    from app.models.crm import Matter as MatterModel
    matter = db.query(MatterModel).filter(MatterModel.id == matter_id).first()
    if not matter:
        raise HTTPException(status_code=404, detail="Matter not found")
    
    if stage is not None:
        matter.stage = stage
        matter.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(matter)
    return matter

@router.get("/conflict-check")
def conflict_check(q: str, db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    from app.models.crm import Contact as ContactModel, Matter as MatterModel
    contacts = db.query(ContactModel).filter(ContactModel.name.ilike(f"%{q}%")).all()
    matters = db.query(MatterModel).filter(MatterModel.title.ilike(f"%{q}%")).all()
    return {
        'query': q,
        'contacts': [{'id': c.id, 'name': c.name, 'email': c.email} for c in contacts],
        'matters': [{'id': m.id, 'title': m.title, 'pipeline': m.pipeline, 'stage': m.stage} for m in matters]
    }

# --- Intake Management ---
@router.post("/intakes/", response_model=Intake)
def create_intake(payload: IntakeCreate, db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    from app.models.intake import Intake as IntakeModel
    db_obj = IntakeModel(**payload.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@router.get("/intakes/", response_model=List[Intake])
def list_intakes(matter_id: int | None = None, db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    from app.models.intake import Intake as IntakeModel
    q = db.query(IntakeModel)
    if matter_id:
        q = q.filter(IntakeModel.matter_id == matter_id)
    return q.all()

@router.post("/field-mappings", response_model=FieldMapping)
def upsert_field_mapping(mapping: FieldMapping, db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    from app.models.intake import FieldMapping as FieldMappingModel
    db_obj = db.query(FieldMappingModel).first()
    if db_obj:
        db_obj.mapping_json = mapping.mapping_json
    else:
        db_obj = FieldMappingModel(mapping_json=mapping.mapping_json)
        db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@router.get("/field-mappings", response_model=FieldMapping | None)
def get_field_mapping(db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    from app.models.intake import FieldMapping as FieldMappingModel
    return db.query(FieldMappingModel).first()

# --- Pipeline Analytics ---
@router.get("/pipeline/stats")
def get_pipeline_stats(
    period: str = "month",
    advisor_id: int | None = None,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    """Get advisor-scoped pipeline statistics for dashboard KPIs.

    Defaults to the current advisor when an Advisor is logged in. For Clients,
    it will scope to their advisor. SuperAdmin/Admin may pass advisor_id to
    scope to a specific advisor; otherwise returns aggregate across all advisors.
    """
    from app.models.crm import Matter as MatterModel
    from datetime import datetime, timedelta
    
    # Filter by period
    now = datetime.utcnow()
    if period == "month":
        start_date = now - timedelta(days=30)
    else:
        start_date = datetime(2000, 1, 1)  # inception
    
    # Determine effective advisor scope
    effective_advisor_id: int | None = None
    try:
        if getattr(current_user, "role", None) == "Advisor":
            effective_advisor_id = current_user.id
        elif getattr(current_user, "role", None) == "Client" and getattr(current_user, "advisor_id", None):
            effective_advisor_id = current_user.advisor_id
        elif advisor_id is not None:
            effective_advisor_id = advisor_id
    except Exception:
        effective_advisor_id = advisor_id

    # Build query
    q = db.query(MatterModel).filter(MatterModel.created_at >= start_date)
    if effective_advisor_id is not None:
        q = q.filter(MatterModel.advisor_id == effective_advisor_id)
    matters = q.all()
    
    # Calculate KPIs
    stats = {
        "leads": len([m for m in matters if m.stage == "New"]),
        "booked": len([m for m in matters if m.stage in ["Booked", "Paid"]]),
        "showed": len([m for m in matters if m.stage in ["Signed", "Onboarding", "Completed"]]),
        "signed": len([m for m in matters if m.stage in ["Signed", "Completed"]]),
        "matters_in_process": len([m for m in matters if m.stage == "Onboarding"]),
        "completed": len([m for m in matters if m.stage == "Completed"]),
        "period": period
    }
    
    # Calculate show up ratio
    stats["show_up_ratio"] = (
        round((stats["showed"] / stats["booked"]) * 100) if stats["booked"] > 0 else 0
    )
    
    # Average $ per matter (mock for now)
    stats["avg_dollar_per_matter"] = 18500 if stats["signed"] > 0 else 0
    
    # Total pipeline counts by stage
    stats["pipeline_stages"] = {
        "Booked Consults": stats["booked"],
        "Pre-Engagement": stats["leads"],
        "Engaged": stats["signed"],
        "Questionnaire Received": 0,  # TODO: implement questionnaire tracking
        "Matter in Process": stats["matters_in_process"],
        "Matter Fulfilled": stats["completed"]
    }
    
    return stats

# --- Public endpoint to create CRM records from public booking ---
@router.post("/public/lead")
def public_lead_submit(payload: PublicLead, db: Session = Depends(get_db)):
    from app.models.crm import Contact as ContactModel, Matter as MatterModel
    from app.models.intake import Intake as IntakeModel
    # Upsert contact by email if provided
    contact = None
    if payload.email:
        contact = db.query(ContactModel).filter(ContactModel.email == payload.email).first()
    if not contact:
        contact = ContactModel(
            name=payload.name,
            email=payload.email,
            phone=payload.phone,
            external_id=None,
        )
        db.add(contact)
        db.flush()

    # Create matter for this contact
    title = f"{payload.pkg or 'Consult'} - {payload.slot or 'Booking'}"
    matter = MatterModel(
        title=title,
        pipeline="Public Intake",
        stage="Booked",
        contact_id=contact.id,
    )
    db.add(matter)
    db.flush()

    # Store intake details JSON
    # Persist intake data as JSON string
    data = payload.model_dump()
    from json import dumps as json_dumps
    intake = IntakeModel(
        matter_id=matter.id,
        name="Public Booking Intake",
        status="submitted",
        data_json=json_dumps(data),
    )
    db.add(intake)
    db.commit()
    db.refresh(contact)
    db.refresh(matter)
    db.refresh(intake)
    return {
        "contact_id": contact.id,
        "matter_id": matter.id,
        "intake_id": intake.id,
    }

# --- Client appointment request ---
@router.post("/clients/request-appointment")
def client_request_appointment(
    desired_time: str | None = None,
    notes: str | None = None,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    """Client requests an appointment. Creates a Contact and Matter linked to the client's advisor."""
    if current_user.role != "Client":
        raise HTTPException(status_code=403, detail="Only clients can request appointments")
    if not current_user.advisor_id:
        raise HTTPException(status_code=400, detail="Client is not linked to an advisor")

    # Upsert contact by client email
    contact = db.query(ContactModel).filter(ContactModel.email == current_user.email).first()
    if not contact:
        contact = ContactModel(name=current_user.name or current_user.email, email=current_user.email, phone=None)
        db.add(contact)
        db.flush()

    # Create a matter linked to advisor
    matter = MatterModel(
        title=f"Consultation Request - {current_user.email}",
        pipeline="Client Portal",
        stage="New",
        contact_id=contact.id,
        advisor_id=current_user.advisor_id
    )
    db.add(matter)
    db.commit()
    db.refresh(matter)
    return {"ok": True, "matter_id": matter.id}