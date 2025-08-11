import React, { useState } from 'react';
import ModuleBase from './ModuleBase';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const WealthIQ: React.FC = () => {
    const [activeTab, setActiveTab] = useState('overview');
    
    // Mock data
    const moduleScore = {
        overall: 68,
        status: 'orange' as const,
        lastUpdated: '2024-08-08',
        subScores: {
            liquidity: 75,
            diversification: 82,
            performance: 65,
            planning: 58
        }
    };

    const alerts = [
        { type: 'warning' as const, message: 'Cash reserves below recommended 6-month emergency fund' },
        { type: 'info' as const, message: 'Q3 rebalancing opportunity identified - review allocation' },
        { type: 'critical' as const, message: 'Concentrated position in NVDA exceeds 15% threshold' }
    ];

    // Portfolio allocation
    const portfolioAllocation = [
        { name: 'US Equities', value: 35, amount: 93150000 },
        { name: 'International Equities', value: 20, amount: 53249000 },
        { name: 'Fixed Income', value: 25, amount: 66561000 },
        { name: 'Real Estate', value: 15, amount: 39936000 },
        { name: 'Alternative', value: 5, amount: 13312000 }
    ];

    // Performance data
    const performanceData = [
        { month: 'Jan', portfolio: 245000000, benchmark: 243000000 },
        { month: 'Feb', portfolio: 248000000, benchmark: 246000000 },
        { month: 'Mar', portfolio: 252000000, benchmark: 249000000 },
        { month: 'Apr', portfolio: 255000000, benchmark: 253000000 },
        { month: 'May', portfolio: 259000000, benchmark: 256000000 },
        { month: 'Jun', portfolio: 262000000, benchmark: 259000000 },
        { month: 'Jul', portfolio: 266245267, benchmark: 262000000 }
    ];

    // Cash flow projection
    const cashFlowProjection = [
        { month: 'Aug', income: 450000, expenses: 320000, net: 130000 },
        { month: 'Sep', income: 480000, expenses: 350000, net: 130000 },
        { month: 'Oct', income: 520000, expenses: 340000, net: 180000 },
        { month: 'Nov', income: 490000, expenses: 360000, net: 130000 },
        { month: 'Dec', income: 650000, expenses: 420000, net: 230000 },
        { month: 'Jan', income: 470000, expenses: 330000, net: 140000 }
    ];

    // Top holdings
    const topHoldings = [
        { symbol: 'AAPL', name: 'Apple Inc.', value: 12500000, change: 5.2, allocation: 4.7 },
        { symbol: 'MSFT', name: 'Microsoft Corp', value: 11200000, change: 3.8, allocation: 4.2 },
        { symbol: 'NVDA', name: 'NVIDIA Corp', value: 42000000, change: 12.5, allocation: 15.8 },
        { symbol: 'GOOGL', name: 'Alphabet Inc', value: 8900000, change: -1.2, allocation: 3.3 },
        { symbol: 'BRK.B', name: 'Berkshire Hathaway', value: 7800000, change: 2.1, allocation: 2.9 }
    ];

    // Financial goals
    const financialGoals = [
        { name: 'Retirement Fund', target: 50000000, current: 35000000, progress: 70, targetDate: '2035' },
        { name: 'Children Education', target: 5000000, current: 3200000, progress: 64, targetDate: '2028' },
        { name: 'Real Estate Portfolio', target: 20000000, current: 15000000, progress: 75, targetDate: '2027' },
        { name: 'Charitable Foundation', target: 10000000, current: 4500000, progress: 45, targetDate: '2030' }
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

    const renderOverview = () => (
        <div className="dashboard-grid">
            <div className="dashboard-left">
                {/* Portfolio Performance */}
                <div className="chart-card">
                    <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Portfolio Performance vs Benchmark</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={performanceData}>
                            <defs>
                                <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                            <XAxis dataKey="month" stroke="var(--text-secondary)" />
                            <YAxis 
                                stroke="var(--text-secondary)" 
                                tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}M`}
                            />
                            <Tooltip 
                                formatter={(value: any) => `$${(value / 1000000).toFixed(2)}M`}
                                contentStyle={{ 
                                    background: 'var(--card-bg)', 
                                    border: '1px solid var(--border)',
                                    borderRadius: '8px'
                                }}
                            />
                            <Area 
                                type="monotone" 
                                dataKey="portfolio" 
                                stroke="#3b82f6" 
                                strokeWidth={2}
                                fillOpacity={1} 
                                fill="url(#colorPortfolio)" 
                            />
                            <Line 
                                type="monotone" 
                                dataKey="benchmark" 
                                stroke="#94a3b8" 
                                strokeWidth={2}
                                strokeDasharray="5 5"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Top Holdings */}
                <div className="chart-card" style={{ marginTop: '20px' }}>
                    <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Top Holdings</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {topHoldings.map(holding => (
                            <div key={holding.symbol} style={{
                                padding: '12px',
                                background: 'var(--bg)',
                                borderRadius: '8px',
                                border: holding.allocation > 10 ? '1px solid #f59e0b' : '1px solid var(--border)'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ fontWeight: 'bold' }}>{holding.symbol}</div>
                                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                                            {holding.name}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontWeight: 'bold' }}>
                                            ${(holding.value / 1000000).toFixed(1)}M
                                        </div>
                                        <div style={{ 
                                            fontSize: '12px',
                                            color: holding.change >= 0 ? '#22c55e' : '#ef4444'
                                        }}>
                                            {holding.change >= 0 ? '+' : ''}{holding.change}%
                                        </div>
                                    </div>
                                    <div style={{
                                        padding: '4px 8px',
                                        background: holding.allocation > 10 ? '#fef3c7' : 'var(--card-bg)',
                                        borderRadius: '4px',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                        color: holding.allocation > 10 ? '#f59e0b' : 'var(--text)'
                                    }}>
                                        {holding.allocation}%
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="dashboard-right">
                {/* Asset Allocation */}
                <div className="chart-card">
                    <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Asset Allocation</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={portfolioAllocation}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, value }) => `${name}: ${value}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {portfolioAllocation.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <div style={{ marginTop: '16px' }}>
                        {portfolioAllocation.map((item, index) => (
                            <div key={item.name} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '8px',
                                background: 'var(--bg)',
                                borderRadius: '4px',
                                marginBottom: '4px'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{
                                        width: '12px',
                                        height: '12px',
                                        borderRadius: '2px',
                                        background: COLORS[index % COLORS.length]
                                    }}/>
                                    <span style={{ fontSize: '13px' }}>{item.name}</span>
                                </div>
                                <span style={{ fontSize: '13px', fontWeight: 'bold' }}>
                                    ${(item.amount / 1000000).toFixed(1)}M
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Financial Goals */}
                <div className="chart-card" style={{ marginTop: '20px' }}>
                    <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Financial Goals Progress</h3>
                    {financialGoals.map(goal => (
                        <div key={goal.name} style={{ marginBottom: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                <span style={{ fontSize: '13px', fontWeight: '500' }}>{goal.name}</span>
                                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                                    {goal.targetDate}
                                </span>
                            </div>
                            <div style={{ 
                                height: '8px',
                                background: '#e5e7eb',
                                borderRadius: '4px',
                                overflow: 'hidden',
                                marginBottom: '4px'
                            }}>
                                <div style={{
                                    width: `${goal.progress}%`,
                                    height: '100%',
                                    background: goal.progress >= 70 ? '#22c55e' : goal.progress >= 50 ? '#f59e0b' : '#ef4444'
                                }}/>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                                    ${(goal.current / 1000000).toFixed(1)}M / ${(goal.target / 1000000).toFixed(1)}M
                                </span>
                                <span style={{ fontSize: '11px', fontWeight: 'bold' }}>
                                    {goal.progress}%
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderCashFlow = () => (
        <div className="dashboard-grid">
            <div className="dashboard-left">
                <div className="chart-card">
                    <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Cash Flow Projection</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={cashFlowProjection}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                            <XAxis dataKey="month" stroke="var(--text-secondary)" />
                            <YAxis 
                                stroke="var(--text-secondary)"
                                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                            />
                            <Tooltip 
                                formatter={(value: any) => `$${(value / 1000).toFixed(0)}K`}
                                contentStyle={{ 
                                    background: 'var(--card-bg)', 
                                    border: '1px solid var(--border)',
                                    borderRadius: '8px'
                                }}
                            />
                            <Area type="monotone" dataKey="income" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} />
                            <Area type="monotone" dataKey="expenses" stackId="2" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="dashboard-right">
                <div className="chart-card">
                    <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Liquidity Analysis</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ padding: '16px', background: 'var(--bg)', borderRadius: '8px' }}>
                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Current Cash Position</div>
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--primary)' }}>$2.4M</div>
                        </div>
                        <div style={{ padding: '16px', background: 'var(--bg)', borderRadius: '8px' }}>
                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Monthly Burn Rate</div>
                            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>$340K</div>
                        </div>
                        <div style={{ padding: '16px', background: '#fef3c7', borderRadius: '8px' }}>
                            <div style={{ fontSize: '12px', color: '#92400e' }}>Months of Runway</div>
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f59e0b' }}>7.1</div>
                            <div style={{ fontSize: '11px', color: '#92400e', marginTop: '4px' }}>
                                Recommended: 12+ months
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <ModuleBase
            moduleName="wealthIQ"
            moduleIcon="💰"
            description="Centralize investment accounts, track performance, and optimize your wealth strategy"
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
                {['overview', 'cash flow', 'planning', 'reports'].map(tab => (
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
                        {tab.replace(/([A-Z])/g, ' $1').trim()}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'cash flow' && renderCashFlow()}
            {activeTab === 'planning' && (
                <div className="chart-card">
                    <h3>Financial Planning Tools</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>Monte Carlo simulations and scenario planning coming soon...</p>
                </div>
            )}
            {activeTab === 'reports' && (
                <div className="chart-card">
                    <h3>Performance Reports</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>Detailed analytics and reporting coming soon...</p>
                </div>
            )}
        </ModuleBase>
    );
};

export default WealthIQ; 