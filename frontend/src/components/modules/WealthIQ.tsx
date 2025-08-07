import React from 'react';
import ModuleTemplate from './ModuleTemplate';

const WealthIQ: React.FC = () => {
    const portfolioData = [
        { asset: 'US Equities', value: '$94,528,400', allocation: '35.5%', change: '+12.5%', ytd: '+18.2%' },
        { asset: 'International Equities', value: '$53,249,053', allocation: '20.0%', change: '+8.3%', ytd: '+14.7%' },
        { asset: 'Fixed Income', value: '$66,561,317', allocation: '25.0%', change: '+3.2%', ytd: '+4.8%' },
        { asset: 'Real Estate', value: '$39,936,790', allocation: '15.0%', change: '+8.7%', ytd: '+11.3%' },
        { asset: 'Alternative Investments', value: '$11,969,637', allocation: '4.5%', change: '+15.3%', ytd: '+22.1%' },
    ];

    return (
        <ModuleTemplate 
            title="wealthIQ" 
            description="Comprehensive wealth management and portfolio optimization"
        >
            <div className="summary-row">
                <div className="summary-card">
                    <div className="summary-label">Total Net Worth</div>
                    <div className="summary-value">$266.2M</div>
                    <div className="summary-change positive">+8.5% YTD</div>
                </div>
                <div className="summary-card">
                    <div className="summary-label">Liquid Assets</div>
                    <div className="summary-value">$71.1M</div>
                    <div className="summary-change">26.7% of portfolio</div>
                </div>
                <div className="summary-card">
                    <div className="summary-label">Annual Return</div>
                    <div className="summary-value">9.8%</div>
                    <div className="summary-change">3-year average</div>
                </div>
                <div className="summary-card">
                    <div className="summary-label">Risk Score</div>
                    <div className="summary-value">Moderate</div>
                    <div className="summary-change">6.2/10</div>
                </div>
            </div>

            <div className="module-card">
                <div className="section-header">
                    <h3 className="section-title">Portfolio Allocation</h3>
                </div>
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Asset Class</th>
                                <th style={{ textAlign: 'right' }}>Value</th>
                                <th style={{ textAlign: 'right' }}>Allocation</th>
                                <th style={{ textAlign: 'right' }}>1M Change</th>
                                <th style={{ textAlign: 'right' }}>YTD</th>
                            </tr>
                        </thead>
                        <tbody>
                            {portfolioData.map((item, index) => (
                                <tr key={index}>
                                    <td style={{ fontWeight: '500' }}>{item.asset}</td>
                                    <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)' }}>{item.value}</td>
                                    <td style={{ textAlign: 'right' }}>{item.allocation}</td>
                                    <td style={{ textAlign: 'right' }}>
                                        <span className={`performance ${item.change.startsWith('+') ? 'positive' : 'negative'}`}>
                                            {item.change}
                                        </span>
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        <span className={`performance ${item.ytd.startsWith('+') ? 'positive' : 'negative'}`}>
                                            {item.ytd}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr style={{ borderTop: '2px solid var(--border)' }}>
                                <td style={{ fontWeight: '600', paddingTop: '12px' }}>Total</td>
                                <td style={{ textAlign: 'right', fontWeight: '600', paddingTop: '12px', fontFamily: 'var(--font-mono)' }}>$266,245,267</td>
                                <td style={{ textAlign: 'right', fontWeight: '600', paddingTop: '12px' }}>100.0%</td>
                                <td style={{ textAlign: 'right', paddingTop: '12px' }}>
                                    <span className="performance positive" style={{ fontWeight: '600' }}>+7.33%</span>
                                </td>
                                <td style={{ textAlign: 'right', paddingTop: '12px' }}>
                                    <span className="performance positive" style={{ fontWeight: '600' }}>+12.4%</span>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </ModuleTemplate>
    );
};

export default WealthIQ; 