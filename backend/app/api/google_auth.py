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
async def request_calendar_access(user_email: str, db: Session = Depends(get_db)):
    """Request additional calendar access permissions"""
    # This endpoint would handle requesting additional OAuth scopes for calendar access
    # For now, return a placeholder response
    return {
        "auth_url": f"https://accounts.google.com/o/oauth2/v2/auth?client_id={GOOGLE_CLIENT_ID}&redirect_uri=YOUR_REDIRECT_URI&scope=https://www.googleapis.com/auth/calendar&response_type=code&access_type=offline&prompt=consent"
    }
