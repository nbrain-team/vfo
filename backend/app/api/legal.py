from fastapi import APIRouter, HTTPException, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.db import legal as crud_legal
from app.schemas.legal import Document, DocumentCreate
from app.api.api import get_current_user
from app.models.user import User as UserModel

router = APIRouter()

@router.post("/entities/{entity_id}/documents/", response_model=Document)
def upload_document_for_entity(
    entity_id: int,
    file: UploadFile = File(...),
    name: str = Form(...),
    document_type: str = Form(None),
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    """Upload a document for a given entity and persist metadata in DB."""
    try:
        doc_create = DocumentCreate(
            name=name,
            document_type=document_type,
        )
        return crud_legal.create_document(db=db, document=doc_create, entity_id=entity_id, file=file)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/entities/{entity_id}/documents/", response_model=List[Document])
def get_entity_documents(
    entity_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    return crud_legal.get_documents_by_entity(db=db, entity_id=entity_id) 