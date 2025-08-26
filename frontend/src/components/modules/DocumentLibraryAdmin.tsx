import React, { useState } from 'react';
import ModuleTemplate from './ModuleTemplate';

interface Document {
    id: string;
    title: string;
    description: string;
    type: 'engagement_letter' | 'intake_form' | 'disclosure' | 'service_agreement' | 'other';
    requiresSignature: boolean;
    createdAt: string;
    lastModified: string;
    fileSize: string;
}

const DocumentLibraryAdmin: React.FC = () => {
    const [documents, setDocuments] = useState<Document[]>([
        {
            id: 'doc-1',
            title: 'Standard Engagement Letter',
            description: 'Template for new client engagements',
            type: 'engagement_letter',
            requiresSignature: true,
            createdAt: '2024-01-15',
            lastModified: '2024-01-15',
            fileSize: '245 KB'
        },
        {
            id: 'doc-2',
            title: 'Client Intake Form',
            description: 'Initial client information gathering form',
            type: 'intake_form',
            requiresSignature: false,
            createdAt: '2024-01-10',
            lastModified: '2024-01-20',
            fileSize: '128 KB'
        },
        {
            id: 'doc-3',
            title: 'Privacy Policy Disclosure',
            description: 'Standard privacy policy for clients',
            type: 'disclosure',
            requiresSignature: false,
            createdAt: '2024-01-05',
            lastModified: '2024-01-05',
            fileSize: '89 KB'
        }
    ]);

    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedType, setSelectedType] = useState<Document['type']>('other');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<'all' | Document['type']>('all');

    const documentTypes = [
        { value: 'engagement_letter', label: 'Engagement Letter' },
        { value: 'intake_form', label: 'Intake Form' },
        { value: 'disclosure', label: 'Disclosure' },
        { value: 'service_agreement', label: 'Service Agreement' },
        { value: 'other', label: 'Other' }
    ];

    const filteredDocuments = documents.filter(doc => {
        const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            doc.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'all' || doc.type === filterType;
        return matchesSearch && matchesType;
    });

    const handleUpload = () => {
        // Mock upload functionality
        const newDoc: Document = {
            id: `doc-${Date.now()}`,
            title: 'New Document',
            description: 'Recently uploaded document',
            type: selectedType,
            requiresSignature: false,
            createdAt: new Date().toISOString().split('T')[0],
            lastModified: new Date().toISOString().split('T')[0],
            fileSize: '0 KB'
        };
        setDocuments([newDoc, ...documents]);
        setShowUploadModal(false);
    };

    const deleteDocument = (id: string) => {
        if (window.confirm('Are you sure you want to delete this document?')) {
            setDocuments(documents.filter(doc => doc.id !== id));
        }
    };

    const getTypeColor = (type: Document['type']) => {
        switch(type) {
            case 'engagement_letter': return '#22c55e';
            case 'intake_form': return '#3b82f6';
            case 'disclosure': return '#f59e0b';
            case 'service_agreement': return '#8b5cf6';
            default: return '#6b7280';
        }
    };

    return (
        <ModuleTemplate
            title="Document Library"
            description="Manage boilerplate and customized documents for services"
        >
            <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
                    <input
                        className="form-input"
                        style={{ flex: 1, minWidth: '200px' }}
                        placeholder="Search documents..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                        className="form-input"
                        style={{ width: '200px' }}
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value as any)}
                    >
                        <option value="all">All Types</option>
                        {documentTypes.map(type => (
                            <option key={type.value} value={type.value}>
                                {type.label}
                            </option>
                        ))}
                    </select>
                    <button 
                        className="form-button" 
                        style={{ width: 'auto' }}
                        onClick={() => setShowUploadModal(true)}
                    >
                        + Add Document
                    </button>
                </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid var(--border)' }}>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Document Name</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Type</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>eSign Required</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Last Modified</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Size</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDocuments.map(doc => (
                            <tr key={doc.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                                <td style={{ padding: '12px' }}>
                                    <div>
                                        <div style={{ fontWeight: 500 }}>{doc.title}</div>
                                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                                            {doc.description}
                                        </div>
                                    </div>
                                </td>
                                <td style={{ padding: '12px' }}>
                                    <span 
                                        style={{ 
                                            padding: '4px 8px', 
                                            borderRadius: '4px',
                                            fontSize: '12px',
                                            background: getTypeColor(doc.type) + '20',
                                            color: getTypeColor(doc.type)
                                        }}
                                    >
                                        {documentTypes.find(t => t.value === doc.type)?.label}
                                    </span>
                                </td>
                                <td style={{ padding: '12px' }}>
                                    <span style={{ 
                                        color: doc.requiresSignature ? '#22c55e' : '#6b7280',
                                        fontSize: '14px'
                                    }}>
                                        {doc.requiresSignature ? '✓ Yes' : '— No'}
                                    </span>
                                </td>
                                <td style={{ padding: '12px', fontSize: '14px' }}>
                                    {doc.lastModified}
                                </td>
                                <td style={{ padding: '12px', fontSize: '14px' }}>
                                    {doc.fileSize}
                                </td>
                                <td style={{ padding: '12px' }}>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button 
                                            className="button-outline" 
                                            style={{ width: 'auto', padding: '4px 12px' }}
                                            onClick={() => alert('Edit functionality coming soon')}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className="button-outline" 
                                            style={{ width: 'auto', padding: '4px 12px' }}
                                            onClick={() => alert('Preview functionality coming soon')}
                                        >
                                            Preview
                                        </button>
                                        <button 
                                            className="button-outline" 
                                            style={{ width: 'auto', padding: '4px 12px' }}
                                            onClick={() => deleteDocument(doc.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredDocuments.length === 0 && (
                <div style={{ 
                    textAlign: 'center', 
                    padding: '48px', 
                    color: 'var(--text-secondary)' 
                }}>
                    No documents found matching your criteria
                </div>
            )}

            {showUploadModal && (
                <div style={{ 
                    position: 'fixed', 
                    inset: 0, 
                    background: 'rgba(0,0,0,0.5)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    zIndex: 50 
                }}>
                    <div className="module-card" style={{ width: '500px', maxWidth: '90%' }}>
                        <h2 className="section-title">Add Document</h2>
                        
                        <div style={{ marginBottom: '20px' }}>
                            <label className="form-label">Document Type</label>
                            <select 
                                className="form-input"
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value as Document['type'])}
                            >
                                {documentTypes.map(type => (
                                    <option key={type.value} value={type.value}>
                                        {type.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label className="form-label">Upload File</label>
                            <input 
                                type="file" 
                                className="form-input" 
                                style={{ padding: '12px' }}
                                accept=".pdf,.doc,.docx"
                            />
                            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px' }}>
                                Supported formats: PDF, DOC, DOCX
                            </p>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <input type="checkbox" />
                                Enable Google eSign capability for this document
                            </label>
                        </div>

                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                            <button 
                                className="button-outline" 
                                style={{ width: 'auto' }}
                                onClick={() => setShowUploadModal(false)}
                            >
                                Cancel
                            </button>
                            <button 
                                className="form-button" 
                                style={{ width: 'auto' }}
                                onClick={handleUpload}
                            >
                                Upload Document
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </ModuleTemplate>
    );
};

export default DocumentLibraryAdmin;
