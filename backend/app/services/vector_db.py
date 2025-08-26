import os
import hashlib
import json
from typing import List, Dict, Any, Optional
from pinecone import Pinecone, ServerlessSpec
from openai import OpenAI
from app.core.config import settings
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.db.database import SessionLocal
from app.models.legal import DocumentChunk
import logging

logger = logging.getLogger(__name__)

class VectorDBService:
    """Service for managing vector database operations with Pinecone or Postgres fallback."""
    
    def __init__(self):
        """Initialize OpenAI client and choose backend (Pinecone or Postgres)."""
        self.openai_client = OpenAI(api_key=settings.OPENAI_API_KEY)
        self.use_pinecone = bool(settings.PINECONE_API_KEY)
        if self.use_pinecone:
            self.pc = Pinecone(api_key=settings.PINECONE_API_KEY)
            self._initialize_index()
        
    def _initialize_index(self):
        """Initialize Pinecone index, create if doesn't exist."""
        try:
            existing_indexes = self.pc.list_indexes()
            if settings.PINECONE_INDEX_NAME not in [idx.name for idx in existing_indexes]:
                self.pc.create_index(
                    name=settings.PINECONE_INDEX_NAME,
                    dimension=settings.PINECONE_DIMENSION,
                    metric='cosine',
                    spec=ServerlessSpec(
                        cloud='aws',
                        region=settings.PINECONE_ENVIRONMENT or 'us-east-1'
                    )
                )
                logger.info(f"Created new Pinecone index: {settings.PINECONE_INDEX_NAME}")
            self.index = self.pc.Index(settings.PINECONE_INDEX_NAME)
            logger.info(f"Connected to Pinecone index: {settings.PINECONE_INDEX_NAME}")
        except Exception as e:
            logger.error(f"Error initializing Pinecone index: {str(e)}")
            raise
    
    def generate_embedding(self, text: str) -> List[float]:
        """Generate embedding for text using OpenAI."""
        try:
            response = self.openai_client.embeddings.create(
                model=settings.OPENAI_EMBEDDING_MODEL,
                input=text
            )
            return response.data[0].embedding
        except Exception as e:
            logger.error(f"Error generating embedding: {str(e)}")
            raise
    
    def generate_document_id(self, content: str, metadata: Dict) -> str:
        """Generate unique ID for a document chunk."""
        unique_string = f"{metadata.get('document_id', '')}_{metadata.get('chunk_index', '')}_{content[:50]}"
        return hashlib.md5(unique_string.encode()).hexdigest()
    
    def upsert_document_chunks(self, chunks: List[Dict[str, Any]], metadata: Dict[str, Any]) -> bool:
        """
        Upsert document chunks to Pinecone.
        
        Args:
            chunks: List of text chunks with metadata
            metadata: Document-level metadata
        
        Returns:
            Success status
        """
        try:
            if self.use_pinecone:
                vectors_to_upsert = []
                for i, chunk in enumerate(chunks):
                    embedding = self.generate_embedding(chunk['text'])
                    chunk_metadata = {
                        **metadata,
                        'chunk_index': i,
                        'chunk_text': chunk['text'][:1000],
                        'page_number': chunk.get('page', 0)
                    }
                    vector_id = self.generate_document_id(chunk['text'], chunk_metadata)
                    vectors_to_upsert.append({
                        'id': vector_id,
                        'values': embedding,
                        'metadata': chunk_metadata
                    })
                batch_size = 100
                for i in range(0, len(vectors_to_upsert), batch_size):
                    batch = vectors_to_upsert[i:i + batch_size]
                    self.index.upsert(vectors=batch)
                logger.info(f"Successfully upserted {len(vectors_to_upsert)} vectors to Pinecone")
                return True
            else:
                # Postgres fallback: store chunks and embeddings in DB
                db: Session = SessionLocal()
                try:
                    for i, chunk in enumerate(chunks):
                        embedding = self.generate_embedding(chunk['text'])
                        chunk_id = self.generate_document_id(chunk['text'], {**metadata, 'chunk_index': i})
                        db_chunk = DocumentChunk(
                            id=chunk_id,
                            document_id=metadata.get('document_id', ''),
                            entity_id=metadata.get('entity_id'),
                            user_id=metadata.get('user_id'),
                            document_type=metadata.get('document_type'),
                            file_name=metadata.get('file_name'),
                            chunk_index=i,
                            page_number=chunk.get('page', 0),
                            chunk_text=chunk['text'][:2000],
                            embedding=json.dumps(embedding)
                        )
                        db.add(db_chunk)
                    db.commit()
                    logger.info(f"Stored {len(chunks)} chunks in Postgres fallback")
                    return True
                except Exception as e:
                    db.rollback()
                    logger.error(f"Error storing chunks in Postgres: {str(e)}")
                    return False
                finally:
                    db.close()
        except Exception as e:
            logger.error(f"Error in upsert_document_chunks: {str(e)}")
            return False
    
    def search_similar_chunks(
        self, 
        query: str, 
        top_k: int = 5,
        filter_dict: Optional[Dict] = None,
        include_metadata: bool = True
    ) -> List[Dict[str, Any]]:
        """
        Search for similar document chunks.
        
        Args:
            query: Search query
            top_k: Number of results to return
            filter_dict: Metadata filters
            include_metadata: Whether to include metadata in results
        
        Returns:
            List of similar chunks with scores
        """
        try:
            query_embedding = self.generate_embedding(query)
            if self.use_pinecone:
                results = self.index.query(
                    vector=query_embedding,
                    top_k=top_k,
                    filter=filter_dict,
                    include_metadata=include_metadata
                )
                formatted_results = []
                for match in results.matches:
                    result = {
                        'score': match.score,
                        'id': match.id
                    }
                    if include_metadata and hasattr(match, 'metadata'):
                        result['metadata'] = match.metadata
                    formatted_results.append(result)
                return formatted_results
            else:
                # Postgres fallback: cosine similarity with stored embeddings
                db: Session = SessionLocal()
                try:
                    # Build basic filtering in SQL
                    where_clauses = []
                    params: Dict[str, Any] = {}
                    if filter_dict:
                        if 'user_id' in filter_dict:
                            where_clauses.append("user_id = :user_id")
                            params['user_id'] = filter_dict['user_id']
                        if 'entity_id' in filter_dict:
                            where_clauses.append("entity_id = :entity_id")
                            params['entity_id'] = filter_dict['entity_id']
                        if 'document_type' in filter_dict:
                            where_clauses.append("document_type = :document_type")
                            params['document_type'] = filter_dict['document_type']
                    where_sql = ("WHERE " + " AND ".join(where_clauses)) if where_clauses else ""

                    rows = db.execute(text(f"SELECT id, document_id, entity_id, user_id, document_type, file_name, chunk_index, page_number, chunk_text, embedding FROM document_chunks {where_sql}"), params).fetchall()
                    # Compute cosine similarity in Python
                    def cosine(a: List[float], b: List[float]) -> float:
                        import math
                        dot = sum(x*y for x, y in zip(a, b))
                        na = math.sqrt(sum(x*x for x in a))
                        nb = math.sqrt(sum(y*y for y in b))
                        return dot / (na * nb + 1e-9)
                    scored = []
                    for r in rows:
                        emb = json.loads(r.embedding) if r.embedding else []
                        if not emb:
                            continue
                        score = cosine(query_embedding, emb)
                        scored.append({
                            'score': float(score),
                            'id': r.id,
                            'metadata': {
                                'document_id': r.document_id,
                                'entity_id': r.entity_id,
                                'user_id': r.user_id,
                                'document_type': r.document_type,
                                'file_name': r.file_name,
                                'chunk_index': r.chunk_index,
                                'page_number': r.page_number,
                                'chunk_text': r.chunk_text,
                            }
                        })
                    scored.sort(key=lambda x: x['score'], reverse=True)
                    return scored[:top_k]
                finally:
                    db.close()
        except Exception as e:
            logger.error(f"Error in search_similar_chunks: {str(e)}")
            return []
    
    def delete_document(self, document_id: str) -> bool:
        """
        Delete all chunks for a document.
        
        Args:
            document_id: Document ID to delete
        
        Returns:
            Success status
        """
        try:
            # Delete by metadata filter
            self.index.delete(filter={'document_id': document_id})
            logger.info(f"Deleted document {document_id} from Pinecone")
            return True
        except Exception as e:
            logger.error(f"Error deleting from Pinecone: {str(e)}")
            return False
    
    def get_index_stats(self) -> Dict[str, Any]:
        """Get statistics about the Pinecone index."""
        try:
            stats = self.index.describe_index_stats()
            return stats
        except Exception as e:
            logger.error(f"Error getting index stats: {str(e)}")
            return {}

# Singleton instance
vector_db = None

def get_vector_db() -> VectorDBService:
    """Get or create vector DB service instance."""
    global vector_db
    if vector_db is None:
        vector_db = VectorDBService()
    return vector_db 