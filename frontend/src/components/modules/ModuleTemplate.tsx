import React from 'react';

interface ModuleTemplateProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

const ModuleTemplate: React.FC<ModuleTemplateProps> = ({ title, description, children }) => {
    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">{title}</h1>
                <p className="page-description">{description}</p>
            </div>
            <div className="module-content">
                {children}
            </div>
        </div>
    );
};

export default ModuleTemplate; 