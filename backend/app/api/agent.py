from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List, Optional
from app.db.database import get_db
from app.db import agent as crud_agent
from app.schemas.agent import Agent, AgentCreate
from app.api.api import get_current_user
from app.models.user import User as UserModel
from pydantic import BaseModel
import openai
from app.core.config import settings

router = APIRouter()
openai.api_key = settings.OPENAI_API_KEY

class ChatRequest(BaseModel):
    message: str

@router.post("/agents/", response_model=Agent)
def handle_create_agent(
    agent: AgentCreate,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    return crud_agent.create_agent(db=db, agent=agent)

@router.get("/agents/", response_model=List[Agent])
def handle_get_agents(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    return crud_agent.get_agents(db=db, skip=skip, limit=limit)

@router.post("/agents/{agent_id}/chat")
async def chat_with_agent(
    agent_id: int,
    chat_request: ChatRequest,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    agent = crud_agent.get_agent(db=db, agent_id=agent_id)
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