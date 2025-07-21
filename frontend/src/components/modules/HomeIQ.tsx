import React from 'react';
import ModuleTemplate from './ModuleTemplate';

const HomeIQ: React.FC = () => {
    return (
        <ModuleTemplate 
            title="homeIQ" 
            description="Property management and household operations"
        >
            <div className="module-grid">
                <div className="module-card">
                    <h3 className="card-title">Property Overview</h3>
                    <p>Property management features coming soon...</p>
                </div>
            </div>
        </ModuleTemplate>
    );
};

export default HomeIQ; 