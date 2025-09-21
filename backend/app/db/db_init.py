from app.db.database import Base, engine
from app.models.user import User, Entity
from app.models.legal import Document, DocumentChunk
from app.models.agent import Agent
from app.models.crm import Contact, Matter
from app.models.intake import Intake, FieldMapping
from sqlalchemy import text
import os

def init_db():
    # Avoid runtime DDL in production; rely on Alembic migrations instead.
    if os.getenv("ENVIRONMENT") not in {"production", "prod"}:
        Base.metadata.create_all(bind=engine)