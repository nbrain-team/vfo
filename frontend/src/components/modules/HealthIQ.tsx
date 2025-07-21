import React from 'react';
import ModuleTemplate from './ModuleTemplate';

const HealthIQ: React.FC = () => {
    const healthPlans = [
        { member: 'Primary', plan: 'Platinum PPO', deductible: '$2,500', used: '$1,200', remaining: '$1,300' },
        { member: 'Spouse', plan: 'Platinum PPO', deductible: '$2,500', used: '$800', remaining: '$1,700' },
        { member: 'Dependent 1', plan: 'Platinum PPO', deductible: '$2,500', used: '$400', remaining: '$2,100' },
        { member: 'Dependent 2', plan: 'Platinum PPO', deductible: '$2,500', used: '$0', remaining: '$2,500' },
    ];

    return (
        <ModuleTemplate 
            title="healthIQ" 
            description="Healthcare management and wellness optimization"
        >
            <div className="module-grid">
                <div className="module-card-row">
                    <div className="module-card small">
                        <h3 className="card-title">HSA Balance</h3>
                        <div className="metric-large">$45.2K</div>
                        <p className="metric-subtitle">Tax-free healthcare funds</p>
                    </div>
                    <div className="module-card small">
                        <h3 className="card-title">Annual Medical</h3>
                        <div className="metric-large">$18.5K</div>
                        <p className="metric-subtitle">Total expenses YTD</p>
                    </div>
                    <div className="module-card small">
                        <h3 className="card-title">Wellness Score</h3>
                        <div className="metric-large">92/100</div>
                        <p className="metric-subtitle">Family average</p>
                    </div>
                </div>

                <div className="module-card">
                    <h3 className="card-title">Insurance Coverage</h3>
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Member</th>
                                    <th>Plan</th>
                                    <th>Deductible</th>
                                    <th>Used</th>
                                    <th>Remaining</th>
                                </tr>
                            </thead>
                            <tbody>
                                {healthPlans.map((plan, index) => (
                                    <tr key={index}>
                                        <td>{plan.member}</td>
                                        <td>{plan.plan}</td>
                                        <td>{plan.deductible}</td>
                                        <td>{plan.used}</td>
                                        <td>{plan.remaining}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </ModuleTemplate>
    );
};

export default HealthIQ; 