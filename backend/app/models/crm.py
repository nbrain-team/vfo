from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.database import Base


class Contact(Base):
    __tablename__ = "contacts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    email = Column(String, index=True, nullable=True)
    phone = Column(String, nullable=True)
    external_id = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)

    matters = relationship("Matter", back_populates="contact")


class Matter(Base):
    __tablename__ = "matters"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    pipeline = Column(String, index=True, nullable=True)
    stage = Column(String, index=True, nullable=True)
    contact_id = Column(Integer, ForeignKey("contacts.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)

    contact = relationship("Contact", back_populates="matters")


