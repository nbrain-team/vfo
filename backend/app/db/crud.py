from sqlalchemy.orm import Session
from app.models.user import User, Entity
from app.schemas.user import UserCreate, EntityCreate
from app.core.security import get_password_hash

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, user: UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = User(
        email=user.email, 
        hashed_password=hashed_password,
        name=user.name,
        role=user.role,
        username=user.username,
        advisor_id=user.advisor_id
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def create_entity(db: Session, entity: EntityCreate):
    db_entity = Entity(**entity.dict())
    db.add(db_entity)
    db.commit()
    db.refresh(db_entity)
    return db_entity 