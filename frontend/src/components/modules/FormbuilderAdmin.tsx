import React, { useState } from 'react';
import ModuleTemplate from './ModuleTemplate';

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
}

const FormbuilderAdmin: React.FC = () => {
    const [showPreview, setShowPreview] = useState(false);
    const [previewForm, setPreviewForm] = useState<FormTemplate | null>(null);
    const [forms, setForms] = useState<FormTemplate[]>([
        {
            id: 'form-1',
            name: 'Contact Information Form',
            description: 'Basic contact information collection',
            fields: [
                { id: 'f1', type: 'text', label: 'Full Name', required: true },
                { id: 'f2', type: 'email', label: 'Email Address', required: true },
                { id: 'f3', type: 'phone', label: 'Phone Number', required: false }
            ],
            createdAt: new Date().toISOString()
        },
        {
            id: 'form-trustee-acceptance',
            name: 'Trustee Acceptance of Contribution to Trust',
            description: 'Form for documenting contributions to trust, holding company or subsidiary',
            fields: [
                { id: 'tf1', type: 'text', label: 'Name of Contributing Party', required: true },
                { id: 'tf2', type: 'textarea', label: 'Description of Property', required: true },
                { id: 'tf3', type: 'date', label: 'On what date will the contribution be made?', required: true },
                { id: 'tf4', type: 'text', label: 'What is the dollar amount of the contribution?', required: true },
                { id: 'tf5', type: 'select', label: 'Please select the type of contribution', required: true, options: ['Cash', 'Assets'] },
                { id: 'tf6', type: 'text', label: 'What is the name of the company that the contribution is being made to?', required: false },
                { id: 'tf7', type: 'text', label: 'What state was the company formed in?', required: false },
                { id: 'tf8', type: 'select', label: 'Please choose the company type', required: false, options: ['LLC', 'Corporation'] },
                { id: 'tf9', type: 'text', label: 'What is the name of the holding company?', required: false },
                { id: 'tf10', type: 'text', label: 'What state was the holding company formed in?', required: false }
            ],
            createdAt: new Date().toISOString()
        },
        {
            id: 'form-investment-minutes',
            name: 'Investment Committee Meeting Minutes',
            description: 'Questionnaire for creating formal record of Investment Advisor Committee meetings',
            fields: [
                { id: 'im1', type: 'date', label: 'What is the date of this meeting of the Investment Advisor Committee?', required: true },
                { id: 'im2', type: 'text', label: 'Who are the currently serving members of the Investment Advisor Committee? (First name, Last name)', required: true },
                { id: 'im3', type: 'select', label: 'Are there any other members?', required: true, options: ['Yes', 'No'] },
                { id: 'im4', type: 'checkbox', label: 'How did the Investment Advisor Committee Meet?', required: true, options: ['In person', 'Phone Call', 'Video Conference'] },
                { id: 'im5', type: 'select', label: 'Did the Investment Advisor Committee take any actions since the last meeting?', required: true, options: ['Yes', 'No'] },
                { id: 'im6', type: 'textarea', label: 'If Yes, Please describe each activity', required: false },
                { id: 'im7', type: 'select', label: 'Were any funds or assets transferred between Trust entities?', required: true, options: ['Yes', 'No'] },
                { id: 'im8', type: 'textarea', label: 'If Yes, Please describe each transfer', required: false },
                { id: 'im9', type: 'select', label: 'Are there any future contemplated activities?', required: true, options: ['Yes', 'No'] },
                { id: 'im10', type: 'textarea', label: 'If Yes, Please describe the future activities', required: false },
                { id: 'im11', type: 'select', label: 'Are there any other activities to memorialize?', required: true, options: ['Yes', 'No'] },
                { id: 'im12', type: 'textarea', label: 'If Yes, Please describe the other activities', required: false }
            ],
            createdAt: new Date().toISOString()
        },
        {
            id: 'form-asset-protection-trust',
            name: 'Asset Protection Trust Questionnaire',
            description: 'Comprehensive questionnaire for establishing an Asset Protection Trust',
            fields: [
                { id: 'apt1', type: 'text', label: 'Full Legal Name', required: true },
                { id: 'apt2', type: 'date', label: 'Date of Birth', required: true },
                { id: 'apt3', type: 'text', label: 'Social Security Number', required: true },
                { id: 'apt4', type: 'text', label: 'Current Address', required: true },
                { id: 'apt5', type: 'text', label: 'City, State, Zip', required: true },
                { id: 'apt6', type: 'email', label: 'Email Address', required: true },
                { id: 'apt7', type: 'phone', label: 'Phone Number', required: true },
                { id: 'apt8', type: 'select', label: 'Marital Status', required: true, options: ['Single', 'Married', 'Divorced', 'Widowed'] },
                { id: 'apt9', type: 'text', label: 'Spouse Full Name (if applicable)', required: false },
                { id: 'apt10', type: 'textarea', label: 'List all children and their ages', required: false },
                { id: 'apt11', type: 'textarea', label: 'Assets to be placed in trust', required: true },
                { id: 'apt12', type: 'text', label: 'Estimated total value of assets', required: true },
                { id: 'apt13', type: 'textarea', label: 'Beneficiaries and their relationship to you', required: true },
                { id: 'apt14', type: 'text', label: 'Trustee Name', required: true },
                { id: 'apt15', type: 'text', label: 'Successor Trustee Name', required: false }
            ],
            createdAt: new Date().toISOString()
        },
        {
            id: 'form-durable-poa',
            name: 'Durable Power of Attorney Questionnaire',
            description: 'Form for establishing Durable Power of Attorney',
            fields: [
                { id: 'poa1', type: 'text', label: 'Your Full Legal Name (Principal)', required: true },
                { id: 'poa2', type: 'text', label: 'Your Current Address', required: true },
                { id: 'poa3', type: 'date', label: 'Your Date of Birth', required: true },
                { id: 'poa4', type: 'text', label: 'Agent Full Name', required: true },
                { id: 'poa5', type: 'text', label: 'Agent Address', required: true },
                { id: 'poa6', type: 'phone', label: 'Agent Phone Number', required: true },
                { id: 'poa7', type: 'text', label: 'Agent Relationship to You', required: true },
                { id: 'poa8', type: 'text', label: 'Successor Agent Full Name', required: false },
                { id: 'poa9', type: 'text', label: 'Successor Agent Address', required: false },
                { id: 'poa10', type: 'checkbox', label: 'Powers Granted', required: true, options: ['Financial Transactions', 'Real Estate', 'Banking', 'Investments', 'Tax Matters', 'Legal Matters', 'Insurance', 'Government Benefits'] },
                { id: 'poa11', type: 'select', label: 'When should this POA take effect?', required: true, options: ['Immediately', 'Upon my incapacity'] },
                { id: 'poa12', type: 'textarea', label: 'Special Instructions or Limitations', required: false }
            ],
            createdAt: new Date().toISOString()
        },
        {
            id: 'form-healthcare-poa',
            name: 'Health Care Power of Attorney Questionnaire',
            description: 'Form for establishing Health Care Power of Attorney',
            fields: [
                { id: 'hpoa1', type: 'text', label: 'Your Full Legal Name', required: true },
                { id: 'hpoa2', type: 'date', label: 'Your Date of Birth', required: true },
                { id: 'hpoa3', type: 'text', label: 'Health Care Agent Full Name', required: true },
                { id: 'hpoa4', type: 'text', label: 'Agent Relationship to You', required: true },
                { id: 'hpoa5', type: 'phone', label: 'Agent Phone Number', required: true },
                { id: 'hpoa6', type: 'text', label: 'Agent Address', required: true },
                { id: 'hpoa7', type: 'text', label: 'First Alternate Agent Name', required: false },
                { id: 'hpoa8', type: 'phone', label: 'First Alternate Phone', required: false },
                { id: 'hpoa9', type: 'text', label: 'Second Alternate Agent Name', required: false },
                { id: 'hpoa10', type: 'phone', label: 'Second Alternate Phone', required: false },
                { id: 'hpoa11', type: 'checkbox', label: 'Medical Treatment Preferences', required: true, options: ['Life Support', 'Artificial Nutrition', 'Pain Management', 'Organ Donation', 'Autopsy'] },
                { id: 'hpoa12', type: 'textarea', label: 'Special Medical Instructions', required: false },
                { id: 'hpoa13', type: 'textarea', label: 'Religious or Personal Beliefs Affecting Care', required: false }
            ],
            createdAt: new Date().toISOString()
        },
        {
            id: 'form-trust-distribution',
            name: 'Is Your Trust Making a Distribution Questionnaire',
            description: 'Questionnaire to determine if trust should make a distribution',
            fields: [
                { id: 'td1', type: 'text', label: 'Trust Name', required: true },
                { id: 'td2', type: 'text', label: 'Trustee Name', required: true },
                { id: 'td3', type: 'text', label: 'Beneficiary Name', required: true },
                { id: 'td4', type: 'text', label: 'Requested Distribution Amount', required: true },
                { id: 'td5', type: 'date', label: 'Date of Request', required: true },
                { id: 'td6', type: 'select', label: 'Purpose of Distribution', required: true, options: ['Education', 'Medical', 'Housing', 'Living Expenses', 'Business Investment', 'Other'] },
                { id: 'td7', type: 'textarea', label: 'Detailed Purpose Description', required: true },
                { id: 'td8', type: 'select', label: 'Is this distribution mandatory or discretionary?', required: true, options: ['Mandatory', 'Discretionary'] },
                { id: 'td9', type: 'text', label: 'Current Trust Balance', required: true },
                { id: 'td10', type: 'select', label: 'Will this distribution affect other beneficiaries?', required: true, options: ['Yes', 'No'] },
                { id: 'td11', type: 'textarea', label: 'If yes, explain how', required: false },
                { id: 'td12', type: 'select', label: 'Are there any tax implications?', required: true, options: ['Yes', 'No', 'Unknown'] }
            ],
            createdAt: new Date().toISOString()
        },
        {
            id: 'form-distribution-request',
            name: 'Trust Distribution Request Form',
            description: 'Formal request form for trust distributions',
            fields: [
                { id: 'dr1', type: 'text', label: 'Beneficiary Name', required: true },
                { id: 'dr2', type: 'text', label: 'Trust Name', required: true },
                { id: 'dr3', type: 'date', label: 'Date of Request', required: true },
                { id: 'dr4', type: 'text', label: 'Amount Requested', required: true },
                { id: 'dr5', type: 'select', label: 'Type of Distribution', required: true, options: ['Cash', 'Asset Transfer', 'Both'] },
                { id: 'dr6', type: 'select', label: 'Reason for Distribution', required: true, options: ['Education', 'Medical Expenses', 'Housing', 'Living Expenses', 'Emergency', 'Other'] },
                { id: 'dr7', type: 'textarea', label: 'Detailed Explanation of Need', required: true },
                { id: 'dr8', type: 'textarea', label: 'Supporting Documentation Attached', required: false },
                { id: 'dr9', type: 'select', label: 'Urgency Level', required: true, options: ['Immediate', 'Within 30 days', 'Within 60 days', 'No urgency'] },
                { id: 'dr10', type: 'text', label: 'Bank Account for Deposit (if cash)', required: false },
                { id: 'dr11', type: 'text', label: 'Contact Phone Number', required: true },
                { id: 'dr12', type: 'email', label: 'Contact Email', required: true }
            ],
            createdAt: new Date().toISOString()
        },
        {
            id: 'form-special-contribution',
            name: 'Special Contribution and Distribution Meeting Minutes',
            description: 'Meeting minutes for special contributions and distributions',
            fields: [
                { id: 'sc1', type: 'date', label: 'Meeting Date', required: true },
                { id: 'sc2', type: 'text', label: 'Meeting Location/Platform', required: true },
                { id: 'sc3', type: 'textarea', label: 'Attendees (Names and Roles)', required: true },
                { id: 'sc4', type: 'select', label: 'Meeting Type', required: true, options: ['Special Contribution', 'Special Distribution', 'Both'] },
                { id: 'sc5', type: 'textarea', label: 'Agenda Items', required: true },
                { id: 'sc6', type: 'textarea', label: 'Contributions Discussed (Amount, Source, Purpose)', required: false },
                { id: 'sc7', type: 'textarea', label: 'Distributions Discussed (Amount, Recipient, Purpose)', required: false },
                { id: 'sc8', type: 'textarea', label: 'Resolutions Passed', required: true },
                { id: 'sc9', type: 'select', label: 'Vote Results', required: true, options: ['Unanimous', 'Majority', 'No Consensus'] },
                { id: 'sc10', type: 'textarea', label: 'Action Items and Responsible Parties', required: true },
                { id: 'sc11', type: 'date', label: 'Next Meeting Date', required: false },
                { id: 'sc12', type: 'text', label: 'Minutes Prepared By', required: true }
            ],
            createdAt: new Date().toISOString()
        },
        {
            id: 'form-investment-advisor',
            name: 'Investment Advisor Committee Establishment',
            description: 'Form to establish Investment Advisor Committee',
            fields: [
                { id: 'iac1', type: 'text', label: 'Trust Name', required: true },
                { id: 'iac2', type: 'date', label: 'Committee Establishment Date', required: true },
                { id: 'iac3', type: 'text', label: 'Committee Chairperson Name', required: true },
                { id: 'iac4', type: 'textarea', label: 'Committee Members (Names and Qualifications)', required: true },
                { id: 'iac5', type: 'textarea', label: 'Committee Purpose and Objectives', required: true },
                { id: 'iac6', type: 'select', label: 'Meeting Frequency', required: true, options: ['Monthly', 'Quarterly', 'Semi-Annually', 'Annually', 'As Needed'] },
                { id: 'iac7', type: 'textarea', label: 'Investment Authority Granted', required: true },
                { id: 'iac8', type: 'textarea', label: 'Investment Restrictions', required: false },
                { id: 'iac9', type: 'text', label: 'Quorum Requirements', required: true },
                { id: 'iac10', type: 'select', label: 'Voting Requirements', required: true, options: ['Simple Majority', 'Super Majority', 'Unanimous'] },
                { id: 'iac11', type: 'textarea', label: 'Reporting Requirements', required: true },
                { id: 'iac12', type: 'textarea', label: 'Committee Compensation (if any)', required: false }
            ],
            createdAt: new Date().toISOString()
        }
    ]);
    
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingForm, setEditingForm] = useState<FormTemplate | null>(null);
    const [formName, setFormName] = useState('');
    const [formDescription, setFormDescription] = useState('');
    const [formFields, setFormFields] = useState<FormField[]>([]);

    const fieldTypes = [
        { value: 'text', label: 'Text Input' },
        { value: 'email', label: 'Email' },
        { value: 'phone', label: 'Phone' },
        { value: 'select', label: 'Dropdown' },
        { value: 'checkbox', label: 'Checkbox' },
        { value: 'textarea', label: 'Text Area' },
        { value: 'date', label: 'Date Picker' }
    ];

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

    const saveForm = () => {
        if (!formName) return;
        
        const newForm: FormTemplate = {
            id: editingForm?.id || `form-${Date.now()}`,
            name: formName,
            description: formDescription,
            fields: formFields,
            createdAt: editingForm?.createdAt || new Date().toISOString()
        };

        if (editingForm) {
            setForms(forms.map(f => f.id === editingForm.id ? newForm : f));
        } else {
            setForms([...forms, newForm]);
        }

        closeModal();
    };

    const openEditModal = (form: FormTemplate) => {
        setEditingForm(form);
        setFormName(form.name);
        setFormDescription(form.description);
        setFormFields([...form.fields]);
        setShowCreateModal(true);
    };

    const closeModal = () => {
        setShowCreateModal(false);
        setEditingForm(null);
        setFormName('');
        setFormDescription('');
        setFormFields([]);
    };

    const deleteForm = (id: string) => {
        if (window.confirm('Are you sure you want to delete this form?')) {
            setForms(forms.filter(f => f.id !== id));
        }
    };

    const handlePreview = (form: FormTemplate) => {
        setPreviewForm(form);
        setShowPreview(true);
    };

    return (
        <ModuleTemplate
            title="Formbuilder"
            description="Create custom forms with drag and drop question types"
        >
            <div style={{ marginBottom: '20px' }}>
                <button 
                    className="form-button" 
                    style={{ width: 'auto' }}
                    onClick={() => setShowCreateModal(true)}
                >
                    + Create New Form
                </button>
            </div>

            <div className="module-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                {forms.map(form => (
                    <div key={form.id} className="module-card">
                        <h3 className="section-title" style={{ fontSize: '16px' }}>{form.name}</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '12px' }}>
                            {form.description}
                        </p>
                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                            {form.fields.length} fields • Created {new Date(form.createdAt).toLocaleDateString()}
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
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
                                onClick={() => handlePreview(form)}
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

            {showCreateModal && (
                <div style={{ 
                    position: 'fixed', 
                    inset: 0, 
                    background: 'rgba(0,0,0,0.5)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    zIndex: 50 
                }}>
                    <div className="module-card" style={{ width: '90%', maxWidth: '800px', maxHeight: '90vh', overflow: 'auto' }}>
                        <h2 className="section-title">
                            {editingForm ? 'Edit Form' : 'Create New Form'}
                        </h2>
                        
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
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                            <button 
                                className="button-outline" 
                                style={{ width: 'auto' }}
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                            <button 
                                className="form-button" 
                                style={{ width: 'auto' }}
                                onClick={saveForm}
                                disabled={!formName || formFields.length === 0}
                            >
                                {editingForm ? 'Save Changes' : 'Create Form'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Preview Modal */}
            {console.log('Modal render check:', { showPreview, hasPreviewForm: !!previewForm })}
            {showPreview && previewForm && (
                <div className="modal-overlay" onClick={() => setShowPreview(false)}>
                    <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 className="section-title">Form Preview</h3>
                            <button 
                                className="button-outline" 
                                onClick={() => setShowPreview(false)}
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
                            <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>{previewForm.name}</h2>
                            {previewForm.description && (
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                                    {previewForm.description}
                                </p>
                            )}
                            
                            <form onSubmit={(e) => e.preventDefault()}>
                                {previewForm.fields.map((field, idx) => (
                                    <div key={field.id} style={{ marginBottom: '20px' }}>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
                                            {field.label}
                                            {field.required && <span style={{ color: 'var(--danger)' }}> *</span>}
                                        </label>
                                        
                                        {field.type === 'text' && (
                                            <input 
                                                type="text" 
                                                className="form-input" 
                                                placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                                                disabled
                                            />
                                        )}
                                        
                                        {field.type === 'email' && (
                                            <input 
                                                type="email" 
                                                className="form-input" 
                                                placeholder={field.placeholder || 'email@example.com'}
                                                disabled
                                            />
                                        )}
                                        
                                        {field.type === 'phone' && (
                                            <input 
                                                type="tel" 
                                                className="form-input" 
                                                placeholder={field.placeholder || '(555) 123-4567'}
                                                disabled
                                            />
                                        )}
                                        
                                        {field.type === 'date' && (
                                            <input 
                                                type="date" 
                                                className="form-input"
                                                disabled
                                            />
                                        )}
                                        
                                        {field.type === 'textarea' && (
                                            <textarea 
                                                className="form-input" 
                                                rows={4}
                                                placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                                                disabled
                                            />
                                        )}
                                        
                                        {field.type === 'select' && (
                                            <select className="form-input" disabled>
                                                <option value="">Select an option</option>
                                                {field.options?.map((opt, optIdx) => (
                                                    <option key={optIdx} value={opt}>{opt}</option>
                                                ))}
                                            </select>
                                        )}
                                        
                                        {field.type === 'checkbox' && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <input type="checkbox" id={`preview-${field.id}`} disabled />
                                                <label htmlFor={`preview-${field.id}`} style={{ marginBottom: 0 }}>
                                                    {field.placeholder || 'Check to confirm'}
                                                </label>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                
                                <div style={{ 
                                    marginTop: '32px', 
                                    paddingTop: '24px', 
                                    borderTop: '1px solid var(--border-light)',
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    gap: '12px'
                                }}>
                                    <button 
                                        type="button"
                                        className="button-outline" 
                                        style={{ width: 'auto' }}
                                        onClick={() => setShowPreview(false)}
                                    >
                                        Close Preview
                                    </button>
                                    <button 
                                        type="submit"
                                        className="form-button" 
                                        style={{ width: 'auto' }}
                                        disabled
                                    >
                                        Submit Form
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </ModuleTemplate>
    );
};

export default FormbuilderAdmin;
