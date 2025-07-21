from sqlalchemy import Column, Integer, String, Table, ForeignKey
from sqlalchemy.orm import relationship
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
    hashed_password = Column(String, nullable=False)
    
    entities = relationship("Entity",
                             secondary=user_entity_association,
                             back_populates="users")

class Entity(Base):
    __tablename__ = "entities"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    
    users = relationship("User",
                         secondary=user_entity_association,
                         back_populates="entities") 