import React from 'react';

const Platform: React.FC = () => {
    const userName = localStorage.getItem('user_name') || 'there';
    const currentHour = new Date().getHours();
    const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';
    
    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-greeting">{greeting}, {userName}</h1>
            </div>

            <div className="summary-row">
                <div className="summary-card">
                    <div className="summary-label">Clients</div>
                    <div className="summary-value">160</div>
                </div>
                <div className="summary-card">
                    <div className="summary-label">AUM</div>
                    <div className="summary-value">$266,245,267.25</div>
                    <div className="summary-change positive">+7.33%</div>
                </div>
                <div className="summary-card">
                    <div className="summary-label">Change</div>
                    <div className="summary-value">7.33%</div>
                    <div className="summary-change positive">+$18,147,329</div>
                </div>
            </div>

            <div className="dashboard-grid">
                <div className="dashboard-left">
                    <div className="chart-card">
                        <div className="chart-header">
                            <div>
                                <div className="chart-value">$266,245,267.25</div>
                                <div className="chart-subtitle">7.33%</div>
                            </div>
                            <div className="time-selector">
                                <button className="time-button">5D</button>
                                <button className="time-button">1M</button>
                                <button className="time-button active">6M</button>
                                <button className="time-button">1Y</button>
                                <button className="time-button">5Y</button>
                                <button className="time-button">YTD</button>
                                <button className="time-button">MAX</button>
                            </div>
                        </div>
                        <div style={{ 
                            height: '300px', 
                            background: 'linear-gradient(180deg, rgba(40,167,69,0.1) 0%, rgba(40,167,69,0) 100%)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            color: '#6a737d',
                            fontSize: '14px'
                        }}>
                            Chart visualization will be added here
                        </div>
                    </div>

                    <div className="accounts-section">
                        <div className="section-header">
                            <h2 className="section-title">Accounts</h2>
                        </div>
                        <div className="table-container">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Contact</th>
                                        <th>Type</th>
                                        <th>Status</th>
                                        <th>Date Initiated</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Thomas Shields</td>
                                        <td>Individual</td>
                                        <td><span className="status-badge invited">Invited</span></td>
                                        <td>Oct 1, 2024</td>
                                    </tr>
                                    <tr>
                                        <td>Edwin Kim</td>
                                        <td>Individual</td>
                                        <td><span className="status-badge invited">Invited</span></td>
                                        <td>Oct 1, 2024</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="dashboard-right">
                    <div className="module-card">
                        <h3 className="card-title">Top Holdings</h3>
                        <div className="holdings-table">
                            <table className="data-table">
                                <tbody>
                                    <tr>
                                        <td className="ticker-symbol">AAPL</td>
                                        <td className="holding-value">$212.17</td>
                                        <td className="holding-change negative">-0.50%</td>
                                    </tr>
                                    <tr>
                                        <td className="ticker-symbol">MSFT</td>
                                        <td className="holding-value">$491.00</td>
                                        <td className="holding-change positive">+5.59%</td>
                                    </tr>
                                    <tr>
                                        <td className="ticker-symbol">NVDA</td>
                                        <td className="holding-value">$156.95</td>
                                        <td className="holding-change positive">+0.23%</td>
                                    </tr>
                                    <tr>
                                        <td className="ticker-symbol">META</td>
                                        <td className="holding-value">$713.22</td>
                                        <td className="holding-change positive">+1.75%</td>
                                    </tr>
                                    <tr>
                                        <td className="ticker-symbol">GOOGL</td>
                                        <td className="holding-value">$178.45</td>
                                        <td className="holding-change negative">-0.48%</td>
                                    </tr>
                                    <tr>
                                        <td className="ticker-symbol">TSLA</td>
                                        <td className="holding-value">$315.85</td>
                                        <td className="holding-change positive">+2.45%</td>
                                    </tr>
                                    <tr>
                                        <td className="ticker-symbol">AVGO</td>
                                        <td className="holding-value">$269.90</td>
                                        <td className="holding-change positive">+0.66%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="module-card">
                        <h3 className="card-title">Recent Activity</h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            <li style={{ padding: '8px 0', borderBottom: '1px solid var(--border-light)', fontSize: '13px', color: 'var(--text-secondary)' }}>
                                New client onboarded: Thomas Shields
                            </li>
                            <li style={{ padding: '8px 0', borderBottom: '1px solid var(--border-light)', fontSize: '13px', color: 'var(--text-secondary)' }}>
                                Portfolio rebalanced for Edwin Kim
                            </li>
                            <li style={{ padding: '8px 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
                                Tax loss harvesting opportunity identified
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Platform; 