from fastapi import APIRouter, Header, HTTPException, Depends
import os
from sqlalchemy import text
from sqlalchemy.orm import Session
from app.db.database import engine, get_db
from app.api.api import get_current_user
from app.models.user import User as UserModel
from app.core.security import encrypt_secret
import base64

router = APIRouter(prefix="/admin", tags=["admin"])


@router.post("/migrations/google-auth")
def run_google_auth_migration(current_user = Depends(get_current_user)):
    if getattr(current_user, "role", None) not in ["Admin", "SuperAdmin"]:
        raise HTTPException(status_code=401, detail="Unauthorized")

    from app.db.migrations.add_google_auth_fields import upgrade
    try:
        upgrade()
        return {"ok": True, "message": "Migration applied"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Migration failed: {e}")


@router.post("/migrations/advisor-fields")
def run_advisor_fields_migration(current_user = Depends(get_current_user)):
    if getattr(current_user, "role", None) not in ["Admin", "SuperAdmin"]:
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
def run_entity_extensions_migration(current_user = Depends(get_current_user)):
    if getattr(current_user, "role", None) not in ["Admin", "SuperAdmin"]:
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


@router.post("/migrations/crm-advisor-link")
def run_crm_advisor_link_migration(current_user = Depends(get_current_user)):
    if getattr(current_user, "role", None) not in ["Admin", "SuperAdmin"]:
        raise HTTPException(status_code=401, detail="Unauthorized")

    try:
        with engine.connect() as conn:
            conn.execute(text("ALTER TABLE matters ADD COLUMN IF NOT EXISTS advisor_id INTEGER REFERENCES users(id)"))
            conn.commit()
        return {"ok": True, "message": "Matters.advisor_id ensured"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Migration failed: {e}")


@router.post("/migrations/backfill-google-token-encryption")
def backfill_google_token_encryption(current_user = Depends(get_current_user), db: Session = Depends(get_db)):
    """Encrypt existing plaintext google_refresh_token values into *_enc/iv and null the plaintext.

    Idempotent: skips rows already populated.
    Requires APP_DEK to be set to a strong 32-byte value in the environment.
    """
    if getattr(current_user, "role", None) not in ["Admin", "SuperAdmin"]:
        raise HTTPException(status_code=401, detail="Unauthorized")

    app_dek = os.getenv("APP_DEK")
    if not app_dek or len(app_dek) < 32:
        raise HTTPException(status_code=500, detail="APP_DEK not configured or too short (>=32 bytes required)")

    users = (
        db.query(UserModel)
        .filter(UserModel.google_refresh_token.isnot(None))
        .all()
    )

    processed = 0
    skipped = 0
    for u in users:
        try:
            if getattr(u, "google_refresh_token_enc", None):
                skipped += 1
                continue
            raw = u.google_refresh_token
            if not raw:
                skipped += 1
                continue
            ciphertext, iv = encrypt_secret(raw)
            u.google_refresh_token_enc = base64.b64encode(ciphertext).decode("utf-8")
            u.google_refresh_token_iv = base64.b64encode(iv).decode("utf-8")
            # Null out plaintext
            u.google_refresh_token = None
            db.add(u)
            processed += 1
        except Exception:
            db.rollback()
            raise

    db.commit()
    return {"ok": True, "processed": processed, "skipped": skipped}


@router.post("/migrations/drop-plaintext-google-refresh-token")
def drop_plaintext_google_refresh_token(current_user = Depends(get_current_user)):
    """Drop the plaintext google_refresh_token column after verifying backfill."""
    if getattr(current_user, "role", None) not in ["Admin", "SuperAdmin"]:
        raise HTTPException(status_code=401, detail="Unauthorized")

    try:
        with engine.connect() as conn:
            conn.execute(text("ALTER TABLE users DROP COLUMN IF EXISTS google_refresh_token"))
            conn.commit()
        return {"ok": True, "message": "Dropped plaintext google_refresh_token column"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to drop column: {e}")
