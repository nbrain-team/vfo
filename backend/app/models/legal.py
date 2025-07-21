from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base
from datetime import datetime

class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    file_path = Column(String, nullable=False)
    document_type = Column(String, nullable=True)
    upload_date = Column(DateTime, default=datetime.utcnow)
    
    entity_id = Column(Integer, ForeignKey("entities.id"))
    entity = relationship("Entity") 