import React from 'react';
import ModuleTemplate from './ModuleTemplate';

const TrustIQ: React.FC = () => {
    const trustData = [
        { name: 'Family Trust A', type: 'Revocable', assets: '$3.2M', beneficiaries: 4, status: 'Active' },
        { name: 'Charitable Trust', type: 'Irrevocable', assets: '$1.5M', beneficiaries: 1, status: 'Active' },
        { name: 'Generation Skip Trust', type: 'Dynasty', assets: '$5.8M', beneficiaries: 12, status: 'Active' },
    ];

    return (
        <ModuleTemplate 
            title="trustIQ" 
            description="Estate planning and trust management solutions"
        >
            <div className="module-grid">
                <div className="module-card">
                    <h3 className="card-title">Trust Overview</h3>
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Trust Name</th>
                                    <th>Type</th>
                                    <th>Assets</th>
                                    <th>Beneficiaries</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trustData.map((trust, index) => (
                                    <tr key={index}>
                                        <td>{trust.name}</td>
                                        <td>{trust.type}</td>
                                        <td>{trust.assets}</td>
                                        <td>{trust.beneficiaries}</td>
                                        <td>
                                            <span className="status active">{trust.status}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="module-card-row">
                    <div className="module-card small">
                        <h3 className="card-title">Total Trust Assets</h3>
                        <div className="metric-large">$10.5M</div>
                        <p className="metric-subtitle">Across 3 trusts</p>
                    </div>
                    <div className="module-card small">
                        <h3 className="card-title">Tax Savings YTD</h3>
                        <div className="metric-large">$420K</div>
                        <p className="metric-subtitle">Estate tax optimization</p>
                    </div>
                </div>
            </div>
        </ModuleTemplate>
    );
};

export default TrustIQ; 