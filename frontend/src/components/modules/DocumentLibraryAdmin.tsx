import React, { useState } from 'react';
import ModuleTemplate from './ModuleTemplate';

interface Document {
    id: string;
    title: string;
    description: string;
    type: 'engagement_letter' | 'intake_form' | 'disclosure' | 'service_agreement' | 'trust_document' | 'meeting_minutes' | 'operating_agreement' | 'other';
    requiresSignature: boolean;
    createdAt: string;
    lastModified: string;
    fileSize: string;
    placeholders?: string[];
    isTemplate?: boolean;
}

const DocumentLibraryAdmin: React.FC = () => {
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [uploadingDocument, setUploadingDocument] = useState<Document | null>(null);
    const [uploadFile, setUploadFile] = useState<File | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingDocument, setEditingDocument] = useState<Document | null>(null);
    const [editFormData, setEditFormData] = useState({ title: '', description: '', placeholders: [''] });
    
    const [documents, setDocuments] = useState<Document[]>([
        // Wyoming Trust Document Templates
        {
            id: 'doc-4',
            title: 'Multi Member PTC Organizational Meeting',
            description: 'Consent in lieu of organizational meeting for multi-member Private Family Trust Company',
            type: 'meeting_minutes',
            requiresSignature: true,
            createdAt: '2024-01-20',
            lastModified: '2024-01-20',
            fileSize: '5.7 KB',
            isTemplate: true,
            placeholders: ['{{company_name}}', '{{member_names}}', '{{trustee_name}}', '{{address}}', '{{effective_date}}']
        },
        {
            id: 'doc-5',
            title: 'Single Member PTC Organizational Meeting',
            description: 'Consent in lieu of organizational meeting for single-member Private Family Trust Company',
            type: 'meeting_minutes',
            requiresSignature: true,
            createdAt: '2024-01-20',
            lastModified: '2024-01-20',
            fileSize: '5.9 KB',
            isTemplate: true,
            placeholders: ['{{company_name}}', '{{member.first_name}}', '{{member.last_name}}', '{{member.company}}', '{{manager.first_name}}', '{{manager.last_name}}', '{{manager.company}}', '{{address}}']
        },
        {
            id: 'doc-6',
            title: 'PFTC Operating Agreement - Two Grantors',
            description: 'Operating agreement for Private Family Trust Company LLC with two grantors',
            type: 'operating_agreement',
            requiresSignature: true,
            createdAt: '2024-01-20',
            lastModified: '2024-01-20',
            fileSize: '36.6 KB',
            isTemplate: true,
            placeholders: ['{{company_name}}', '{{grantor1_name}}', '{{grantor2_name}}', '{{trustee_name}}', '{{trust_name}}', '{{effective_date}}', '{{state}}', '{{county}}']
        },
        {
            id: 'doc-7',
            title: 'PTC Operating Agreement - Single Grantor',
            description: 'Operating agreement for Private Trust Company with single grantor',
            type: 'operating_agreement',
            requiresSignature: true,
            createdAt: '2024-01-20',
            lastModified: '2024-01-20',
            fileSize: '44.3 KB',
            isTemplate: true,
            placeholders: ['{{company_name}}', '{{grantor_name}}', '{{trustee_name}}', '{{trust_name}}', '{{effective_date}}', '{{state}}', '{{county}}', '{{address}}']
        },
        // Life & Legacy Planning Documents
        {
            id: 'doc-life-legacy-summary',
            title: 'Life & Legacy Planning Summary',
            description: 'Comprehensive summary document populated from Life & Legacy Planning Assessment',
            type: 'other',
            requiresSignature: false,
            createdAt: '2024-01-22',
            lastModified: '2024-01-22',
            fileSize: '48 KB',
            isTemplate: true,
            placeholders: ['{{client_name}}', '{{date}}', '{{marital_status}}', '{{spouse_name}}', '{{children_info}}', '{{life_goals}}', '{{legacy_vision}}', '{{estate_priorities}}', '{{current_plan}}', '{{key_assets}}', '{{planning_timeline}}', '{{family_dynamics}}', '{{charitable_intentions}}']
        },
        // Contributions to Trust Documents
        {
            id: 'doc-8',
            title: 'Contribution Questionnaire',
            description: 'Document for handling contributions and transfers to trust structures',
            type: 'intake_form',
            requiresSignature: false,
            createdAt: '2024-01-21',
            lastModified: '2024-01-21',
            fileSize: '32 KB',
            isTemplate: true,
            placeholders: ['{{client_name}}', '{{date}}', '{{email}}', '{{phone}}']
        },
        {
            id: 'doc-9',
            title: 'Trustee Acceptance of Contribution to Trust',
            description: 'Document for handling contributions and transfers to trust structures',
            type: 'trust_document',
            requiresSignature: true,
            createdAt: '2024-01-21',
            lastModified: '2024-01-21',
            fileSize: '28 KB',
            isTemplate: true,
            placeholders: ['{{grantor_name}}', '{{trustee_name}}', '{{trust_name}}', '{{effective_date}}', '{{state}}', '{{county}}']
        },
        {
            id: 'doc-10',
            title: 'Any State Special Meeting Minutes and Resolutions',
            description: 'Document for handling contributions and transfers to trust structures',
            type: 'meeting_minutes',
            requiresSignature: true,
            createdAt: '2024-01-21',
            lastModified: '2024-01-21',
            fileSize: '35 KB',
            isTemplate: true,
            placeholders: ['{{company_name}}', '{{meeting_date}}', '{{attendees}}', '{{resolutions}}']
        },
        {
            id: 'doc-11',
            title: 'Any State Contribution Meeting Minutes and Resolutions',
            description: 'Document for handling contributions and transfers to trust structures',
            type: 'meeting_minutes',
            requiresSignature: true,
            createdAt: '2024-01-21',
            lastModified: '2024-01-21',
            fileSize: '33 KB',
            isTemplate: true,
            placeholders: ['{{company_name}}', '{{meeting_date}}', '{{attendees}}', '{{resolutions}}']
        },
        {
            id: 'doc-12',
            title: 'Affidavit of Settlor',
            description: 'Document for handling contributions and transfers to trust structures',
            type: 'trust_document',
            requiresSignature: true,
            createdAt: '2024-01-21',
            lastModified: '2024-01-21',
            fileSize: '22 KB',
            isTemplate: true,
            placeholders: ['{{grantor_name}}', '{{trustee_name}}', '{{trust_name}}', '{{effective_date}}', '{{state}}', '{{county}}']
        },
        // Distributions From Trust Documents
        {
            id: 'doc-13',
            title: 'DDC Minutes Appointing WAPA',
            description: 'Document for managing distributions from trust to beneficiaries',
            type: 'meeting_minutes',
            requiresSignature: true,
            createdAt: '2024-01-21',
            lastModified: '2024-01-21',
            fileSize: '30 KB',
            isTemplate: true,
            placeholders: ['{{company_name}}', '{{meeting_date}}', '{{attendees}}', '{{resolutions}}']
        },
        {
            id: 'doc-14',
            title: 'DDC Acceptance of Appointment',
            description: 'Document for managing distributions from trust to beneficiaries',
            type: 'trust_document',
            requiresSignature: true,
            createdAt: '2024-01-21',
            lastModified: '2024-01-21',
            fileSize: '25 KB',
            isTemplate: true,
            placeholders: ['{{grantor_name}}', '{{trustee_name}}', '{{trust_name}}', '{{effective_date}}', '{{state}}', '{{county}}']
        },
        {
            id: 'doc-15',
            title: 'DDC Distribution Request Form',
            description: 'Document for managing distributions from trust to beneficiaries',
            type: 'intake_form',
            requiresSignature: true,
            createdAt: '2024-01-21',
            lastModified: '2024-01-21',
            fileSize: '28 KB',
            isTemplate: true,
            placeholders: ['{{client_name}}', '{{date}}', '{{email}}', '{{phone}}']
        },
        {
            id: 'doc-16',
            title: 'DDC Minutes Approving Distribution',
            description: 'Document for managing distributions from trust to beneficiaries',
            type: 'meeting_minutes',
            requiresSignature: true,
            createdAt: '2024-01-21',
            lastModified: '2024-01-21',
            fileSize: '32 KB',
            isTemplate: true,
            placeholders: ['{{company_name}}', '{{meeting_date}}', '{{attendees}}', '{{resolutions}}']
        },
        {
            id: 'doc-17',
            title: 'Any State Distribution Meeting Minutes and Resolutions',
            description: 'Document for managing distributions from trust to beneficiaries',
            type: 'meeting_minutes',
            requiresSignature: true,
            createdAt: '2024-01-21',
            lastModified: '2024-01-21',
            fileSize: '34 KB',
            isTemplate: true,
            placeholders: ['{{company_name}}', '{{meeting_date}}', '{{attendees}}', '{{resolutions}}']
        },
        // General Documents
        {
            id: 'doc-18',
            title: 'Engagement Agreement - WAPA',
            description: 'General legal document for trust administration',
            type: 'engagement_letter',
            requiresSignature: true,
            createdAt: '2024-01-21',
            lastModified: '2024-01-21',
            fileSize: '45 KB',
            isTemplate: true,
            placeholders: ['{{client_name}}', '{{service_type}}', '{{effective_date}}', '{{fee_structure}}']
        },
        // Investment Decisions Documents
        {
            id: 'doc-19',
            title: 'Investment Committee Creation and Appointment',
            description: 'Document for investment committee decisions and governance',
            type: 'trust_document',
            requiresSignature: true,
            createdAt: '2024-01-21',
            lastModified: '2024-01-21',
            fileSize: '38 KB',
            isTemplate: true,
            placeholders: ['{{grantor_name}}', '{{trustee_name}}', '{{trust_name}}', '{{effective_date}}', '{{state}}', '{{county}}']
        },
        {
            id: 'doc-20',
            title: 'Investment Committee Questionnaire Template',
            description: 'Document for investment committee decisions and governance',
            type: 'intake_form',
            requiresSignature: false,
            createdAt: '2024-01-21',
            lastModified: '2024-01-21',
            fileSize: '42 KB',
            isTemplate: true,
            placeholders: ['{{client_name}}', '{{date}}', '{{email}}', '{{phone}}']
        },
        {
            id: 'doc-21',
            title: 'Investment Committee Meeting Minutes',
            description: 'Document for investment committee decisions and governance',
            type: 'meeting_minutes',
            requiresSignature: true,
            createdAt: '2024-01-21',
            lastModified: '2024-01-21',
            fileSize: '36 KB',
            isTemplate: true,
            placeholders: ['{{company_name}}', '{{meeting_date}}', '{{attendees}}', '{{resolutions}}']
        },
        // Non Charitable Specific Purpose Trust Documents
        {
            id: 'doc-22',
            title: 'NCSPT Trust Agreement - One Trustee',
            description: 'NCSPT document for specific purpose trust structures',
            type: 'trust_document',
            requiresSignature: true,
            createdAt: '2024-01-21',
            lastModified: '2024-01-21',
            fileSize: '52 KB',
            isTemplate: true,
            placeholders: ['{{grantor_name}}', '{{trustee_name}}', '{{trust_name}}', '{{effective_date}}', '{{state}}', '{{county}}']
        },
        {
            id: 'doc-23',
            title: 'NCSPT Trust Agreement - Two Trustees',
            description: 'NCSPT document for specific purpose trust structures',
            type: 'trust_document',
            requiresSignature: true,
            createdAt: '2024-01-21',
            lastModified: '2024-01-21',
            fileSize: '55 KB',
            isTemplate: true,
            placeholders: ['{{grantor_name}}', '{{trustee_name}}', '{{trust_name}}', '{{effective_date}}', '{{state}}', '{{county}}']
        },
        {
            id: 'doc-24',
            title: 'NCSPT Certification of Trust - One Trustee',
            description: 'NCSPT document for specific purpose trust structures',
            type: 'trust_document',
            requiresSignature: true,
            createdAt: '2024-01-21',
            lastModified: '2024-01-21',
            fileSize: '28 KB',
            isTemplate: true,
            placeholders: ['{{grantor_name}}', '{{trustee_name}}', '{{trust_name}}', '{{effective_date}}', '{{state}}', '{{county}}']
        },
        {
            id: 'doc-25',
            title: 'NCSPT Certification of Trust - Two Trustees',
            description: 'NCSPT document for specific purpose trust structures',
            type: 'trust_document',
            requiresSignature: true,
            createdAt: '2024-01-21',
            lastModified: '2024-01-21',
            fileSize: '30 KB',
            isTemplate: true,
            placeholders: ['{{grantor_name}}', '{{trustee_name}}', '{{trust_name}}', '{{effective_date}}', '{{state}}', '{{county}}']
        },
        // Core Trust Documents
        {
            id: 'doc-26',
            title: 'Grantor Trust - One Grantor',
            description: 'Core trust agreement and certification document',
            type: 'trust_document',
            requiresSignature: true,
            createdAt: '2024-01-21',
            lastModified: '2024-01-21',
            fileSize: '48 KB',
            isTemplate: true,
            placeholders: ['{{grantor_name}}', '{{trustee_name}}', '{{trust_name}}', '{{effective_date}}', '{{state}}', '{{county}}']
        },
        {
            id: 'doc-27',
            title: 'Grantor Trust - Two Grantors',
            description: 'Core trust agreement and certification document',
            type: 'trust_document',
            requiresSignature: true,
            createdAt: '2024-01-21',
            lastModified: '2024-01-21',
            fileSize: '50 KB',
            isTemplate: true,
            placeholders: ['{{grantor_name}}', '{{trustee_name}}', '{{trust_name}}', '{{effective_date}}', '{{state}}', '{{county}}']
        },
        {
            id: 'doc-28',
            title: 'Non-Grantor Trust - One Grantor',
            description: 'Core trust agreement and certification document',
            type: 'trust_document',
            requiresSignature: true,
            createdAt: '2024-01-21',
            lastModified: '2024-01-21',
            fileSize: '46 KB',
            isTemplate: true,
            placeholders: ['{{grantor_name}}', '{{trustee_name}}', '{{trust_name}}', '{{effective_date}}', '{{state}}', '{{county}}']
        },
        {
            id: 'doc-29',
            title: 'Non-Grantor Trust - Two Grantors',
            description: 'Core trust agreement and certification document',
            type: 'trust_document',
            requiresSignature: true,
            createdAt: '2024-01-21',
            lastModified: '2024-01-21',
            fileSize: '48 KB',
            isTemplate: true,
            placeholders: ['{{grantor_name}}', '{{trustee_name}}', '{{trust_name}}', '{{effective_date}}', '{{state}}', '{{county}}']
        },
        {
            id: 'doc-30',
            title: 'Certification of Trusts - One Grantor',
            description: 'Core trust agreement and certification document',
            type: 'trust_document',
            requiresSignature: true,
            createdAt: '2024-01-21',
            lastModified: '2024-01-21',
            fileSize: '25 KB',
            isTemplate: true,
            placeholders: ['{{grantor_name}}', '{{trustee_name}}', '{{trust_name}}', '{{effective_date}}', '{{state}}', '{{county}}']
        },
        {
            id: 'doc-31',
            title: 'Certification of Trusts - Two Grantors',
            description: 'Core trust agreement and certification document',
            type: 'trust_document',
            requiresSignature: true,
            createdAt: '2024-01-21',
            lastModified: '2024-01-21',
            fileSize: '27 KB',
            isTemplate: true,
            placeholders: ['{{grantor_name}}', '{{trustee_name}}', '{{trust_name}}', '{{effective_date}}', '{{state}}', '{{county}}']
        },
        {
            id: 'doc-32',
            title: 'Links to Questionnaires for Clients',
            description: 'Reference document with links to all client questionnaires',
            type: 'other',
            requiresSignature: false,
            createdAt: '2024-01-21',
            lastModified: '2024-01-21',
            fileSize: '15 KB',
            isTemplate: false
        }
    ]);

    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [previewDocument, setPreviewDocument] = useState<Document | null>(null);
    const [selectedType, setSelectedType] = useState<Document['type']>('other');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<'all' | Document['type']>('all');

    const documentTypes = [
        { value: 'engagement_letter', label: 'Engagement Letter' },
        { value: 'intake_form', label: 'Intake Form' },
        { value: 'disclosure', label: 'Disclosure' },
        { value: 'service_agreement', label: 'Service Agreement' },
        { value: 'trust_document', label: 'Trust Document' },
        { value: 'meeting_minutes', label: 'Meeting Minutes' },
        { value: 'operating_agreement', label: 'Operating Agreement' },
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

    const handlePreview = (doc: Document) => {
        setPreviewDocument(doc);
        setShowPreviewModal(true);
    };

    const handleUploadNewVersion = (doc: Document) => {
        setUploadingDocument(doc);
        setShowUploadModal(true);
    };

    const handleUploadSubmit = () => {
        if (uploadingDocument && uploadFile) {
            // In a real app, this would upload the file
            const updatedDoc = {
                ...uploadingDocument,
                lastModified: new Date().toISOString().split('T')[0],
                fileSize: `${(uploadFile.size / 1024).toFixed(1)} KB`
            };
            setDocuments(documents.map(d => 
                d.id === uploadingDocument.id ? updatedDoc : d
            ));
            setShowUploadModal(false);
            setUploadingDocument(null);
            setUploadFile(null);
        }
    };

    const handleEdit = (doc: Document) => {
        setEditingDocument(doc);
        setEditFormData({
            title: doc.title,
            description: doc.description,
            placeholders: doc.placeholders || ['']
        });
        setShowEditModal(true);
    };

    const handleSaveEdit = () => {
        if (editingDocument) {
            const updatedDoc = {
                ...editingDocument,
                title: editFormData.title,
                description: editFormData.description,
                placeholders: editFormData.placeholders.filter(p => p.trim() !== ''),
                lastModified: new Date().toISOString().split('T')[0]
            };
            setDocuments(documents.map(d => d.id === editingDocument.id ? updatedDoc : d));
            setShowEditModal(false);
            setEditingDocument(null);
        }
    };

    const addPlaceholder = () => {
        setEditFormData({
            ...editFormData,
            placeholders: [...editFormData.placeholders, '']
        });
    };

    const updatePlaceholder = (index: number, value: string) => {
        const newPlaceholders = [...editFormData.placeholders];
        newPlaceholders[index] = value;
        setEditFormData({
            ...editFormData,
            placeholders: newPlaceholders
        });
    };

    const removePlaceholder = (index: number) => {
        setEditFormData({
            ...editFormData,
            placeholders: editFormData.placeholders.filter((_, i) => i !== index)
        });
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
                                        <div style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            {doc.title}
                                            {doc.isTemplate && (
                                                <span style={{ 
                                                    fontSize: '11px', 
                                                    background: 'var(--primary)', 
                                                    color: 'white', 
                                                    padding: '2px 6px', 
                                                    borderRadius: '4px' 
                                                }}>
                                                    Template
                                                </span>
                                            )}
                                        </div>
                                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                                            {doc.description}
                                        </div>
                                        {doc.placeholders && doc.placeholders.length > 0 && (
                                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                                                {doc.placeholders.length} placeholder{doc.placeholders.length > 1 ? 's' : ''}
                                            </div>
                                        )}
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
                                            onClick={() => handleUploadNewVersion(doc)}
                                        >
                                            Upload New Version
                                        </button>
                                        <button 
                                            className="button-outline" 
                                            style={{ width: 'auto', padding: '4px 12px' }}
                                            onClick={() => handlePreview(doc)}
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

            {/* Preview Modal */}
            {showPreviewModal && previewDocument && (
                <div className="modal-overlay" onClick={() => setShowPreviewModal(false)}>
                    <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '700px', maxHeight: '80vh', overflow: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 className="section-title">Document Preview</h3>
                            <button 
                                className="button-outline" 
                                onClick={() => setShowPreviewModal(false)}
                                style={{ width: 'auto', fontSize: '20px', padding: '4px 12px' }}
                            >
                                ×
                            </button>
                        </div>
                        
                        <div style={{ 
                            border: '1px solid var(--border-light)', 
                            borderRadius: '8px', 
                            padding: '24px',
                            backgroundColor: 'var(--background-primary)'
                        }}>
                            <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>{previewDocument.title}</h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
                                {previewDocument.description}
                            </p>
                            
                            {previewDocument.isTemplate && previewDocument.placeholders && (
                                <div style={{ marginBottom: '24px' }}>
                                    <h4 style={{ fontSize: '16px', marginBottom: '12px' }}>Template Placeholders</h4>
                                    <div style={{ 
                                        background: 'var(--gray-light)', 
                                        padding: '16px', 
                                        borderRadius: '6px',
                                        fontSize: '14px'
                                    }}>
                                        <p style={{ marginBottom: '12px', fontWeight: 500 }}>
                                            This template contains {previewDocument.placeholders.length} mail-merge placeholders:
                                        </p>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px' }}>
                                            {previewDocument.placeholders.map((placeholder, idx) => (
                                                <div key={idx} style={{ 
                                                    background: 'white', 
                                                    padding: '6px 10px', 
                                                    borderRadius: '4px',
                                                    fontFamily: 'monospace',
                                                    fontSize: '12px',
                                                    border: '1px solid var(--border-light)'
                                                }}>
                                                    {placeholder}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            <div style={{ 
                                background: 'var(--gray-light)', 
                                padding: '20px', 
                                borderRadius: '6px',
                                minHeight: '200px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--text-secondary)'
                            }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '48px', marginBottom: '12px' }}>📄</div>
                                    <p>Document preview will be displayed here</p>
                                    {previewDocument.fileSize && (
                                        <p style={{ fontSize: '12px', marginTop: '8px' }}>File size: {previewDocument.fileSize}</p>
                                    )}
                                </div>
                            </div>
                            
                            <div style={{ 
                                marginTop: '24px', 
                                paddingTop: '20px', 
                                borderTop: '1px solid var(--border-light)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                                    <div>Type: {documentTypes.find(t => t.value === previewDocument.type)?.label}</div>
                                    <div>eSign Required: {previewDocument.requiresSignature ? 'Yes' : 'No'}</div>
                                </div>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <button 
                                        className="button-outline" 
                                        style={{ width: 'auto' }}
                                        onClick={() => setShowPreviewModal(false)}
                                    >
                                        Close
                                    </button>
                                    {previewDocument.isTemplate && (
                                        <button 
                                            className="form-button" 
                                            style={{ width: 'auto' }}
                                            onClick={() => {
                                                alert('Mail merge functionality coming soon - will allow you to fill in placeholders and generate personalized documents');
                                                setShowPreviewModal(false);
                                            }}
                                        >
                                            Use Template
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {showUploadModal && uploadingDocument && (
                <div className="modal-overlay" onClick={() => setShowUploadModal(false)}>
                    <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 className="section-title">Upload New Version</h3>
                            <button 
                                className="button-outline" 
                                onClick={() => setShowUploadModal(false)}
                                style={{ width: 'auto', fontSize: '20px', padding: '4px 12px' }}
                            >
                                ×
                            </button>
                        </div>
                        
                        <div style={{ marginBottom: '20px' }}>
                            <p><strong>Document:</strong> {uploadingDocument.title}</p>
                            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                                Current version: {uploadingDocument.lastModified}
                            </p>
                        </div>
                        
                        <div style={{ marginBottom: '20px' }}>
                            <label className="form-label">Select New Version File</label>
                            <input 
                                type="file"
                                className="form-input"
                                onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                                accept=".pdf,.doc,.docx"
                            />
                            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px' }}>
                                Accepted formats: PDF, DOC, DOCX
                            </p>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                            <button 
                                className="button-outline" 
                                style={{ width: 'auto' }}
                                onClick={() => {
                                    setShowUploadModal(false);
                                    setUploadFile(null);
                                }}
                            >
                                Cancel
                            </button>
                            <button 
                                className="form-button" 
                                style={{ width: 'auto' }}
                                onClick={handleUploadSubmit}
                                disabled={!uploadFile}
                            >
                                Upload New Version
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showEditModal && editingDocument && (
                <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
                    <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 className="section-title">Edit Document Template</h3>
                            <button 
                                className="button-outline" 
                                onClick={() => setShowEditModal(false)}
                                style={{ width: 'auto', fontSize: '20px', padding: '4px 12px' }}
                            >
                                ×
                            </button>
                        </div>
                        
                        <div>
                            <div style={{ marginBottom: '20px' }}>
                                <label className="form-label">Document Title</label>
                                <input 
                                    type="text" 
                                    className="form-input" 
                                    value={editFormData.title}
                                    onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                                />
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label className="form-label">Description</label>
                                <textarea 
                                    className="form-input" 
                                    rows={3}
                                    value={editFormData.description}
                                    onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                                />
                            </div>

                            {editingDocument.isTemplate && (
                                <div style={{ marginBottom: '20px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                        <label className="form-label" style={{ marginBottom: 0 }}>Template Placeholders</label>
                                        <button 
                                            className="button-outline" 
                                            style={{ width: 'auto', padding: '4px 12px' }}
                                            onClick={addPlaceholder}
                                        >
                                            + Add Placeholder
                                        </button>
                                    </div>
                                    
                                    {editFormData.placeholders.map((placeholder, index) => (
                                        <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                            <input 
                                                type="text" 
                                                className="form-input" 
                                                placeholder="e.g., {{client_name}}"
                                                value={placeholder}
                                                onChange={(e) => updatePlaceholder(index, e.target.value)}
                                            />
                                            <button 
                                                className="button-outline" 
                                                style={{ width: 'auto', padding: '8px 12px', color: 'var(--danger)' }}
                                                onClick={() => removePlaceholder(index)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    
                                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px' }}>
                                        Use double curly braces for placeholders, e.g., {{literal}}{{client_name}}{{literal}}
                                    </p>
                                </div>
                            )}

                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
                                <button 
                                    className="button-outline" 
                                    style={{ width: 'auto' }}
                                    onClick={() => setShowEditModal(false)}
                                >
                                    Cancel
                                </button>
                                <button 
                                    className="form-button" 
                                    style={{ width: 'auto' }}
                                    onClick={handleSaveEdit}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </ModuleTemplate>
    );
};

export default DocumentLibraryAdmin;
