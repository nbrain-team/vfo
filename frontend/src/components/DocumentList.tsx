import React, { useState, useEffect } from 'react';
import apiClient from '../apiClient';

interface Document {
    id: number;
    name: string;
    document_type: string;
    upload_date: string;
}

interface DocumentListProps {
    entityId: number;
    refresh: boolean;
}

const DocumentList: React.FC<DocumentListProps> = ({ entityId, refresh }) => {
    const [documents, setDocuments] = useState<Document[]>([]);

    useEffect(() => {
        if (entityId) {
            const fetchDocuments = async () => {
                try {
                    const response = await apiClient.get(`/legal/entities/${entityId}/documents/`);
                    setDocuments(response.data);
                } catch (error) {
                    console.error('Error fetching documents:', error);
                }
            };
            fetchDocuments();
        }
    }, [entityId, refresh]);

    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold">Documents</h3>
            <ul className="list-disc pl-5">
                {documents.map(doc => (
                    <li key={doc.id}>{doc.name} - {doc.document_type}</li>
                ))}
            </ul>
        </div>
    );
};

export default DocumentList; 