from fastapi import APIRouter, HTTPException, Depends, UploadFile, File, Form
from typing import List, Optional, Dict, Any
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.services.rag_chat import get_rag_chat_service
from app.services.document_processor import get_document_processor
from app.services.vector_db import get_vector_db
from pydantic import BaseModel
import logging

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
        # Read file content
        file_content = await file.read()
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
        # Read file content
        file_content = await file.read()
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