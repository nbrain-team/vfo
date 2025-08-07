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
    type: str = Form(...),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    # Save file and create document record
    doc_create = DocumentCreate(
        name=name,
        type=type,
        entity_id=entity_id,
        file_path=f"uploads/{file.filename}"
    )
    return crud_legal.create_document(db=db, document=doc_create)

@router.get("/entities/{entity_id}/documents/", response_model=List[Document])
def get_entity_documents(
    entity_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    return crud_legal.get_documents_by_entity(db=db, entity_id=entity_id) 