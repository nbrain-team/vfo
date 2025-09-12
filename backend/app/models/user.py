from sqlalchemy import Column, Integer, String, Table, ForeignKey, Boolean, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.database import Base

user_entity_association = Table(
    'user_entity_association', Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id')),
    Column('entity_id', Integer, ForeignKey('entities.id'))
)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=True)  # Nullable for Google-only users
    name = Column(String, nullable=True)
    role = Column(String, default="Client")  # "Admin", "Advisor", "Client"
    google_id = Column(String, unique=True, nullable=True)
    picture_url = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    google_access_token = Column(String, nullable=True)
    google_refresh_token = Column(String, nullable=True)
    # For advisors
    username = Column(String, unique=True, nullable=True)  # For public URL
    # For clients - link to their advisor
    advisor_id = Column(Integer, ForeignKey('users.id'), nullable=True)
    
    entities = relationship("Entity",
                             secondary=user_entity_association,
                             back_populates="users")
    
    # Self-referential relationship: many clients -> one advisor
    # Define the many-to-one side with remote_side so SQLAlchemy can resolve it
    advisor = relationship(
        "User",
        remote_side=[id],
        foreign_keys=[advisor_id],
        backref="clients"
    )

class Entity(Base):
    __tablename__ = "entities"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    practice_area = Column(String, nullable=True)
    contact_email = Column(String, nullable=True)
    contact_phone = Column(String, nullable=True)
    external_id = Column(String, nullable=True)
    
    users = relationship("User",
                         secondary=user_entity_association,
                         back_populates="entities") 