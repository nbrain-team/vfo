from app.db.database import Base, engine
from app.models.user import User, Entity
from app.models.legal import Document
from app.models.agent import Agent

def init_db():
    Base.metadata.create_all(bind=engine) 