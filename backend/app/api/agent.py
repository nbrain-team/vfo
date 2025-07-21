from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.database import SessionLocal
from app.db.agent import create_agent, get_agents, get_agent
from app.schemas.agent import Agent, AgentCreate
from app.api.api import get_current_user
from app.models.user import User as UserModel
from pydantic import BaseModel
import openai
from app.core.config import settings

router = APIRouter()
openai.api_key = settings.OPENAI_API_KEY

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class ChatRequest(BaseModel):
    message: str

@router.post("/agents/", response_model=Agent)
def handle_create_agent(
    agent: AgentCreate,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    return create_agent(db=db, agent=agent)

@router.get("/agents/", response_model=List[Agent])
def handle_get_agents(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    return get_agents(db=db, skip=skip, limit=limit)

@router.post("/agents/{agent_id}/chat")
async def chat_with_agent(
    agent_id: int,
    chat_request: ChatRequest,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    agent = get_agent(db=db, agent_id=agent_id)
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")

    response = await openai.chat.completions.acreate(
        model=agent.model_name,
        messages=[
            {"role": "system", "content": agent.system_prompt or "You are a helpful assistant."},
            {"role": "user", "content": chat_request.message}
        ]
    )
    return response.choices[0].message.content 