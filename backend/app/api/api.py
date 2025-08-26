from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from app.db import crud
from app.schemas.user import User, UserCreate, Entity, EntityCreate, Contact, ContactCreate, Matter, MatterCreate, Intake, IntakeCreate, FieldMapping, PublicLead
from app.db.database import get_db
from app.core.security import create_access_token, ALGORITHM, verify_password
from app.core.config import settings
from datetime import timedelta
from app.models.user import User as UserModel
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
    # Include user's name in the response
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "user_name": user.name if hasattr(user, 'name') and user.name else user.email.split('@')[0]
    }

@router.get("/users/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user

@router.get("/entities/", response_model=List[Entity])
async def read_entities_for_user(current_user: User = Depends(get_current_user)):
    return current_user.entities

@router.post("/users/", response_model=User)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)

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