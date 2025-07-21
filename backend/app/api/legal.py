from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
from app.db.database import SessionLocal
from app.db.legal import create_document, get_documents_by_entity
from app.schemas.legal import Document, DocumentCreate
from app.api.api import get_current_user
from app.models.user import User as UserModel

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/entities/{entity_id}/documents/", response_model=Document)
def upload_document_for_entity(
    entity_id: int,
    document: DocumentCreate = Depends(),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    return create_document(db=db, document=document, entity_id=entity_id, file=file)

@router.get("/entities/{entity_id}/documents/", response_model=List[Document])
def read_documents_for_entity(
    entity_id: int,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    return get_documents_by_entity(db=db, entity_id=entity_id) 