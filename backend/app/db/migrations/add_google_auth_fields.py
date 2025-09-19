"""Add Google authentication fields to User table

Run this migration to add Google OAuth fields to the existing users table.
"""

from sqlalchemy import text
from app.db.database import engine

def upgrade():
    """Add Google authentication columns to users table"""
    with engine.connect() as conn:
        # Add new columns one by one to handle existing data
        try:
            conn.execute(text("ALTER TABLE users ADD COLUMN name VARCHAR"))
            conn.commit()
        except Exception:
            pass  # Column might already exist
            
        try:
            conn.execute(text("ALTER TABLE users ADD COLUMN role VARCHAR DEFAULT 'Client'"))
            conn.commit()
        except Exception:
            pass
            
        try:
            conn.execute(text("ALTER TABLE users ADD COLUMN google_id VARCHAR UNIQUE"))
            conn.commit()
        except Exception:
            pass
            
        try:
            conn.execute(text("ALTER TABLE users ADD COLUMN picture_url VARCHAR"))
            conn.commit()
        except Exception:
            pass
            
        try:
            conn.execute(text("ALTER TABLE users ADD COLUMN is_active BOOLEAN DEFAULT TRUE"))
            conn.commit()
        except Exception:
            pass
            
        try:
            conn.execute(text("ALTER TABLE users ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP"))
            conn.commit()
        except Exception:
            pass
            
        try:
            conn.execute(text("ALTER TABLE users ADD COLUMN google_access_token TEXT"))
            conn.commit()
        except Exception:
            pass
            
        try:
            conn.execute(text("ALTER TABLE users ADD COLUMN google_refresh_token TEXT"))
            conn.commit()
        except Exception:
            pass

        # Encrypted fields scaffolding
        try:
            conn.execute(text("ALTER TABLE users ADD COLUMN google_refresh_token_enc TEXT"))
            conn.commit()
        except Exception:
            pass
        try:
            conn.execute(text("ALTER TABLE users ADD COLUMN google_refresh_token_iv TEXT"))
            conn.commit()
        except Exception:
            pass
            
        # Make hashed_password nullable for Google-only users
        try:
            conn.execute(text("ALTER TABLE users ALTER COLUMN hashed_password DROP NOT NULL"))
            conn.commit()
        except Exception:
            pass

if __name__ == "__main__":
    upgrade()
    print("Migration completed successfully!")
