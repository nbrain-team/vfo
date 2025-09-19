import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://user:password@db/vfo_db"
    SECRET_KEY: str = "your-secret-key-here"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # OpenAI Configuration
    OPENAI_API_KEY: str = ""
    OPENAI_MODEL: str = "gpt-4o"
    OPENAI_EMBEDDING_MODEL: str = "text-embedding-3-small"
    
    # Pinecone Configuration
    PINECONE_API_KEY: str = ""
    PINECONE_ENVIRONMENT: str = ""
    PINECONE_INDEX_NAME: str = "vfo-documents"
    PINECONE_DIMENSION: int = 1536  # Dimension for text-embedding-3-small
    
    # Document Processing
    CHUNK_SIZE: int = 1000
    CHUNK_OVERLAP: int = 200
    MAX_SEARCH_RESULTS: int = 5
    
    class Config:
        env_file = ".env"

settings = Settings() 
if os.getenv("RENDER", "").lower() in {"true", "1", "yes"} or os.getenv("ENVIRONMENT") == "production":
    # Fail fast on missing critical secrets in prod environments
    if not settings.SECRET_KEY or settings.SECRET_KEY == "your-secret-key-here":
        raise RuntimeError("SECRET_KEY must be set to a strong value in production")
    if not settings.DATABASE_URL:
        raise RuntimeError("DATABASE_URL must be set in production")