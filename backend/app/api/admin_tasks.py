from fastapi import APIRouter, Header, HTTPException
import os

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

    # Add username and advisor_id columns if missing
    from app.db.migrations.add_advisor_fields import upgrade
    try:
        upgrade()
        return {"ok": True, "message": "Advisor fields migration applied"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Migration failed: {e}")

