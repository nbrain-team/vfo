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
                                onClick={() => alert('Preview functionality coming soon')}
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
        </ModuleTemplate>
    );
};

export default FormbuilderAdmin;
