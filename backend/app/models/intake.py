from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.database import Base


class Intake(Base):
    __tablename__ = "intakes"

    id = Column(Integer, primary_key=True, index=True)
    matter_id = Column(Integer, ForeignKey("matters.id"), nullable=False)
    name = Column(String, nullable=False)
    status = Column(String, nullable=True, default="issued")
    data_json = Column(Text, nullable=True)
    compiled_path = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)


class FieldMapping(Base):
    __tablename__ = "field_mappings"

    id = Column(Integer, primary_key=True, index=True)
    mapping_json = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)


