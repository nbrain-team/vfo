import React from 'react';
import ModuleTemplate from './ModuleTemplate';

const CryptoIQ: React.FC = () => {
    const cryptoHoldings = [
        { asset: 'Bitcoin', symbol: 'BTC', amount: '12.5', value: '$525,000', change: '+15.2%' },
        { asset: 'Ethereum', symbol: 'ETH', amount: '85.3', value: '$153,540', change: '+8.7%' },
        { asset: 'Solana', symbol: 'SOL', amount: '1,250', value: '$62,500', change: '+22.4%' },
        { asset: 'Chainlink', symbol: 'LINK', amount: '3,500', value: '$45,500', change: '-3.2%' },
    ];

    return (
        <ModuleTemplate 
            title="cryptoIQ" 
            description="Digital asset management and DeFi integration"
        >
            <div className="module-grid">
                <div className="module-card-row">
                    <div className="module-card small">
                        <h3 className="card-title">Total Crypto Value</h3>
                        <div className="metric-large">$786.5K</div>
                        <p className="metric-subtitle">6.6% of portfolio</p>
                    </div>
                    <div className="module-card small">
                        <h3 className="card-title">24h Change</h3>
                        <div className="metric-large">+$12.3K</div>
                        <p className="metric-subtitle">+1.6%</p>
                    </div>
                    <div className="module-card small">
                        <h3 className="card-title">Staking Rewards</h3>
                        <div className="metric-large">$2.8K</div>
                        <p className="metric-subtitle">Monthly average</p>
                    </div>
                </div>

                <div className="module-card">
                    <h3 className="card-title">Digital Asset Holdings</h3>
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Asset</th>
                                    <th>Symbol</th>
                                    <th>Amount</th>
                                    <th>Value (USD)</th>
                                    <th>24h Change</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cryptoHoldings.map((crypto, index) => (
                                    <tr key={index}>
                                        <td>{crypto.asset}</td>
                                        <td>{crypto.symbol}</td>
                                        <td>{crypto.amount}</td>
                                        <td>{crypto.value}</td>
                                        <td>
                                            <span className={`performance ${crypto.change.startsWith('+') ? 'positive' : 'negative'}`}>
                                                {crypto.change}
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

export default CryptoIQ; 