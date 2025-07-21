from pydantic import BaseModel
from typing import Optional

class AgentBase(BaseModel):
    name: str
    description: Optional[str] = None
    model_name: str = "gpt-3.5-turbo"
    system_prompt: Optional[str] = None

class AgentCreate(AgentBase):
    pass

class Agent(AgentBase):
    id: int

    class Config:
        from_attributes = True 