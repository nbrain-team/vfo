import React, { useState, useEffect } from 'react';
import apiClient from '../apiClient';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DocumentChat from './DocumentChat';

interface Document {
    id: number;
    name: string;
    type: string;
    entity: string;
    uploadDate: string;
    status: string;
    tags: string[];
    keyProvisions?: string[];
    trustees?: string[];
    successors?: string[];
    triggerConditions?: string[];
    expiryDate?: string;
}

interface ComplianceItem {
    id: number;
    category: string;
    item: string;
    status: 'Complete' | 'Pending' | 'Overdue';
    dueDate?: string;
    description: string;
}

const LegalIQ: React.FC = () => {
    const [activeTab, setActiveTab] = useState('vault');
    const [documents, setDocuments] = useState<Document[]>([]);
    const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
    const [complianceItems, setComplianceItems] = useState<ComplianceItem[]>([]);
    const [showUpload, setShowUpload] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    // Mock data for demonstration
    useEffect(() => {
        // Mock documents
        const mockDocs: Document[] = [
            {
                id: 1,
                name: 'Family Trust Agreement 2024',
                type: 'Trust',
                entity: 'Smith Family Trust',
                uploadDate: '2024-03-15',
                status: 'Active',
                tags: ['Trust', 'Estate Planning', 'Current'],
                keyProvisions: ['Revocable trust', 'Successor trustee provision', 'Distribution at age 25'],
                trustees: ['John Smith', 'Jane Smith'],
                successors: ['Robert Smith', 'Emily Smith'],
                triggerConditions: ['Death of grantor', 'Incapacity of grantor'],
                expiryDate: '2054-03-15'
            },
            {
                id: 2,
                name: 'Last Will and Testament - John Smith',
                type: 'Will',
                entity: 'John Smith',
                uploadDate: '2024-02-20',
                status: 'Active',
                tags: ['Will', 'Estate Planning', 'Current'],
                keyProvisions: ['Equal distribution to children', 'Charitable bequest of 10%'],
                trustees: ['Jane Smith'],
                successors: ['First National Bank Trust Department']
            },
            {
                id: 3,
                name: 'Power of Attorney - Healthcare',
                type: 'POA',
                entity: 'John Smith',
                uploadDate: '2024-01-10',
                status: 'Active',
                tags: ['POA', 'Healthcare', 'Current'],
                keyProvisions: ['Healthcare decisions', 'End-of-life care'],
                trustees: ['Jane Smith', 'Dr. Michael Brown']
            },
            {
                id: 4,
                name: 'LLC Operating Agreement - Smith Ventures',
                type: 'Corporate',
                entity: 'Smith Ventures LLC',
                uploadDate: '2023-11-05',
                status: 'Active',
                tags: ['Corporate', 'LLC', 'Business'],
                keyProvisions: ['Member-managed', 'Profit distribution quarterly', 'Buy-sell provisions']
            },
            {
                id: 5,
                name: 'Investment Policy Statement',
                type: 'Policy',
                entity: 'Smith Family Office',
                uploadDate: '2024-04-01',
                status: 'Under Review',
                tags: ['Investment', 'Policy', 'Governance'],
                keyProvisions: ['60/40 equity/bond allocation', 'ESG investment criteria', 'Quarterly rebalancing']
            }
        ];
        setDocuments(mockDocs);

        // Mock compliance items
        const mockCompliance: ComplianceItem[] = [
            {
                id: 1,
                category: 'Estate Planning',
                item: 'Annual Trust Review',
                status: 'Complete',
                dueDate: '2024-12-31',
                description: 'Review and update trust documents'
            },
            {
                id: 2,
                category: 'Corporate',
                item: 'LLC Annual Report Filing',
                status: 'Pending',
                dueDate: '2024-11-15',
                description: 'File annual report with state'
            },
            {
                id: 3,
                category: 'Tax',
                item: 'Gift Tax Return Preparation',
                status: 'Pending',
                dueDate: '2025-04-15',
                description: 'Prepare Form 709 for annual gifts'
            },
            {
                id: 4,
                category: 'Estate Planning',
                item: 'Beneficiary Designation Review',
                status: 'Overdue',
                dueDate: '2024-09-30',
                description: 'Review and update beneficiary designations on all accounts'
            },
            {
                id: 5,
                category: 'Regulatory',
                item: 'KYC/AML Documentation Update',
                status: 'Complete',
                dueDate: '2024-08-01',
                description: 'Update know-your-customer documentation'
            }
        ];
        setComplianceItems(mockCompliance);
    }, []);

    // Document type distribution for pie chart
    const docTypeData = documents.reduce((acc, doc) => {
        const existing = acc.find(item => item.name === doc.type);
        if (existing) {
            existing.value++;
        } else {
            acc.push({ name: doc.type, value: 1 });
        }
        return acc;
    }, [] as { name: string; value: number }[]);

    // Compliance status data for bar chart
    const complianceData = [
        { name: 'Complete', value: complianceItems.filter(i => i.status === 'Complete').length, fill: '#28a745' },
        { name: 'Pending', value: complianceItems.filter(i => i.status === 'Pending').length, fill: '#ffc107' },
        { name: 'Overdue', value: complianceItems.filter(i => i.status === 'Overdue').length, fill: '#dc3545' }
    ];

    const COLORS = ['#0066ff', '#28a745', '#ffc107', '#dc3545', '#6c757d'];

    const filteredDocs = documents.filter(doc => {
        const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            doc.entity.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTags = selectedTags.length === 0 || 
                           selectedTags.some(tag => doc.tags.includes(tag));
        return matchesSearch && matchesTags;
    });

    const allTags = Array.from(new Set(documents.flatMap(doc => doc.tags)));

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">legalIQ</h1>
                <p className="page-description">
                    Intelligent legal document management with AI-powered extraction and compliance tracking
                </p>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
                {['vault', 'extraction', 'compliance', 'analytics', 'chat'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`time-button ${activeTab === tab ? 'active' : ''}`}
                        style={{ padding: '10px 20px', textTransform: 'capitalize' }}
                    >
                        {tab === 'vault' && '▣ Document Vault'}
                        {tab === 'extraction' && '▣ AI Extraction'}
                        {tab === 'compliance' && '▣ Compliance'}
                        {tab === 'analytics' && '▣ Analytics'}
                        {tab === 'chat' && '▣ AI Chat'}
                    </button>
                ))}
            </div>

            {/* Document Vault Tab */}
            {activeTab === 'vault' && (
                <div className="module-grid">
                    <div className="module-card">
                        <div className="section-header">
                            <h3 className="section-title">Document Repository</h3>
                            <button
                                onClick={() => setShowUpload(true)}
                                className="form-button"
                                style={{ width: 'auto', padding: '8px 20px' }}
                            >
                                Upload Document
                            </button>
                        </div>

                        {/* Search and Filters */}
                        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                            <input
                                type="text"
                                placeholder="Search documents..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="form-input"
                                style={{ flex: 1 }}
                            />
                            <select 
                                className="form-input" 
                                style={{ width: 'auto' }}
                                onChange={(e) => setSelectedTags(e.target.value ? [e.target.value] : [])}
                            >
                                <option value="">All Tags</option>
                                {allTags.map(tag => (
                                    <option key={tag} value={tag}>{tag}</option>
                                ))}
                            </select>
                        </div>

                        {/* Documents Table */}
                        <div className="table-container" style={{ marginTop: '20px' }}>
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Document Name</th>
                                        <th>Type</th>
                                        <th>Entity</th>
                                        <th>Upload Date</th>
                                        <th>Status</th>
                                        <th>Tags</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredDocs.map(doc => (
                                        <tr key={doc.id}>
                                            <td style={{ fontWeight: '500' }}>{doc.name}</td>
                                            <td>{doc.type}</td>
                                            <td>{doc.entity}</td>
                                            <td>{doc.uploadDate}</td>
                                            <td>
                                                <span className={`status-badge ${doc.status === 'Active' ? 'active' : 'pending'}`}>
                                                    {doc.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                                    {doc.tags.slice(0, 2).map(tag => (
                                                        <span 
                                                            key={tag}
                                                            style={{
                                                                fontSize: '11px',
                                                                padding: '2px 6px',
                                                                backgroundColor: 'var(--gray-light)',
                                                                borderRadius: '3px'
                                                            }}
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => setSelectedDoc(doc)}
                                                    style={{
                                                        padding: '4px 8px',
                                                        fontSize: '12px',
                                                        backgroundColor: 'var(--primary)',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: 'var(--radius)',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Document Type Distribution */}
                    <div className="module-card">
                        <h3 className="section-title">Document Distribution</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={docTypeData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={(entry: any) => `${entry.name}: ${entry.value}`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {docTypeData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            {/* AI Extraction Tab */}
            {activeTab === 'extraction' && (
                <div className="module-grid">
                    {selectedDoc ? (
                        <div className="module-card">
                            <h3 className="section-title">AI-Extracted Information: {selectedDoc.name}</h3>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
                                <div>
                                    <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>
                                        ▣ Key Provisions
                                    </h4>
                                    <ul style={{ listStyle: 'none', padding: 0 }}>
                                        {selectedDoc.keyProvisions?.map((provision, idx) => (
                                            <li key={idx} style={{ 
                                                padding: '8px', 
                                                backgroundColor: 'var(--gray-light)', 
                                                marginBottom: '8px',
                                                borderRadius: 'var(--radius)',
                                                fontSize: '13px'
                                            }}>
                                                • {provision}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>
                                        👥 Trustees & Fiduciaries
                                    </h4>
                                    <ul style={{ listStyle: 'none', padding: 0 }}>
                                        {selectedDoc.trustees?.map((trustee, idx) => (
                                            <li key={idx} style={{ 
                                                padding: '8px', 
                                                backgroundColor: 'var(--primary-light)', 
                                                marginBottom: '8px',
                                                borderRadius: 'var(--radius)',
                                                fontSize: '13px'
                                            }}>
                                                {trustee}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>
                                        🔄 Successor Details
                                    </h4>
                                    <ul style={{ listStyle: 'none', padding: 0 }}>
                                        {selectedDoc.successors?.map((successor, idx) => (
                                            <li key={idx} style={{ 
                                                padding: '8px', 
                                                backgroundColor: 'var(--success-light)', 
                                                marginBottom: '8px',
                                                borderRadius: 'var(--radius)',
                                                fontSize: '13px'
                                            }}>
                                                {successor}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>
                                        ⚡ Trigger Conditions
                                    </h4>
                                    <ul style={{ listStyle: 'none', padding: 0 }}>
                                        {selectedDoc.triggerConditions?.map((condition, idx) => (
                                            <li key={idx} style={{ 
                                                padding: '8px', 
                                                backgroundColor: '#fff3cd', 
                                                marginBottom: '8px',
                                                borderRadius: 'var(--radius)',
                                                fontSize: '13px'
                                            }}>
                                                • {condition}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedDoc(null)}
                                className="form-button"
                                style={{ marginTop: '20px', width: 'auto', padding: '8px 20px' }}
                            >
                                Back to Documents
                            </button>
                        </div>
                    ) : (
                        <div className="module-card">
                            <h3 className="section-title">Select a Document for AI Analysis</h3>
                            <p style={{ color: 'var(--text-secondary)', marginTop: '20px' }}>
                                Choose a document from the vault to view AI-extracted information including:
                            </p>
                            <ul style={{ marginTop: '20px', color: 'var(--text-secondary)' }}>
                                <li>Key clauses and provisions</li>
                                <li>Trustee and fiduciary roles</li>
                                <li>Successor beneficiary details</li>
                                <li>Trigger conditions and contingencies</li>
                                <li>Important dates and deadlines</li>
                            </ul>
                            <button
                                onClick={() => setActiveTab('vault')}
                                className="form-button"
                                style={{ marginTop: '20px', width: 'auto', padding: '8px 20px' }}
                            >
                                Go to Document Vault
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Compliance Tab */}
            {activeTab === 'compliance' && (
                <div className="module-grid">
                    <div className="module-card">
                        <h3 className="section-title">Compliance Checklist</h3>
                        
                        <div className="table-container" style={{ marginTop: '20px' }}>
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Category</th>
                                        <th>Item</th>
                                        <th>Status</th>
                                        <th>Due Date</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {complianceItems.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.category}</td>
                                            <td style={{ fontWeight: '500' }}>{item.item}</td>
                                            <td>
                                                <span className={`status-badge ${
                                                    item.status === 'Complete' ? 'active' : 
                                                    item.status === 'Pending' ? 'pending' : 'invited'
                                                }`} style={{
                                                    backgroundColor: item.status === 'Overdue' ? 'var(--danger-light)' : undefined,
                                                    color: item.status === 'Overdue' ? 'var(--danger)' : undefined
                                                }}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td>{item.dueDate}</td>
                                            <td style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                                                {item.description}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="module-card">
                        <h3 className="section-title">Compliance Status Overview</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={complianceData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#8884d8">
                                    {complianceData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
                <div className="module-grid">
                    <div className="summary-row" style={{ gridColumn: 'span 2' }}>
                        <div className="summary-card">
                            <div className="summary-label">Total Documents</div>
                            <div className="summary-value">{documents.length}</div>
                            <div className="summary-change">Across {new Set(documents.map(d => d.entity)).size} entities</div>
                        </div>
                        <div className="summary-card">
                            <div className="summary-label">Compliance Score</div>
                            <div className="summary-value">
                                {Math.round((complianceItems.filter(i => i.status === 'Complete').length / complianceItems.length) * 100)}%
                            </div>
                            <div className="summary-change positive">Above target</div>
                        </div>
                        <div className="summary-card">
                            <div className="summary-label">Documents Expiring</div>
                            <div className="summary-value">2</div>
                            <div className="summary-change negative">Within 90 days</div>
                        </div>
                        <div className="summary-card">
                            <div className="summary-label">AI Extractions</div>
                            <div className="summary-value">156</div>
                            <div className="summary-change">This month</div>
                        </div>
                    </div>

                    <div className="module-card">
                        <h3 className="section-title">Missing Documents Alert</h3>
                        <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
                            <li style={{ 
                                padding: '12px', 
                                backgroundColor: 'var(--danger-light)', 
                                color: 'var(--danger)',
                                marginBottom: '10px',
                                borderRadius: 'var(--radius)',
                                fontSize: '14px'
                            }}>
                                ⚠️ Missing: Durable Power of Attorney for Jane Smith
                            </li>
                            <li style={{ 
                                padding: '12px', 
                                backgroundColor: '#fff3cd', 
                                color: '#856404',
                                marginBottom: '10px',
                                borderRadius: 'var(--radius)',
                                fontSize: '14px'
                            }}>
                                ⚠️ Outdated: Investment Policy Statement (last updated 2022)
                            </li>
                            <li style={{ 
                                padding: '12px', 
                                backgroundColor: 'var(--primary-light)', 
                                color: 'var(--primary)',
                                borderRadius: 'var(--radius)',
                                fontSize: '14px'
                            }}>
                                ℹ️ Recommended: Create Charitable Remainder Trust documentation
                            </li>
                        </ul>
                    </div>

                    <div className="module-card">
                        <h3 className="section-title">Document Activity Timeline</h3>
                        <div style={{ marginTop: '20px' }}>
                            {[
                                { date: '2024-11-07', action: 'Uploaded', doc: 'Q3 Financial Statements' },
                                { date: '2024-11-05', action: 'AI Analyzed', doc: 'Trust Amendment #3' },
                                { date: '2024-11-01', action: 'Reviewed', doc: 'LLC Operating Agreement' },
                                { date: '2024-10-28', action: 'Updated', doc: 'Investment Policy Statement' },
                            ].map((activity, idx) => (
                                <div key={idx} style={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between',
                                    padding: '10px',
                                    borderBottom: '1px solid var(--border-light)',
                                    fontSize: '13px'
                                }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>{activity.date}</span>
                                    <span style={{ fontWeight: '500' }}>{activity.action}</span>
                                    <span>{activity.doc}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* AI Chat Tab */}
            {activeTab === 'chat' && (
                <div className="module-grid">
                    <div className="module-card" style={{ gridColumn: 'span 2' }}>
                        <h3 className="section-title">Intelligent Document Q&A</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '14px' }}>
                            Chat with your legal documents using GPT-4o. Ask questions about trust provisions, 
                            compliance requirements, key dates, or any other information in your documents.
                        </p>
                        <DocumentChat 
                            contextType="legal"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default LegalIQ; 