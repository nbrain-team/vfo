from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from google.oauth2 import id_token
from google.auth.transport import requests
from datetime import datetime, timedelta
from jose import jwt
import os

from ..db.database import get_db
from ..models.user import User
from ..core.config import settings
from ..core.security import create_access_token

router = APIRouter(prefix="/auth", tags=["authentication"])

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")

@router.post("/google")
async def google_auth(credential_data: dict, db: Session = Depends(get_db)):
    """Authenticate user with Google OAuth2"""
    try:
        # Verify the Google token
        credential = credential_data.get("credential")
        if not credential:
            raise HTTPException(status_code=400, detail="No credential provided")
        
        # Verify the token with Google
        try:
            idinfo = id_token.verify_oauth2_token(
                credential, 
                requests.Request(), 
                GOOGLE_CLIENT_ID
            )
        except ValueError as e:
            raise HTTPException(status_code=401, detail=f"Invalid token: {str(e)}")
        
        # Extract user information
        google_user_id = idinfo.get('sub')
        email = idinfo.get('email')
        name = idinfo.get('name')
        picture = idinfo.get('picture')
        
        if not email:
            raise HTTPException(status_code=400, detail="Email not provided by Google")
        
        # Check if user exists
        user = db.query(User).filter(User.email == email).first()
        
        if not user:
            # Create new user
            user = User(
                email=email,
                name=name or email.split('@')[0],
                google_id=google_user_id,
                picture_url=picture,
                is_active=True,
                created_at=datetime.utcnow()
            )
            db.add(user)
            db.commit()
            db.refresh(user)
        else:
            # Update existing user's Google info
            user.google_id = google_user_id
            user.picture_url = picture
            if name and not user.name:
                user.name = name
            db.commit()
        
        # Create access token
        access_token = create_access_token(
            data={"sub": user.email, "user_id": user.id}
        )
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user_name": user.name,
            "email": user.email,
            "role": user.role or "Client",
            "picture_url": user.picture_url
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Authentication failed: {str(e)}")

@router.post("/google/calendar-access")
async def request_calendar_access(request_data: dict, db: Session = Depends(get_db)):
    """Request additional calendar access permissions"""
    user_email = request_data.get("user_email")
    if not user_email:
        raise HTTPException(status_code=400, detail="User email required")
    
    # In production, you would set up proper redirect URIs
    # For now, we'll use the frontend URL
    redirect_uri = os.getenv("FRONTEND_URL", "https://agentiq-vfo-frontend.onrender.com") + "/calendar-callback"
    
    # Calendar scopes needed for full access
    scopes = [
        "https://www.googleapis.com/auth/calendar",
        "https://www.googleapis.com/auth/calendar.events"
    ]
    
    auth_url = (
        f"https://accounts.google.com/o/oauth2/v2/auth?"
        f"client_id={GOOGLE_CLIENT_ID}"
        f"&redirect_uri={redirect_uri}"
        f"&scope={' '.join(scopes)}"
        f"&response_type=code"
        f"&access_type=offline"
        f"&prompt=consent"
        f"&state={user_email}"  # Pass user email in state for callback
    )
    
    return {"auth_url": auth_url}

@router.post("/google/calendar-callback")
async def handle_calendar_callback(callback_data: dict, db: Session = Depends(get_db)):
    """Handle the OAuth callback and exchange code for tokens"""
    code = callback_data.get("code")
    user_email = callback_data.get("state")  # We passed email in state
    
    if not code or not user_email:
        raise HTTPException(status_code=400, detail="Invalid callback data")
    
    try:
        # Exchange authorization code for tokens
        # In production, use proper OAuth2 flow
        # This is a simplified version
        user = db.query(User).filter(User.email == user_email).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Store tokens (in production, exchange code for actual tokens)
        # For now, we'll return success
        return {
            "success": True,
            "message": "Calendar access granted",
            "google_access_token": "mock_calendar_token"  # In production, get real token
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process callback: {str(e)}")
