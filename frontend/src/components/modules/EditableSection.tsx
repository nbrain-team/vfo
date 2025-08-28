import React, { useState } from 'react';

interface EditableSectionProps {
    title?: string;
    content: string | React.ReactNode;
    onSave: (newContent: string) => void;
    isHtml?: boolean;
}

const EditableSection: React.FC<EditableSectionProps> = ({ title, content, onSave, isHtml = false }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(
        typeof content === 'string' ? content : ''
    );
    const [isHovered, setIsHovered] = useState(false);

    const handleSave = () => {
        onSave(editContent);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditContent(typeof content === 'string' ? content : '');
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div style={{ position: 'relative' }}>
                {title && <h3 style={{ marginBottom: '8px' }}>{title}</h3>}
                <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    style={{
                        width: '100%',
                        minHeight: '100px',
                        padding: '8px',
                        border: '1px solid var(--primary)',
                        borderRadius: '4px',
                        fontSize: '14px',
                        fontFamily: 'inherit',
                        resize: 'vertical'
                    }}
                />
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <button 
                        onClick={handleSave}
                        className="form-button"
                        style={{ width: 'auto', fontSize: '12px', padding: '4px 12px' }}
                    >
                        Save
                    </button>
                    <button 
                        onClick={handleCancel}
                        className="button-outline"
                        style={{ width: 'auto', fontSize: '12px', padding: '4px 12px' }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div 
            style={{ position: 'relative' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered && (
                <button
                    onClick={() => {
                        setEditContent(typeof content === 'string' ? content : '');
                        setIsEditing(true);
                    }}
                    style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        padding: '4px 8px',
                        fontSize: '11px',
                        background: 'var(--primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        zIndex: 10,
                        opacity: 0.9
                    }}
                >
                    Edit
                </button>
            )}
            {title && <h3>{title}</h3>}
            {isHtml && typeof content === 'string' ? (
                <div dangerouslySetInnerHTML={{ __html: content }} />
            ) : (
                <div>{content}</div>
            )}
        </div>
    );
};

export default EditableSection;
