from app.db.database import Base, engine
from app.models.user import User, Entity
from app.models.legal import Document, DocumentChunk
from app.models.agent import Agent
from app.models.crm import Contact, Matter
from app.models.intake import Intake, FieldMapping
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
            # Ensure new User advisor fields exist as well
            conn.execute(text("ALTER TABLE users ADD COLUMN IF NOT EXISTS username VARCHAR UNIQUE"))
            conn.execute(text("ALTER TABLE users ADD COLUMN IF NOT EXISTS advisor_id INTEGER REFERENCES users(id)"))
            # Ensure CRM advisor link exists
            conn.execute(text("ALTER TABLE matters ADD COLUMN IF NOT EXISTS advisor_id INTEGER REFERENCES users(id)"))
        except Exception:
            pass