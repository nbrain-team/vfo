from app.db.database import Base, engine
from app.models.user import User, Entity
from app.models.legal import Document

def init_db():
    Base.metadata.create_all(bind=engine) 