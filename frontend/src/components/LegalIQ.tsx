import React, { useState, useEffect } from 'react';
import apiClient from '../apiClient';
import DocumentList from './DocumentList';
import UploadDocument from './UploadDocument';

interface Entity {
    id: number;
    name: string;
}

interface User {
    email: string;
    entities: Entity[];
}

const LegalIQ: React.FC = () => {
    const [entities, setEntities] = useState<Entity[]>([]);
    const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchEntities = async () => {
            try {
                const response = await apiClient.get('/entities/');
                setEntities(response.data);
            } catch (error) {
                console.error('Error fetching entities:', error);
            }
        };
        fetchEntities();
    }, []);

    const handleDocumentUpload = () => {
        setRefresh(!refresh);
    };

    return (
        <div className="p-4 border rounded shadow-md mt-6">
            <h2 className="text-xl font-bold mb-4">LegalIQ</h2>
            <div>
                <h3 className="text-lg font-semibold">Select an Entity</h3>
                <select
                    onChange={(e) => {
                        const entity = entities.find(entity => entity.id === parseInt(e.target.value));
                        setSelectedEntity(entity || null);
                    }}
                    className="p-2 border rounded"
                >
                    <option value="">-- Select an Entity --</option>
                    {entities.map(entity => (
                        <option key={entity.id} value={entity.id}>{entity.name}</option>
                    ))}
                </select>

                {selectedEntity && (
                    <div className="mt-4">
                        <UploadDocument entityId={selectedEntity.id} onUpload={handleDocumentUpload} />
                        <DocumentList entityId={selectedEntity.id} refresh={refresh} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default LegalIQ; 