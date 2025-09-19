from sqlalchemy.orm import Session
from app.models.legal import Document
from app.schemas.legal import DocumentCreate
import shutil
from fastapi import UploadFile
import os

BASE_DIR = os.path.dirname(__file__)
UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")
MAX_BYTES = 20 * 1024 * 1024

def create_document(db: Session, document: DocumentCreate, entity_id: int, file: UploadFile):
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    # Stream file in chunks and enforce size limit
    total = 0
    with open(file_path, "wb") as buffer:
        while True:
            chunk = file.file.read(1024 * 1024)
            if not chunk:
                break
            total += len(chunk)
            if total > MAX_BYTES:
                buffer.close()
                os.remove(file_path)
                raise ValueError("File too large")
            buffer.write(chunk)
        
    db_document = Document(**document.dict(), entity_id=entity_id, file_path=file_path)
    db.add(db_document)
    db.commit()
    db.refresh(db_document)
    return db_document

def get_documents_by_entity(db: Session, entity_id: int):
    return db.query(Document).filter(Document.entity_id == entity_id).all() 