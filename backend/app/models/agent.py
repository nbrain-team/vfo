from sqlalchemy import Column, Integer, String, Text
from app.db.database import Base

class Agent(Base):
    __tablename__ = "agents"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    description = Column(Text, nullable=True)
    model_name = Column(String, default="gpt-3.5-turbo")
    system_prompt = Column(Text, nullable=True) 