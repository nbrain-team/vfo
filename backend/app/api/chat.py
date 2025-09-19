from fastapi import APIRouter, HTTPException, Depends, UploadFile, File, Form
from typing import List, Optional, Dict, Any
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.api.api import get_current_user
from app.models.user import User, Entity
from app.services.rag_chat import get_rag_chat_service
from app.services.document_processor import get_document_processor
from app.services.vector_db import get_vector_db
from pydantic import BaseModel
import logging
from app.models.legal import Document
from app.services import seed_data

logger = logging.getLogger(__name__)
router = APIRouter()

class ChatRequest(BaseModel):
    query: str
    entity_id: Optional[str] = None
    document_type: Optional[str] = None
    context_type: str = "legal"
    conversation_history: Optional[List[Dict[str, str]]] = None

class DocumentUploadResponse(BaseModel):
    message: str
    document_id: str
    chunks_created: int
    status: str

class ChatResponse(BaseModel):
    answer: str
    sources: List[Dict[str, Any]]
    status: str

@router.post("/chat", response_model=ChatResponse)
async def chat_with_documents(
    request: ChatRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Chat with documents using RAG.
    """
    try:
        rag_service = get_rag_chat_service()
        
        # Build filter dict
        filter_dict = {}
        if request.entity_id:
            filter_dict['entity_id'] = request.entity_id
        if request.document_type:
            filter_dict['document_type'] = request.document_type
        
        # Add user filter for security
        filter_dict['user_id'] = str(current_user.id)
        
        # Get response
        response = rag_service.chat_with_documents(
            query=request.query,
            conversation_history=request.conversation_history,
            filter_dict=filter_dict,
            context_type=request.context_type
        )
        
        return ChatResponse(
            answer=response['answer'],
            sources=response['sources'],
            status=response['status']
        )
        
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

ALLOWED_TYPES = {"application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"}
MAX_BYTES = 20 * 1024 * 1024

@router.post("/upload-and-index")
async def upload_and_index_document(
    file: UploadFile = File(...),
    entity_id: str = Form(...),
    document_type: str = Form(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Upload a document and index it in the vector database.
    """
    try:
        # Validate content type
        content_type = (file.content_type or "").lower()
        if content_type not in ALLOWED_TYPES:
            raise HTTPException(status_code=415, detail="Unsupported Media Type")

        # Read file content with streaming size guard
        total = 0
        buf = bytearray()
        while True:
            chunk = await file.read(1024 * 1024)
            if not chunk:
                break
            total += len(chunk)
            if total > MAX_BYTES:
                raise HTTPException(status_code=413, detail="File too large")
            buf.extend(chunk)
        file_content = bytes(buf)
        file_name = file.filename
        file_type = file_name.split('.')[-1] if '.' in file_name else 'txt'
        
        # Process document
        processor = get_document_processor()
        processed = processor.process_document(
            file_content=file_content,
            file_name=file_name,
            file_type=file_type,
            metadata={
                'entity_id': entity_id,
                'document_type': document_type,
                'user_id': str(current_user.id)
            }
        )
        
        # Index in vector database
        vector_db = get_vector_db()
        success = vector_db.upsert_document_chunks(
            chunks=processed['chunks'],
            metadata={
                'document_id': f"{entity_id}_{file_name}",
                'entity_id': entity_id,
                'document_type': document_type,
                'user_id': str(current_user.id),
                'file_name': file_name
            }
        )
        
        if not success:
            raise HTTPException(status_code=500, detail="Failed to index document")
        
        return DocumentUploadResponse(
            message="Document uploaded and indexed successfully",
            document_id=f"{entity_id}_{file_name}",
            chunks_created=processed['num_chunks'],
            status="success"
        )
        
    except Exception as e:
        logger.error(f"Error uploading document: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/analyze-document")
async def analyze_document(
    file: UploadFile = File(...),
    analysis_type: str = Form("summary"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Analyze a document using GPT-4o.
    """
    try:
        # Validate content type
        content_type = (file.content_type or "").lower()
        if content_type not in ALLOWED_TYPES:
            raise HTTPException(status_code=415, detail="Unsupported Media Type")

        # Read file content with streaming size guard
        total = 0
        buf = bytearray()
        while True:
            chunk = await file.read(1024 * 1024)
            if not chunk:
                break
            total += len(chunk)
            if total > MAX_BYTES:
                raise HTTPException(status_code=413, detail="File too large")
            buf.extend(chunk)
        file_content = bytes(buf)
        file_name = file.filename
        file_type = file_name.split('.')[-1] if '.' in file_name else 'txt'
        
        # Extract text
        processor = get_document_processor()
        text = processor.extract_text(file_content, file_type)
        
        # Analyze document
        rag_service = get_rag_chat_service()
        analysis = rag_service.analyze_document(text, analysis_type)
        
        return {
            'file_name': file_name,
            'analysis': analysis['analysis'],
            'analysis_type': analysis_type,
            'status': analysis['status']
        }
        
    except Exception as e:
        logger.error(f"Error analyzing document: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/document-insights/{entity_id}")
async def get_document_insights(
    entity_id: str,
    document_type: Optional[str] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Generate insights across all documents for an entity.
    """
    try:
        rag_service = get_rag_chat_service()
        insights = rag_service.generate_document_insights(entity_id, document_type)
        
        return insights
        
    except Exception as e:
        logger.error(f"Error generating insights: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/search")
async def search_documents(
    query: str,
    entity_id: Optional[str] = None,
    top_k: int = 5,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Search documents using semantic search.
    """
    try:
        vector_db = get_vector_db()
        
        # Build filter
        filter_dict = {'user_id': str(current_user.id)}
        if entity_id:
            filter_dict['entity_id'] = entity_id
        
        # Search
        results = vector_db.search_similar_chunks(
            query=query,
            top_k=top_k,
            filter_dict=filter_dict,
            include_metadata=True
        )
        
        return {
            'query': query,
            'results': results,
            'total_results': len(results)
        }
        
    except Exception as e:
        logger.error(f"Error searching documents: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e)) 


@router.post("/seed-mock")
async def seed_mock_documents_for_current_user(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Seed mock legal documents and entities for the current user.
    - Creates entities if missing and associates them to the user
    - Inserts minimal Document rows for visibility in the vault
    - Indexes document content into the vector store (Pinecone or Postgres fallback)
    """
    try:
        vector_db = get_vector_db()
        processor = get_document_processor()

        # Helper to get or create an Entity by a readable name derived from seed entity_id
        def get_or_create_entity(seed_entity_id: str) -> Entity:
            readable_name = seed_entity_id.replace('_', ' ').title()
            entity = db.query(Entity).filter(Entity.name == readable_name).first()
            if not entity:
                entity = Entity(name=readable_name)
                db.add(entity)
                db.commit()
                db.refresh(entity)
            # Associate to current user if not already associated
            if entity not in current_user.entities:
                current_user.entities.append(entity)
                db.add(current_user)
                db.commit()
            return entity

        created = 0
        for doc_data in seed_data.MOCK_DOCUMENTS:
            entity = get_or_create_entity(doc_data['entity_id'])

            # Create a minimal Document row for the vault
            doc_name = doc_data['file_name'].rsplit('.', 1)[0].replace('_', ' ')
            existing_doc = (
                db.query(Document)
                .filter(Document.name == doc_name, Document.entity_id == entity.id)
                .first()
            )
            if not existing_doc:
                db_doc = Document(
                    name=doc_name,
                    file_path=f"seeded/{doc_data['file_name']}",
                    document_type=doc_data.get('document_type'),
                    entity_id=entity.id,
                )
                db.add(db_doc)
                db.commit()
                db.refresh(db_doc)

            # Index content into vector database
            processed = processor.process_document(
                file_content=doc_data['content'].encode('utf-8'),
                file_name=doc_data['file_name'],
                file_type='txt',
                metadata={
                    'entity_id': str(entity.id),
                    'document_type': doc_data.get('document_type'),
                    'user_id': str(current_user.id)
                }
            )
            ok = vector_db.upsert_document_chunks(
                chunks=processed['chunks'],
                metadata={
                    'document_id': f"{entity.id}_{doc_data['file_name']}",
                    'entity_id': str(entity.id),
                    'document_type': doc_data.get('document_type'),
                    'user_id': str(current_user.id),
                    'file_name': doc_data['file_name']
                }
            )
            if ok:
                created += 1

        return {"status": "success", "seeded_documents": created}
    except Exception as e:
        logger.error(f"Error seeding mock documents: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))