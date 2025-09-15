from fastapi import APIRouter, Header, HTTPException
import os
from sqlalchemy import text
from app.db.database import engine

router = APIRouter(prefix="/admin", tags=["admin"])


@router.post("/migrations/google-auth")
def run_google_auth_migration(x_admin_token: str | None = Header(default=None)):
    expected = os.getenv("ADMIN_TASKS_TOKEN", "")
    if not expected:
        raise HTTPException(status_code=500, detail="ADMIN_TASKS_TOKEN not configured")
    if not x_admin_token or x_admin_token != expected:
        raise HTTPException(status_code=401, detail="Unauthorized")

    from app.db.migrations.add_google_auth_fields import upgrade
    try:
        upgrade()
        return {"ok": True, "message": "Migration applied"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Migration failed: {e}")


@router.post("/migrations/advisor-fields")
def run_advisor_fields_migration(x_admin_token: str | None = Header(default=None)):
    expected = os.getenv("ADMIN_TASKS_TOKEN", "")
    if not expected:
        raise HTTPException(status_code=500, detail="ADMIN_TASKS_TOKEN not configured")
    if not x_admin_token or x_admin_token != expected:
        raise HTTPException(status_code=401, detail="Unauthorized")

    try:
        # Run robust, idempotent DDL to ensure columns exist regardless of migration helper
        with engine.connect() as conn:
            conn.execute(text("ALTER TABLE users ADD COLUMN IF NOT EXISTS username VARCHAR UNIQUE"))
            conn.execute(text("ALTER TABLE users ADD COLUMN IF NOT EXISTS advisor_id INTEGER REFERENCES users(id)"))
            conn.commit()
        return {"ok": True, "message": "Advisor fields ensured (username, advisor_id)"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Migration failed: {e}")


@router.post("/migrations/entity-extensions")
def run_entity_extensions_migration(x_admin_token: str | None = Header(default=None)):
    expected = os.getenv("ADMIN_TASKS_TOKEN", "")
    if not expected:
        raise HTTPException(status_code=500, detail="ADMIN_TASKS_TOKEN not configured")
    if not x_admin_token or x_admin_token != expected:
        raise HTTPException(status_code=401, detail="Unauthorized")

    try:
        with engine.connect() as conn:
            conn.execute(text("ALTER TABLE entities ADD COLUMN IF NOT EXISTS practice_area VARCHAR"))
            conn.execute(text("ALTER TABLE entities ADD COLUMN IF NOT EXISTS contact_email VARCHAR"))
            conn.execute(text("ALTER TABLE entities ADD COLUMN IF NOT EXISTS contact_phone VARCHAR"))
            conn.execute(text("ALTER TABLE entities ADD COLUMN IF NOT EXISTS external_id VARCHAR"))
            conn.commit()
        return {"ok": True, "message": "Entity extension columns ensured"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Migration failed: {e}")
