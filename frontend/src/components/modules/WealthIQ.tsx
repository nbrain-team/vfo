import React from 'react';
import ModuleTemplate from './ModuleTemplate';

const WealthIQ: React.FC = () => {
    const portfolioData = [
        { asset: 'Equities', value: '$4.2M', allocation: '35%', change: '+12.5%' },
        { asset: 'Fixed Income', value: '$2.4M', allocation: '20%', change: '+3.2%' },
        { asset: 'Real Estate', value: '$3.6M', allocation: '30%', change: '+8.7%' },
        { asset: 'Alternative Investments', value: '$1.8M', allocation: '15%', change: '+15.3%' },
    ];

    return (
        <ModuleTemplate 
            title="wealthIQ" 
            description="Comprehensive wealth management and portfolio optimization"
        >
            <div className="module-grid">
                <div className="module-card-row">
                    <div className="module-card small">
                        <h3 className="card-title">Total Net Worth</h3>
                        <div className="metric-large">$12.0M</div>
                        <p className="metric-subtitle">+8.5% YTD</p>
                    </div>
                    <div className="module-card small">
                        <h3 className="card-title">Liquid Assets</h3>
                        <div className="metric-large">$3.2M</div>
                        <p className="metric-subtitle">26.7% of portfolio</p>
                    </div>
                    <div className="module-card small">
                        <h3 className="card-title">Annual Return</h3>
                        <div className="metric-large">9.8%</div>
                        <p className="metric-subtitle">3-year average</p>
                    </div>
                </div>

                <div className="module-card">
                    <h3 className="card-title">Portfolio Allocation</h3>
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Asset Class</th>
                                    <th>Value</th>
                                    <th>Allocation</th>
                                    <th>Performance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {portfolioData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.asset}</td>
                                        <td>{item.value}</td>
                                        <td>{item.allocation}</td>
                                        <td>
                                            <span className={`performance ${item.change.startsWith('+') ? 'positive' : 'negative'}`}>
                                                {item.change}
                                            </span>
                                        </td>
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

export default WealthIQ; 