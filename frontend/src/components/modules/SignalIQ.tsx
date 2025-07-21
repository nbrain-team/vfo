import React from 'react';
import ModuleTemplate from './ModuleTemplate';

const SignalIQ: React.FC = () => {
    const signals = [
        { id: 1, type: 'Market Alert', priority: 'High', message: 'S&P 500 volatility spike detected', time: '2 hours ago' },
        { id: 2, type: 'Tax Opportunity', priority: 'Medium', message: 'Tax loss harvesting opportunity identified', time: '5 hours ago' },
        { id: 3, type: 'Estate Planning', priority: 'Low', message: 'Annual trust review reminder', time: '1 day ago' },
        { id: 4, type: 'Risk Alert', priority: 'High', message: 'Portfolio concentration exceeds threshold', time: '2 days ago' },
    ];

    return (
        <ModuleTemplate 
            title="signalIQ" 
            description="Zero-knowledge data refinery and intelligent signal processing"
        >
            <div className="module-grid">
                <div className="module-card-row">
                    <div className="module-card small">
                        <h3 className="card-title">Active Signals</h3>
                        <div className="metric-large">12</div>
                        <p className="metric-subtitle">Requiring attention</p>
                    </div>
                    <div className="module-card small">
                        <h3 className="card-title">Data Sources</h3>
                        <div className="metric-large">7</div>
                        <p className="metric-subtitle">Connected APIs</p>
                    </div>
                    <div className="module-card small">
                        <h3 className="card-title">Processing Rate</h3>
                        <div className="metric-large">1.2M</div>
                        <p className="metric-subtitle">Events per day</p>
                    </div>
                </div>

                <div className="module-card">
                    <h3 className="card-title">Recent Signals</h3>
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Priority</th>
                                    <th>Message</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {signals.map(signal => (
                                    <tr key={signal.id}>
                                        <td>{signal.type}</td>
                                        <td>
                                            <span className={`risk-level ${signal.priority.toLowerCase()}`}>
                                                {signal.priority}
                                            </span>
                                        </td>
                                        <td>{signal.message}</td>
                                        <td>{signal.time}</td>
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

export default SignalIQ; 