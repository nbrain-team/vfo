from fastapi import APIRouter
import os

router = APIRouter(prefix="/test", tags=["test"])

@router.get("/config")
async def test_config():
    """Test endpoint to verify configuration"""
    return {
        "google_client_id_configured": bool(os.getenv("GOOGLE_CLIENT_ID")),
        "google_client_secret_configured": bool(os.getenv("GOOGLE_CLIENT_SECRET")),
        "google_project_id_configured": bool(os.getenv("GOOGLE_PROJECT_ID")),
        "secret_key_configured": bool(os.getenv("SECRET_KEY")),
        "database_url_configured": bool(os.getenv("DATABASE_URL")),
        "lawpay_public_key_configured": bool(os.getenv("LAWPAY_PUBLIC_KEY")),
        "lawpay_secret_key_configured": bool(os.getenv("LAWPAY_SECRET_KEY")),
        "frontend_url": os.getenv("FRONTEND_URL", "not set"),
        # Don't expose actual values, just whether they're set
    }
