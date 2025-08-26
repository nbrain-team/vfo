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
        from_attributes = True

# User Schemas
class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    entities: List[Entity] = []

    class Config:
        from_attributes = True

Entity.update_forward_refs() 

# CRM Schemas
class ContactBase(BaseModel):
    name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    external_id: Optional[str] = None

class ContactCreate(ContactBase):
    pass

class Contact(ContactBase):
    id: int
    class Config:
        from_attributes = True

class MatterBase(BaseModel):
    title: str
    pipeline: Optional[str] = None
    stage: Optional[str] = None
    contact_id: int

class MatterCreate(MatterBase):
    pass

class Matter(MatterBase):
    id: int
    class Config:
        from_attributes = True

# Intake Schemas
class IntakeBase(BaseModel):
    matter_id: int
    name: str
    status: Optional[str] = None
    data_json: Optional[str] = None

class IntakeCreate(IntakeBase):
    pass

class Intake(IntakeBase):
    id: int
    class Config:
        from_attributes = True

class FieldMapping(BaseModel):
    id: int
    mapping_json: str
    class Config:
        from_attributes = True

# Public intake (lead) submission schema
class PublicLead(BaseModel):
    name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    pkg: Optional[str] = None
    slot: Optional[str] = None
    guests: Optional[List[str]] = None
    referralSource: Optional[str] = None
    referralOther: Optional[str] = None
    stateOfResidence: Optional[str] = None
    citizenship: Optional[str] = None
    citizenshipOther: Optional[str] = None
    maritalStatus: Optional[str] = None
    priority: Optional[List[str]] = None
    priorityOther: Optional[str] = None
    assetTypes: Optional[List[str]] = None
    assetTypesOther: Optional[str] = None
    urgency: Optional[str] = None
    assetValueRange: Optional[str] = None
    price: Optional[dict] = None