from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from app.core.config import settings
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
import os

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

ALGORITHM = "HS256"

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password) 

# --- Application-layer encryption helpers (envelope style) ---
def _get_data_encryption_key() -> bytes:
    # Use a 32-byte key from env; must be set in production
    dek = os.getenv("APP_DEK")
    if not dek or len(dek) < 32:
        # Derive/pad into 32 bytes deterministically for dev only
        padded = (dek or "dev-key").encode("utf-8")
        return (padded + b"0" * 32)[:32]
    return dek.encode("utf-8")[:32]

def encrypt_secret(plaintext: str) -> tuple[bytes, bytes]:
    key = _get_data_encryption_key()
    aesgcm = AESGCM(key)
    nonce = os.urandom(12)
    ciphertext = aesgcm.encrypt(nonce, plaintext.encode("utf-8"), None)
    return ciphertext, nonce

def decrypt_secret(ciphertext: bytes, nonce: bytes) -> str:
    key = _get_data_encryption_key()
    aesgcm = AESGCM(key)
    return aesgcm.decrypt(nonce, ciphertext, None).decode("utf-8")