import React, { useState, useEffect } from 'react';
import ModuleTemplate from './ModuleTemplate';
import apiClient from '../../apiClient';

interface FormField {
    id: string;
    type: 'text' | 'email' | 'phone' | 'select' | 'checkbox' | 'textarea' | 'date';
    label: string;
    placeholder?: string;
    required: boolean;
    options?: string[]; // for select fields
}

interface FormTemplate {
    id: string;
    name: string;
    description: string;
    fields: FormField[];
    createdAt: string;
    mappedProcess?: string; // Maps to frontend process/engagement type
    trackProgress?: boolean; // Whether to track completion progress
    triggerWorkflow?: string; // Workflow automation to trigger on submission
}

interface FormSubmission {
    id: string;
    formId: string;
    clientId: string;
    clientName: string;
    data: Record<string, any>;
    submittedAt: string;
    status: 'pending' | 'processed' | 'completed';
    progressSteps?: string[];
    completedSteps?: string[];
}

const FormbuilderAdminNew: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'forms' | 'submissions' | 'mapping'>('forms');
    const [forms, setForms] = useState<FormTemplate[]>([]);
    const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showMappingModal, setShowMappingModal] = useState(false);
    const [selectedForm, setSelectedForm] = useState<FormTemplate | null>(null);
    const [showPreview, setShowPreview] = useState(false);
    
    // Form creation/editing state
    const [formName, setFormName] = useState('');
    const [formDescription, setFormDescription] = useState('');
    const [formFields, setFormFields] = useState<FormField[]>([]);
    const [editingForm, setEditingForm] = useState<FormTemplate | null>(null);
    
    // Mapping state
    const [mappedProcess, setMappedProcess] = useState('');
    const [trackProgress, setTrackProgress] = useState(false);
    const [triggerWorkflow, setTriggerWorkflow] = useState('');
    
    const processes = [
        { value: 'consultation', label: 'Initial Consultation' },
        { value: 'engagement', label: 'Client Engagement' },
        { value: 'questionnaire', label: 'Matter Questionnaire' },
        { value: 'onboarding', label: 'Client Onboarding' },
        { value: 'document', label: 'Document Collection' },
        { value: 'custom', label: 'Custom Process' }
    ];
    
    const workflows = [
        { value: 'auto-create-matter', label: 'Auto-create Matter in CRM' },
        { value: 'send-engagement', label: 'Send Engagement Letter' },
        { value: 'notify-advisor', label: 'Notify Advisor' },
        { value: 'add-to-nurture', label: 'Add to Nurture Sequence' },
        { value: 'schedule-followup', label: 'Schedule Follow-up' }
    ];
    
    const fieldTypes = [
        { value: 'text', label: 'Text Input' },
        { value: 'email', label: 'Email' },
        { value: 'phone', label: 'Phone' },
        { value: 'textarea', label: 'Text Area' },
        { value: 'select', label: 'Dropdown' },
        { value: 'checkbox', label: 'Checkboxes' },
        { value: 'date', label: 'Date Picker' }
    ];
    
    // Load initial data
    useEffect(() => {
        loadForms();
        loadSubmissions();
    }, []);
    
    const loadForms = async () => {
        // In production, load from backend
        const mockForms: FormTemplate[] = [
            {
                id: 'form-1',
                name: 'Client Consultation Booking',
                description: 'Initial consultation booking form',
                fields: [
                    { id: 'f1', type: 'text', label: 'Full Name', required: true },
                    { id: 'f2', type: 'email', label: 'Email', required: true },
                    { id: 'f3', type: 'phone', label: 'Phone', required: false },
                    { id: 'f4', type: 'select', label: 'Consultation Type', required: true, options: ['Asset Protection', 'Estate Planning', 'Tax Strategy'] }
                ],
                createdAt: new Date().toISOString(),
                mappedProcess: 'consultation',
                trackProgress: true,
                triggerWorkflow: 'auto-create-matter'
            }
        ];
        setForms(mockForms);
    };
    
    const loadSubmissions = async () => {
        // In production, load from backend
        const mockSubmissions: FormSubmission[] = [
            {
                id: 'sub-1',
                formId: 'form-1',
                clientId: 'client-123',
                clientName: 'John Doe',
                data: { name: 'John Doe', email: 'john@example.com' },
                submittedAt: new Date().toISOString(),
                status: 'processed',
                progressSteps: ['Form Submitted', 'Reviewed', 'Matter Created', 'Engagement Sent'],
                completedSteps: ['Form Submitted', 'Reviewed', 'Matter Created']
            }
        ];
        setSubmissions(mockSubmissions);
    };
    
    const saveForm = () => {
        const newForm: FormTemplate = {
            id: editingForm?.id || `form-${Date.now()}`,
            name: formName,
            description: formDescription,
            fields: formFields,
            createdAt: editingForm?.createdAt || new Date().toISOString(),
            mappedProcess: editingForm?.mappedProcess,
            trackProgress: editingForm?.trackProgress,
            triggerWorkflow: editingForm?.triggerWorkflow
        };
        
        if (editingForm) {
            setForms(forms.map(f => f.id === editingForm.id ? newForm : f));
        } else {
            setForms([...forms, newForm]);
        }
        
        resetFormModal();
    };
    
    const resetFormModal = () => {
        setShowCreateModal(false);
        setEditingForm(null);
        setFormName('');
        setFormDescription('');
        setFormFields([]);
    };
    
    const addField = () => {
        const newField: FormField = {
            id: `field-${Date.now()}`,
            type: 'text',
            label: 'New Field',
            required: false
        };
        setFormFields([...formFields, newField]);
    };
    
    const updateField = (index: number, updates: Partial<FormField>) => {
        const updated = [...formFields];
        updated[index] = { ...updated[index], ...updates };
        setFormFields(updated);
    };
    
    const removeField = (index: number) => {
        setFormFields(formFields.filter((_, i) => i !== index));
    };
    
    const saveMapping = () => {
        if (selectedForm) {
            const updated = {
                ...selectedForm,
                mappedProcess,
                trackProgress,
                triggerWorkflow
            };
            setForms(forms.map(f => f.id === selectedForm.id ? updated : f));
            
            // In production, save to backend
            console.log('Saving form mapping:', updated);
        }
        setShowMappingModal(false);
        setSelectedForm(null);
    };
    
    const deleteForm = (formId: string) => {
        if (confirm('Are you sure you want to delete this form?')) {
            setForms(forms.filter(f => f.id !== formId));
        }
    };
    
    const openEditModal = (form: FormTemplate) => {
        setEditingForm(form);
        setFormName(form.name);
        setFormDescription(form.description);
        setFormFields(form.fields);
        setShowCreateModal(true);
    };
    
    const openMappingModal = (form: FormTemplate) => {
        setSelectedForm(form);
        setMappedProcess(form.mappedProcess || '');
        setTrackProgress(form.trackProgress || false);
        setTriggerWorkflow(form.triggerWorkflow || '');
        setShowMappingModal(true);
    };

    return (
        <ModuleTemplate
            title="Form Builder"
            description="Create forms, map to processes, and track submissions with progress."
        >
            <div className="module-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 className="section-title">Form Management</h3>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                            className={activeTab === 'forms' ? 'form-button' : 'button-outline'}
                            style={{ width: 'auto' }} 
                            onClick={() => setActiveTab('forms')}
                        >
                            Forms
                        </button>
                        <button 
                            className={activeTab === 'submissions' ? 'form-button' : 'button-outline'}
                            style={{ width: 'auto' }} 
                            onClick={() => setActiveTab('submissions')}
                        >
                            Submissions
                        </button>
                        <button 
                            className={activeTab === 'mapping' ? 'form-button' : 'button-outline'}
                            style={{ width: 'auto' }} 
                            onClick={() => setActiveTab('mapping')}
                        >
                            Process Mapping
                        </button>
                    </div>
                </div>
                
                {activeTab === 'forms' && (
                    <>
                        <button 
                            className="form-button" 
                            style={{ width: 'auto', marginBottom: '16px' }} 
                            onClick={() => setShowCreateModal(true)}
                        >
                            + Create New Form
                        </button>
                        
                        <div className="module-grid">
                            {forms.map(form => (
                                <div key={form.id} className="module-card">
                                    <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>{form.name}</h4>
                                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                                        {form.description}
                                    </p>
                                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                                        {form.fields.length} fields
                                    </p>
                                    
                                    {form.mappedProcess && (
                                        <div style={{ 
                                            marginTop: '12px', 
                                            padding: '8px', 
                                            background: 'var(--primary-light)', 
                                            borderRadius: '6px',
                                            fontSize: '12px'
                                        }}>
                                            <strong>Mapped to:</strong> {processes.find(p => p.value === form.mappedProcess)?.label}<br/>
                                            {form.trackProgress && <span>✓ Progress tracking enabled</span>}
                                        </div>
                                    )}
                                    
                                    <div style={{ marginTop: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                        <button 
                                            className="button-outline" 
                                            style={{ width: 'auto' }}
                                            onClick={() => openEditModal(form)}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className="button-outline" 
                                            style={{ width: 'auto' }}
                                            onClick={() => openMappingModal(form)}
                                        >
                                            Map Process
                                        </button>
                                        <button 
                                            className="button-outline" 
                                            style={{ width: 'auto' }}
                                            onClick={() => {
                                                setSelectedForm(form);
                                                setShowPreview(true);
                                            }}
                                        >
                                            Preview
                                        </button>
                                        <button 
                                            className="button-outline" 
                                            style={{ width: 'auto' }}
                                            onClick={() => deleteForm(form.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
                
                {activeTab === 'submissions' && (
                    <div style={{ marginTop: '20px' }}>
                        <h4 style={{ marginBottom: '16px' }}>Recent Form Submissions</h4>
                        <div className="table-container">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Form</th>
                                        <th>Client</th>
                                        <th>Submitted</th>
                                        <th>Status</th>
                                        <th>Progress</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {submissions.length === 0 && (
                                        <tr>
                                            <td colSpan={6} style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                                                No submissions yet
                                            </td>
                                        </tr>
                                    )}
                                    {submissions.map(sub => (
                                        <tr key={sub.id}>
                                            <td>{forms.find(f => f.id === sub.formId)?.name || 'Unknown'}</td>
                                            <td>{sub.clientName}</td>
                                            <td>{new Date(sub.submittedAt).toLocaleDateString()}</td>
                                            <td>
                                                <span className={`status-badge ${sub.status === 'completed' ? 'success' : sub.status === 'processed' ? 'active' : 'pending'}`}>
                                                    {sub.status}
                                                </span>
                                            </td>
                                            <td>
                                                {sub.progressSteps && (
                                                    <div style={{ fontSize: '12px' }}>
                                                        {sub.completedSteps?.length || 0} of {sub.progressSteps.length} steps
                                                    </div>
                                                )}
                                            </td>
                                            <td>
                                                <button className="button-outline" style={{ width: 'auto' }}>
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                
                {activeTab === 'mapping' && (
                    <div style={{ marginTop: '20px' }}>
                        <h4 style={{ marginBottom: '16px' }}>Process Mapping Configuration</h4>
                        <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
                            Map forms to frontend processes and configure automation workflows
                        </p>
                        <div className="table-container">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Form</th>
                                        <th>Mapped Process</th>
                                        <th>Progress Tracking</th>
                                        <th>Workflow</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {forms.map(form => (
                                        <tr key={form.id}>
                                            <td>{form.name}</td>
                                            <td>{processes.find(p => p.value === form.mappedProcess)?.label || 'Not mapped'}</td>
                                            <td>{form.trackProgress ? '✓ Enabled' : '—'}</td>
                                            <td>{workflows.find(w => w.value === form.triggerWorkflow)?.label || 'None'}</td>
                                            <td>
                                                <button 
                                                    className="button-outline" 
                                                    style={{ width: 'auto' }}
                                                    onClick={() => openMappingModal(form)}
                                                >
                                                    Configure
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Create/Edit Form Modal */}
            {showCreateModal && (
                <div style={{ 
                    position: 'fixed', 
                    inset: 0, 
                    background: 'rgba(0,0,0,0.5)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    zIndex: 50 
                }}
                onClick={resetFormModal}
                >
                    <div 
                        className="module-card" 
                        style={{ 
                            width: '90%', 
                            maxWidth: '800px', 
                            maxHeight: '90vh', 
                            overflow: 'auto', 
                            background: '#ffffff' 
                        }} 
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h2 className="section-title" style={{ margin: 0 }}>
                                {editingForm ? 'Edit Form' : 'Create New Form'}
                            </h2>
                            <button 
                                onClick={resetFormModal}
                                style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: 'var(--text-secondary)' }}
                            >
                                ×
                            </button>
                        </div>
                        
                        <div style={{ marginBottom: '20px' }}>
                            <label className="form-label">Form Name</label>
                            <input 
                                className="form-input" 
                                value={formName}
                                onChange={(e) => setFormName(e.target.value)}
                                placeholder="e.g., Contact Form"
                            />
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label className="form-label">Description</label>
                            <textarea 
                                className="form-input" 
                                value={formDescription}
                                onChange={(e) => setFormDescription(e.target.value)}
                                placeholder="Brief description of this form"
                                rows={3}
                            />
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                <h3 style={{ margin: 0, fontSize: '16px' }}>Form Fields</h3>
                                <button 
                                    className="form-button" 
                                    style={{ width: 'auto' }}
                                    onClick={addField}
                                >
                                    + Add Field
                                </button>
                            </div>

                            <div style={{ display: 'grid', gap: '12px' }}>
                                {formFields.map((field, index) => (
                                    <div key={field.id} className="module-card" style={{ background: 'var(--gray-light)', padding: '16px' }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '12px', alignItems: 'start' }}>
                                            <div>
                                                <label className="form-label">Field Label</label>
                                                <input 
                                                    className="form-input" 
                                                    value={field.label}
                                                    onChange={(e) => updateField(index, { label: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="form-label">Field Type</label>
                                                <select 
                                                    className="form-input"
                                                    value={field.type}
                                                    onChange={(e) => updateField(index, { type: e.target.value as FormField['type'] })}
                                                >
                                                    {fieldTypes.map(type => (
                                                        <option key={type.value} value={type.value}>
                                                            {type.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <button 
                                                className="button-outline" 
                                                style={{ marginTop: '28px' }}
                                                onClick={() => removeField(index)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                        <div style={{ marginTop: '12px' }}>
                                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <input 
                                                    type="checkbox"
                                                    checked={field.required}
                                                    onChange={(e) => updateField(index, { required: e.target.checked })}
                                                />
                                                Required field
                                            </label>
                                        </div>
                                        
                                        {(field.type === 'select' || field.type === 'checkbox') && (
                                            <div style={{ marginTop: '12px' }}>
                                                <label className="form-label">Options</label>
                                                <div style={{ display: 'grid', gap: '8px' }}>
                                                    {(field.options || []).map((option, optIndex) => (
                                                        <div key={optIndex} style={{ display: 'flex', gap: '8px' }}>
                                                            <input 
                                                                className="form-input"
                                                                value={option}
                                                                onChange={(e) => {
                                                                    const newOptions = [...(field.options || [])];
                                                                    newOptions[optIndex] = e.target.value;
                                                                    updateField(index, { options: newOptions });
                                                                }}
                                                                placeholder={`Option ${optIndex + 1}`}
                                                            />
                                                            <button 
                                                                className="button-outline"
                                                                style={{ width: 'auto' }}
                                                                onClick={() => {
                                                                    const newOptions = (field.options || []).filter((_, i) => i !== optIndex);
                                                                    updateField(index, { options: newOptions });
                                                                }}
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    ))}
                                                    <button 
                                                        className="button-outline"
                                                        style={{ width: 'auto' }}
                                                        onClick={() => {
                                                            const newOptions = [...(field.options || []), ''];
                                                            updateField(index, { options: newOptions });
                                                        }}
                                                    >
                                                        + Add Option
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                            <button 
                                className="button-outline" 
                                onClick={resetFormModal}
                            >
                                Cancel
                            </button>
                            <button 
                                className="form-button" 
                                onClick={saveForm}
                                disabled={!formName || formFields.length === 0}
                            >
                                {editingForm ? 'Update Form' : 'Create Form'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Mapping Modal */}
            {showMappingModal && selectedForm && (
                <div style={{ 
                    position: 'fixed', 
                    inset: 0, 
                    background: 'rgba(0,0,0,0.5)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    zIndex: 50 
                }}
                onClick={() => setShowMappingModal(false)}
                >
                    <div 
                        className="module-card" 
                        style={{ 
                            width: '90%', 
                            maxWidth: '600px', 
                            background: '#ffffff' 
                        }} 
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="section-title" style={{ marginBottom: '20px' }}>
                            Map Form to Process
                        </h2>
                        
                        <p style={{ marginBottom: '20px', color: 'var(--text-secondary)' }}>
                            Configure how "{selectedForm.name}" integrates with your workflow
                        </p>
                        
                        <div style={{ marginBottom: '20px' }}>
                            <label className="form-label">Frontend Process</label>
                            <select 
                                className="form-input" 
                                value={mappedProcess}
                                onChange={(e) => setMappedProcess(e.target.value)}
                            >
                                <option value="">Select a process...</option>
                                {processes.map(p => (
                                    <option key={p.value} value={p.value}>{p.label}</option>
                                ))}
                            </select>
                            <small style={{ display: 'block', marginTop: '4px', color: 'var(--text-secondary)' }}>
                                Maps this form to a specific stage in the client journey
                            </small>
                        </div>
                        
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <input 
                                    type="checkbox"
                                    checked={trackProgress}
                                    onChange={(e) => setTrackProgress(e.target.checked)}
                                />
                                Track submission progress
                            </label>
                            <small style={{ display: 'block', marginTop: '4px', marginLeft: '24px', color: 'var(--text-secondary)' }}>
                                Shows completion status in client dashboard
                            </small>
                        </div>
                        
                        <div style={{ marginBottom: '20px' }}>
                            <label className="form-label">Trigger Workflow</label>
                            <select 
                                className="form-input" 
                                value={triggerWorkflow}
                                onChange={(e) => setTriggerWorkflow(e.target.value)}
                            >
                                <option value="">No automation...</option>
                                {workflows.map(w => (
                                    <option key={w.value} value={w.value}>{w.label}</option>
                                ))}
                            </select>
                            <small style={{ display: 'block', marginTop: '4px', color: 'var(--text-secondary)' }}>
                                Automatically runs when form is submitted
                            </small>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                            <button 
                                className="button-outline" 
                                onClick={() => setShowMappingModal(false)}
                            >
                                Cancel
                            </button>
                            <button 
                                className="form-button" 
                                onClick={saveMapping}
                            >
                                Save Mapping
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </ModuleTemplate>
    );
};

export default FormbuilderAdminNew;
