from sqlalchemy.orm import Session
from app.models.legal import Document
from app.schemas.legal import DocumentCreate
import shutil
from fastapi import UploadFile

UPLOAD_DIR = "backend/app/db/uploads"

def create_document(db: Session, document: DocumentCreate, entity_id: int, file: UploadFile):
    file_path = f"{UPLOAD_DIR}/{file.filename}"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    db_document = Document(**document.dict(), entity_id=entity_id, file_path=file_path)
    db.add(db_document)
    db.commit()
    db.refresh(db_document)
    return db_document

def get_documents_by_entity(db: Session, entity_id: int):
    return db.query(Document).filter(Document.entity_id == entity_id).all() 