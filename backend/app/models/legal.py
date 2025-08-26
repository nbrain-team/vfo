from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
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


class DocumentChunk(Base):
    __tablename__ = "document_chunks"

    id = Column(String, primary_key=True, index=True)
    document_id = Column(String, index=True, nullable=False)
    entity_id = Column(String, index=True, nullable=True)
    user_id = Column(String, index=True, nullable=True)
    document_type = Column(String, index=True, nullable=True)
    file_name = Column(String, nullable=True)
    chunk_index = Column(Integer, nullable=False)
    page_number = Column(Integer, nullable=True)
    chunk_text = Column(Text, nullable=False)
    embedding = Column(Text, nullable=True)  # Stored as JSON string
    created_at = Column(DateTime, default=datetime.utcnow)