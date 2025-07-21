from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class DocumentBase(BaseModel):
    name: str
    document_type: Optional[str] = None

class DocumentCreate(DocumentBase):
    pass

class Document(DocumentBase):
    id: int
    entity_id: int
    upload_date: datetime
    
    class Config:
        orm_mode = True 