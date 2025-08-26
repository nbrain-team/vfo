from app.db.database import Base, engine
from app.models.user import User, Entity
from app.models.legal import Document, DocumentChunk
from app.models.agent import Agent
from sqlalchemy import text

def init_db():
    Base.metadata.create_all(bind=engine) 
    # Post-creation: ensure columns exist for Entity extensions (idempotent) when using existing DB
    with engine.connect() as conn:
        try:
            conn.execute(text("ALTER TABLE entities ADD COLUMN IF NOT EXISTS practice_area VARCHAR"))
            conn.execute(text("ALTER TABLE entities ADD COLUMN IF NOT EXISTS contact_email VARCHAR"))
            conn.execute(text("ALTER TABLE entities ADD COLUMN IF NOT EXISTS contact_phone VARCHAR"))
            conn.execute(text("ALTER TABLE entities ADD COLUMN IF NOT EXISTS external_id VARCHAR"))
        except Exception:
            pass