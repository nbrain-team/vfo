from pydantic import BaseModel
from typing import List, Optional

# Entity Schemas
class EntityBase(BaseModel):
    name: str

class EntityCreate(EntityBase):
    pass

class Entity(EntityBase):
    id: int
    users: List["User"] = []

    class Config:
        orm_mode = True

# User Schemas
class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    entities: List[Entity] = []

    class Config:
        orm_mode = True

Entity.update_forward_refs() 