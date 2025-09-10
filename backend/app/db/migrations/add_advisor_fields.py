"""Add advisor fields to users table"""
from sqlalchemy import Column, Integer, String, ForeignKey
from app.db.database import engine

def upgrade():
    """Add username and advisor_id columns to users table"""
    with engine.connect() as conn:
        # Add username column for advisors
        try:
            conn.execute("ALTER TABLE users ADD COLUMN username VARCHAR UNIQUE")
            print("Added username column to users table")
        except Exception as e:
            print(f"Username column may already exist: {e}")
        
        # Add advisor_id column for clients
        try:
            conn.execute("ALTER TABLE users ADD COLUMN advisor_id INTEGER REFERENCES users(id)")
            print("Added advisor_id column to users table")
        except Exception as e:
            print(f"Advisor_id column may already exist: {e}")
        
        conn.commit()

if __name__ == "__main__":
    upgrade()
