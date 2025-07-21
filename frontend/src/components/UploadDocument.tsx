import React, { useState } from 'react';
import apiClient from '../apiClient';

interface UploadDocumentProps {
    entityId: number;
    onUpload: () => void;
}

const UploadDocument: React.FC<UploadDocumentProps> = ({ entityId, onUpload }) => {
    const [name, setName] = useState('');
    const [documentType, setDocumentType] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            setMessage('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('document_type', documentType);
        formData.append('file', file);

        try {
            await apiClient.post(`/legal/entities/${entityId}/documents/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('Document uploaded successfully!');
            setName('');
            setDocumentType('');
            setFile(null);
            onUpload();
        } catch (error) {
            setMessage('Error uploading document.');
            console.error(error);
        }
    };

    return (
        <div className="p-4 border rounded shadow-md mt-6">
            <h3 className="text-xl font-bold mb-4">Upload Document</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Document Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Document Type</label>
                    <input
                        type="text"
                        value={documentType}
                        onChange={(e) => setDocumentType(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">File</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Upload
                </button>
            </form>
            {message && <p className="mt-4">{message}</p>}
        </div>
    );
};

export default UploadDocument; 