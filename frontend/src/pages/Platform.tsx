import React from 'react';

const Platform: React.FC = () => {
    return (
        <div className="page-container">
            <h1 className="page-title">Platform Dashboard</h1>
            <p className="page-intro">
                Welcome to your Virtual Family Office. Here is a snapshot of your current status.
            </p>

            <div className="dashboard-grid">
                <div className="dashboard-card">
                    <h2 className="card-title">Recent Activity</h2>
                    <ul className="activity-list">
                        <li>Document 'Trust Agreement' uploaded to legalIQ.</li>
                        <li>Agent 'Market Analyst' ran a new simulation.</li>
                        <li>Portfolio value updated in wealthIQ.</li>
                    </ul>
                </div>
                <div className="dashboard-card">
                    <h2 className="card-title">Key Metrics</h2>
                    <div className="metrics-grid">
                        <div className="metric-item">
                            <span className="metric-value">$12.4M</span>
                            <span className="metric-label">Total AUM</span>
                        </div>
                        <div className="metric-item">
                            <span className="metric-value">7</span>
                            <span className="metric-label">Active Agents</span>
                        </div>
                        <div className="metric-item">
                            <span className="metric-value">3</span>
                            <span className="metric-label">Alerts</span>
                        </div>
                    </div>
                </div>
                <div className="dashboard-card tall-card">
                    <h2 className="card-title">signalIQ Insights</h2>
                    <p>No new high-priority signals found in the last 24 hours.</p>
                </div>
            </div>
        </div>
    );
};

export default Platform; 