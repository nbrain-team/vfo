import os
from pydantic import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str = "a_very_secret_key"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    OPENAI_API_KEY: str = "your_openai_api_key_here"

    class Config:
        env_file = ".env"
        env_file_encoding = 'utf-8'

settings = Settings() 