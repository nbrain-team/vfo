import React from 'react';
import ModuleTemplate from './ModuleTemplate';

const RiskIQ: React.FC = () => {
    const riskData = [
        { id: 1, category: 'Market Risk', level: 'High', impact: '$2.5M', probability: '65%', status: 'Active' },
        { id: 2, category: 'Credit Risk', level: 'Medium', impact: '$1.2M', probability: '45%', status: 'Monitored' },
        { id: 3, category: 'Operational Risk', level: 'Low', impact: '$0.5M', probability: '20%', status: 'Controlled' },
        { id: 4, category: 'Liquidity Risk', level: 'Medium', impact: '$1.8M', probability: '40%', status: 'Active' },
    ];

    return (
        <ModuleTemplate 
            title="riskIQ" 
            description="Comprehensive risk assessment and monitoring for your portfolio"
        >
            <div className="module-grid">
                <div className="module-card">
                    <h3 className="card-title">Risk Overview</h3>
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Risk Category</th>
                                    <th>Level</th>
                                    <th>Potential Impact</th>
                                    <th>Probability</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {riskData.map(risk => (
                                    <tr key={risk.id}>
                                        <td>{risk.category}</td>
                                        <td>
                                            <span className={`risk-level ${risk.level.toLowerCase()}`}>
                                                {risk.level}
                                            </span>
                                        </td>
                                        <td>{risk.impact}</td>
                                        <td>{risk.probability}</td>
                                        <td>
                                            <span className={`status ${risk.status.toLowerCase()}`}>
                                                {risk.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div className="module-card-row">
                    <div className="module-card small">
                        <h3 className="card-title">Total Risk Exposure</h3>
                        <div className="metric-large">$6.0M</div>
                        <p className="metric-subtitle">Across all categories</p>
                    </div>
                    <div className="module-card small">
                        <h3 className="card-title">Risk Score</h3>
                        <div className="metric-large">7.2/10</div>
                        <p className="metric-subtitle">Moderate risk profile</p>
                    </div>
                </div>
            </div>
        </ModuleTemplate>
    );
};

export default RiskIQ; 