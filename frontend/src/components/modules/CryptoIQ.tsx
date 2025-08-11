import React, { useState } from 'react';
import ModuleBase from './ModuleBase';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const CryptoIQ: React.FC = () => {
    const [activeTab, setActiveTab] = useState('overview');
    
    // Mock data
    const moduleScore = {
        overall: 45,
        status: 'orange' as const,
        lastUpdated: '2024-08-08',
        subScores: {
            security: 78,
            diversification: 42,
            taxCompliance: 35,
            performance: 55
        }
    };

    const alerts = [
        { type: 'critical' as const, message: 'Unreported crypto gains of $42,000 need tax documentation' },
        { type: 'warning' as const, message: 'Hardware wallet not backed up in 90+ days' },
        { type: 'warning' as const, message: 'High concentration risk: 65% in single asset (BTC)' },
        { type: 'info' as const, message: 'New staking rewards available: Est. 5.2% APY on ETH' }
    ];

    // Portfolio holdings
    const cryptoHoldings = [
        { symbol: 'BTC', name: 'Bitcoin', quantity: 3.45, value: 155250, cost: 98000, pnl: 57250, allocation: 65 },
        { symbol: 'ETH', name: 'Ethereum', quantity: 25.8, value: 46440, cost: 38500, pnl: 7940, allocation: 19.5 },
        { symbol: 'SOL', name: 'Solana', quantity: 150, value: 18000, cost: 22500, pnl: -4500, allocation: 7.5 },
        { symbol: 'MATIC', name: 'Polygon', quantity: 5000, value: 3500, cost: 4000, pnl: -500, allocation: 1.5 },
        { symbol: 'LINK', name: 'Chainlink', quantity: 200, value: 2800, cost: 2400, pnl: 400, allocation: 1.2 },
        { symbol: 'USDC', name: 'USD Coin', quantity: 12500, value: 12500, cost: 12500, pnl: 0, allocation: 5.3 }
    ];

    // DeFi positions
    const defiPositions = [
        { protocol: 'Aave', type: 'Lending', value: 25000, apy: 3.2, chain: 'Ethereum' },
        { protocol: 'Uniswap V3', type: 'Liquidity', value: 18000, apy: 12.5, chain: 'Ethereum' },
        { protocol: 'Compound', type: 'Lending', value: 15000, apy: 2.8, chain: 'Ethereum' },
        { protocol: 'Lido', type: 'Staking', value: 46440, apy: 5.2, chain: 'Ethereum' }
    ];

    // Price history
    const priceHistory = [
        { date: 'Jan', portfolio: 180000, btc: 35000, eth: 1500 },
        { date: 'Feb', portfolio: 195000, btc: 38000, eth: 1650 },
        { date: 'Mar', portfolio: 210000, btc: 41000, eth: 1750 },
        { date: 'Apr', portfolio: 225000, btc: 43000, eth: 1850 },
        { date: 'May', portfolio: 205000, btc: 40000, eth: 1700 },
        { date: 'Jun', portfolio: 220000, btc: 42000, eth: 1750 },
        { date: 'Jul', portfolio: 238490, btc: 45000, eth: 1800 }
    ];

    // Tax events
    const taxEvents = [
        { date: '2024-07-15', type: 'Trade', asset: 'BTC → ETH', gain: 12000, taxable: 12000, status: 'Unreported' },
        { date: '2024-06-20', type: 'Staking', asset: 'ETH', gain: 850, taxable: 850, status: 'Unreported' },
        { date: '2024-05-10', type: 'Trade', asset: 'SOL → USDC', gain: -2500, taxable: 0, status: 'Loss Harvest' },
        { date: '2024-03-15', type: 'Airdrop', asset: 'ARB', gain: 3200, taxable: 3200, status: 'Reported' },
        { date: '2024-02-28', type: 'Mining', asset: 'BTC', gain: 1500, taxable: 1500, status: 'Reported' }
    ];

    const COLORS = ['#F7931A', '#627EEA', '#00D4B5', '#8247E5', '#375BD2'];

    const renderOverview = () => (
        <div className="dashboard-grid">
            <div className="dashboard-left">
                {/* Holdings Table */}
                <div className="chart-card">
                    <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Cryptocurrency Holdings</h3>
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Asset</th>
                                    <th style={{ textAlign: 'right' }}>Quantity</th>
                                    <th style={{ textAlign: 'right' }}>Value</th>
                                    <th style={{ textAlign: 'right' }}>P&L</th>
                                    <th style={{ textAlign: 'right' }}>Allocation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cryptoHoldings.map(holding => (
                                    <tr key={holding.symbol}>
                                        <td>
                                            <div>
                                                <strong>{holding.symbol}</strong>
                                                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                                                    {holding.name}
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ textAlign: 'right' }}>{holding.quantity}</td>
                                        <td style={{ textAlign: 'right' }}>${holding.value.toLocaleString()}</td>
                                        <td style={{ 
                                            textAlign: 'right',
                                            color: holding.pnl >= 0 ? '#22c55e' : '#ef4444'
                                        }}>
                                            {holding.pnl >= 0 ? '+' : ''}${holding.pnl.toLocaleString()}
                                        </td>
                                        <td style={{ textAlign: 'right' }}>
                                            <span style={{
                                                padding: '2px 6px',
                                                background: holding.allocation > 50 ? '#fef3c7' : 'var(--bg)',
                                                borderRadius: '4px',
                                                fontSize: '12px',
                                                color: holding.allocation > 50 ? '#92400e' : 'var(--text)'
                                            }}>
                                                {holding.allocation}%
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr style={{ borderTop: '2px solid var(--border)' }}>
                                    <td colSpan={2}><strong>Total</strong></td>
                                    <td style={{ textAlign: 'right' }}><strong>$238,490</strong></td>
                                    <td style={{ textAlign: 'right', color: '#22c55e' }}>
                                        <strong>+$60,590</strong>
                                    </td>
                                    <td style={{ textAlign: 'right' }}><strong>100%</strong></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

                {/* Price Chart */}
                <div className="chart-card" style={{ marginTop: '20px' }}>
                    <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Portfolio Performance</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={priceHistory}>
                            <defs>
                                <linearGradient id="colorCrypto" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#F7931A" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#F7931A" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                            <XAxis dataKey="date" stroke="var(--text-secondary)" />
                            <YAxis stroke="var(--text-secondary)" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                            <Tooltip 
                                formatter={(value: any) => `$${(value / 1000).toFixed(1)}K`}
                                contentStyle={{ 
                                    background: 'var(--card-bg)', 
                                    border: '1px solid var(--border)',
                                    borderRadius: '8px'
                                }}
                            />
                            <Area 
                                type="monotone" 
                                dataKey="portfolio" 
                                stroke="#F7931A" 
                                strokeWidth={2}
                                fillOpacity={1} 
                                fill="url(#colorCrypto)" 
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="dashboard-right">
                {/* Allocation Pie */}
                <div className="chart-card">
                    <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Asset Allocation</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                data={cryptoHoldings.filter(h => h.symbol !== 'USDC')}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ symbol, allocation }) => `${symbol}: ${allocation}%`}
                                outerRadius={70}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {cryptoHoldings.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value: any) => `$${value.toLocaleString()}`} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Key Metrics */}
                <div className="chart-card" style={{ marginTop: '20px' }}>
                    <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Portfolio Metrics</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div style={{ padding: '12px', background: 'var(--bg)', borderRadius: '8px' }}>
                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Total Value</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>$238.5K</div>
                        </div>
                        <div style={{ padding: '12px', background: 'var(--bg)', borderRadius: '8px' }}>
                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Total P&L</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#22c55e' }}>+$60.6K</div>
                        </div>
                        <div style={{ padding: '12px', background: 'var(--bg)', borderRadius: '8px' }}>
                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>24h Change</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#22c55e' }}>+2.8%</div>
                        </div>
                        <div style={{ padding: '12px', background: 'var(--bg)', borderRadius: '8px' }}>
                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>ROI</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#22c55e' }}>+34.1%</div>
                        </div>
                    </div>
                </div>

                {/* Security Status */}
                <div className="chart-card" style={{ marginTop: '20px' }}>
                    <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Security Status</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ 
                            padding: '8px',
                            background: 'var(--bg)',
                            borderRadius: '6px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <span style={{ fontSize: '13px' }}>Hardware Wallet</span>
                            <span style={{ fontSize: '12px', color: '#22c55e' }}>✓ Connected</span>
                        </div>
                        <div style={{ 
                            padding: '8px',
                            background: '#fef3c7',
                            borderRadius: '6px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <span style={{ fontSize: '13px' }}>2FA Status</span>
                            <span style={{ fontSize: '12px', color: '#92400e' }}>⚠ Needs Update</span>
                        </div>
                        <div style={{ 
                            padding: '8px',
                            background: 'var(--bg)',
                            borderRadius: '6px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <span style={{ fontSize: '13px' }}>Seed Backup</span>
                            <span style={{ fontSize: '12px', color: '#22c55e' }}>✓ Secured</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderDefi = () => (
        <div className="dashboard-grid">
            <div className="dashboard-left">
                <div className="chart-card">
                    <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>DeFi Positions</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {defiPositions.map(position => (
                            <div key={position.protocol} style={{
                                padding: '16px',
                                background: 'var(--bg)',
                                borderRadius: '8px',
                                border: '1px solid var(--border)'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <div>
                                        <div style={{ fontWeight: 'bold' }}>{position.protocol}</div>
                                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                                            {position.type} • {position.chain}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontWeight: 'bold' }}>${position.value.toLocaleString()}</div>
                                        <div style={{ fontSize: '12px', color: '#22c55e' }}>
                                            APY: {position.apy}%
                                        </div>
                                    </div>
                                </div>
                                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                                    Est. Annual Yield: ${(position.value * position.apy / 100).toFixed(0)}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ 
                        marginTop: '16px',
                        padding: '12px',
                        background: 'var(--primary)15',
                        borderRadius: '8px'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Total DeFi Value:</span>
                            <strong>$104,440</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                            <span>Weighted Avg APY:</span>
                            <strong style={{ color: '#22c55e' }}>6.2%</strong>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dashboard-right">
                <div className="chart-card">
                    <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Protocol Risk Assessment</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ padding: '12px', background: 'var(--bg)', borderRadius: '8px' }}>
                            <div style={{ fontSize: '13px', fontWeight: '500' }}>Smart Contract Risk</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                                <div style={{ flex: 1, height: '6px', background: '#e5e7eb', borderRadius: '3px', overflow: 'hidden' }}>
                                    <div style={{ width: '35%', height: '100%', background: '#22c55e' }}/>
                                </div>
                                <span style={{ fontSize: '12px' }}>Low</span>
                            </div>
                        </div>
                        <div style={{ padding: '12px', background: 'var(--bg)', borderRadius: '8px' }}>
                            <div style={{ fontSize: '13px', fontWeight: '500' }}>Impermanent Loss Risk</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                                <div style={{ flex: 1, height: '6px', background: '#e5e7eb', borderRadius: '3px', overflow: 'hidden' }}>
                                    <div style={{ width: '65%', height: '100%', background: '#f59e0b' }}/>
                                </div>
                                <span style={{ fontSize: '12px' }}>Medium</span>
                            </div>
                        </div>
                        <div style={{ padding: '12px', background: 'var(--bg)', borderRadius: '8px' }}>
                            <div style={{ fontSize: '13px', fontWeight: '500' }}>Protocol TVL Risk</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                                <div style={{ flex: 1, height: '6px', background: '#e5e7eb', borderRadius: '3px', overflow: 'hidden' }}>
                                    <div style={{ width: '25%', height: '100%', background: '#22c55e' }}/>
                                </div>
                                <span style={{ fontSize: '12px' }}>Low</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderTaxes = () => (
        <div className="chart-card">
            <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Crypto Tax Events</h3>
            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Asset</th>
                            <th style={{ textAlign: 'right' }}>Gain/Loss</th>
                            <th style={{ textAlign: 'right' }}>Taxable</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {taxEvents.map((event, index) => (
                            <tr key={index}>
                                <td>{event.date}</td>
                                <td>{event.type}</td>
                                <td>{event.asset}</td>
                                <td style={{ 
                                    textAlign: 'right',
                                    color: event.gain >= 0 ? '#22c55e' : '#ef4444'
                                }}>
                                    {event.gain >= 0 ? '+' : ''}${event.gain.toLocaleString()}
                                </td>
                                <td style={{ textAlign: 'right' }}>${event.taxable.toLocaleString()}</td>
                                <td>
                                    <span style={{
                                        padding: '2px 8px',
                                        background: event.status === 'Reported' ? '#22c55e15' : 
                                                   event.status === 'Unreported' ? '#ef444415' : '#3b82f615',
                                        color: event.status === 'Reported' ? '#22c55e' : 
                                               event.status === 'Unreported' ? '#ef4444' : '#3b82f6',
                                        borderRadius: '4px',
                                        fontSize: '11px'
                                    }}>
                                        {event.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div style={{ 
                marginTop: '20px',
                padding: '16px',
                background: '#fee2e2',
                borderRadius: '8px',
                border: '1px solid #ef4444'
            }}>
                <h4 style={{ fontSize: '14px', marginBottom: '8px', color: '#dc2626' }}>Tax Compliance Alert</h4>
                <div style={{ fontSize: '12px', color: '#7f1d1d' }}>
                    <p>Unreported taxable gains: <strong>$16,550</strong></p>
                    <p style={{ marginTop: '4px' }}>Estimated tax liability: <strong>$5,792</strong></p>
                    <p style={{ marginTop: '8px' }}>Action required: Generate Form 8949 for tax filing</p>
                </div>
            </div>
        </div>
    );

    return (
        <ModuleBase
            moduleName="cryptoIQ"
            moduleIcon="₿"
            description="Digital asset management, DeFi tracking, and crypto tax compliance"
            score={moduleScore}
            alerts={alerts}
        >
            {/* Tab Navigation */}
            <div style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '24px',
                borderBottom: '1px solid var(--border)',
                paddingBottom: '12px'
            }}>
                {['overview', 'defi', 'taxes', 'transactions'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            padding: '8px 16px',
                            background: activeTab === tab ? 'var(--primary)' : 'transparent',
                            color: activeTab === tab ? 'white' : 'var(--text)',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            textTransform: 'capitalize'
                        }}
                    >
                        {tab === 'defi' ? 'DeFi' : tab}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'defi' && renderDefi()}
            {activeTab === 'taxes' && renderTaxes()}
            {activeTab === 'transactions' && (
                <div className="chart-card">
                    <h3>Transaction History</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>Complete transaction log with cost basis tracking...</p>
                </div>
            )}
        </ModuleBase>
    );
};

export default CryptoIQ; 