import os
import hashlib
from typing import List, Dict, Any, Optional
from pinecone import Pinecone, ServerlessSpec
import openai
from openai import OpenAI
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

class VectorDBService:
    """Service for managing vector database operations with Pinecone."""
    
    def __init__(self):
        """Initialize Pinecone and OpenAI clients."""
        self.openai_client = OpenAI(api_key=settings.OPENAI_API_KEY)
        
        # Initialize Pinecone
        self.pc = Pinecone(api_key=settings.PINECONE_API_KEY)
        
        # Create or connect to index
        self._initialize_index()
        
    def _initialize_index(self):
        """Initialize Pinecone index, create if doesn't exist."""
        try:
            # Check if index exists
            existing_indexes = self.pc.list_indexes()
            
            if settings.PINECONE_INDEX_NAME not in [idx.name for idx in existing_indexes]:
                # Create new index
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
            
            # Connect to index
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
            vectors_to_upsert = []
            
            for i, chunk in enumerate(chunks):
                # Generate embedding
                embedding = self.generate_embedding(chunk['text'])
                
                # Prepare metadata
                chunk_metadata = {
                    **metadata,
                    'chunk_index': i,
                    'chunk_text': chunk['text'][:1000],  # Store first 1000 chars for reference
                    'page_number': chunk.get('page', 0)
                }
                
                # Generate unique ID
                vector_id = self.generate_document_id(chunk['text'], chunk_metadata)
                
                vectors_to_upsert.append({
                    'id': vector_id,
                    'values': embedding,
                    'metadata': chunk_metadata
                })
            
            # Batch upsert to Pinecone
            batch_size = 100
            for i in range(0, len(vectors_to_upsert), batch_size):
                batch = vectors_to_upsert[i:i + batch_size]
                self.index.upsert(vectors=batch)
            
            logger.info(f"Successfully upserted {len(vectors_to_upsert)} vectors to Pinecone")
            return True
            
        except Exception as e:
            logger.error(f"Error upserting to Pinecone: {str(e)}")
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
            # Generate query embedding
            query_embedding = self.generate_embedding(query)
            
            # Search in Pinecone
            results = self.index.query(
                vector=query_embedding,
                top_k=top_k,
                filter=filter_dict,
                include_metadata=include_metadata
            )
            
            # Format results
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
            
        except Exception as e:
            logger.error(f"Error searching in Pinecone: {str(e)}")
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