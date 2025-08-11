import React, { useState } from 'react';
import ModuleBase from './ModuleBase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const TaxIQ: React.FC = () => {
    const [activeTab, setActiveTab] = useState('overview');
    
    // Mock data
    const moduleScore = {
        overall: 90,
        status: 'green' as const,
        lastUpdated: '2024-08-08',
        subScores: {
            compliance: 95,
            optimization: 88,
            planning: 85,
            documentation: 92
        }
    };

    const alerts = [
        { type: 'critical' as const, message: 'Q3 estimated tax payment due September 15th - $45,000' },
        { type: 'warning' as const, message: 'Tax loss harvesting opportunity: $12,000 in unrealized losses' },
        { type: 'info' as const, message: '2024 tax projection updated based on recent transactions' }
    ];

    // Tax obligations
    const taxObligations = [
        { type: 'Federal Income Tax', amount: 850000, paid: 637500, remaining: 212500, dueDate: '2025-04-15' },
        { type: 'State Income Tax (CA)', amount: 125000, paid: 93750, remaining: 31250, dueDate: '2025-04-15' },
        { type: 'Property Tax', amount: 48000, paid: 24000, remaining: 24000, dueDate: '2024-12-10' },
        { type: 'Quarterly Estimated', amount: 180000, paid: 135000, remaining: 45000, dueDate: '2024-09-15' }
    ];

    // Tax savings strategies
    const taxStrategies = [
        { strategy: '401(k) Max Contribution', potentialSaving: 8500, status: 'Implemented', impact: 'High' },
        { strategy: 'Backdoor Roth IRA', potentialSaving: 2200, status: 'In Progress', impact: 'Medium' },
        { strategy: 'Charitable Giving', potentialSaving: 15000, status: 'Planned', impact: 'High' },
        { strategy: 'Tax Loss Harvesting', potentialSaving: 4500, status: 'Available', impact: 'Medium' },
        { strategy: 'HSA Maximization', potentialSaving: 1800, status: 'Implemented', impact: 'Low' },
        { strategy: 'Donor Advised Fund', potentialSaving: 25000, status: 'Evaluating', impact: 'High' }
    ];

    // Tax year comparison
    const taxYearComparison = [
        { year: '2020', income: 1200000, taxPaid: 420000, effectiveRate: 35.0 },
        { year: '2021', income: 1450000, taxPaid: 507500, effectiveRate: 35.0 },
        { year: '2022', income: 1680000, taxPaid: 571200, effectiveRate: 34.0 },
        { year: '2023', income: 1920000, taxPaid: 633600, effectiveRate: 33.0 },
        { year: '2024 (Est)', income: 2100000, taxPaid: 672000, effectiveRate: 32.0 }
    ];

    // Deductions breakdown
    const deductionsBreakdown = [
        { category: 'Mortgage Interest', amount: 45000 },
        { category: 'State & Local Taxes', amount: 10000 },
        { category: 'Charitable Donations', amount: 85000 },
        { category: 'Business Expenses', amount: 125000 },
        { category: 'Investment Expenses', amount: 15000 }
    ];

    // Filing deadlines
    const filingDeadlines = [
        { form: 'Q3 Estimated Tax', date: '2024-09-15', status: 'Upcoming', amount: 45000 },
        { form: 'Extended 2023 Return', date: '2024-10-15', status: 'In Progress', amount: null },
        { form: 'Q4 Estimated Tax', date: '2025-01-15', status: 'Future', amount: 45000 },
        { form: '2024 Tax Return', date: '2025-04-15', status: 'Future', amount: null },
        { form: 'Property Tax Payment', date: '2024-12-10', status: 'Upcoming', amount: 24000 }
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'Implemented': return '#22c55e';
            case 'In Progress': return '#3b82f6';
            case 'Planned': return '#f59e0b';
            case 'Available': return '#8b5cf6';
            case 'Evaluating': return '#94a3b8';
            default: return '#6b7280';
        }
    };

    const renderOverview = () => (
        <div className="dashboard-grid">
            <div className="dashboard-left">
                {/* Tax Obligations */}
                <div className="chart-card">
                    <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Current Tax Obligations</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {taxObligations.map(obligation => (
                            <div key={obligation.type} style={{
                                padding: '12px',
                                background: 'var(--bg)',
                                borderRadius: '8px',
                                border: '1px solid var(--border)'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <div>
                                        <div style={{ fontWeight: 'bold' }}>{obligation.type}</div>
                                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                                            Due: {obligation.dueDate}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontWeight: 'bold' }}>
                                            ${obligation.remaining.toLocaleString()}
                                        </div>
                                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                                            remaining
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                        <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                                            Payment Progress
                                        </span>
                                        <span style={{ fontSize: '11px' }}>
                                            ${obligation.paid.toLocaleString()} / ${obligation.amount.toLocaleString()}
                                        </span>
                                    </div>
                                    <div style={{ 
                                        height: '6px',
                                        background: '#e5e7eb',
                                        borderRadius: '3px',
                                        overflow: 'hidden'
                                    }}>
                                        <div style={{
                                            width: `${(obligation.paid / obligation.amount) * 100}%`,
                                            height: '100%',
                                            background: '#22c55e'
                                        }}/>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Year Comparison */}
                <div className="chart-card" style={{ marginTop: '20px' }}>
                    <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Tax History & Effective Rate</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={taxYearComparison}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                            <XAxis dataKey="year" stroke="var(--text-secondary)" />
                            <YAxis yAxisId="left" stroke="var(--text-secondary)" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                            <YAxis yAxisId="right" orientation="right" stroke="var(--text-secondary)" tickFormatter={(value) => `${value}%`} />
                            <Tooltip 
                                formatter={(value: any, name: string) => {
                                    if (name === 'effectiveRate') return `${value}%`;
                                    return `$${(value / 1000).toFixed(0)}K`;
                                }}
                                contentStyle={{ 
                                    background: 'var(--card-bg)', 
                                    border: '1px solid var(--border)',
                                    borderRadius: '8px'
                                }}
                            />
                            <Line yAxisId="left" type="monotone" dataKey="income" stroke="#3b82f6" strokeWidth={2} name="Income" />
                            <Line yAxisId="left" type="monotone" dataKey="taxPaid" stroke="#ef4444" strokeWidth={2} name="Tax Paid" />
                            <Line yAxisId="right" type="monotone" dataKey="effectiveRate" stroke="#22c55e" strokeWidth={2} strokeDasharray="5 5" name="Effective Rate" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="dashboard-right">
                {/* Deductions Breakdown */}
                <div className="chart-card">
                    <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>2024 Deductions Breakdown</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                data={deductionsBreakdown}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ category, amount }) => `${category}: $${(amount / 1000).toFixed(0)}K`}
                                outerRadius={70}
                                fill="#8884d8"
                                dataKey="amount"
                            >
                                {deductionsBreakdown.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value: any) => `$${(value / 1000).toFixed(0)}K`} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div style={{ 
                        padding: '12px',
                        background: 'var(--bg)',
                        borderRadius: '8px',
                        marginTop: '12px'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                                Total Deductions
                            </span>
                            <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                $280,000
                            </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                                Tax Savings
                            </span>
                            <span style={{ fontSize: '14px', color: '#22c55e' }}>
                                ~$98,000
                            </span>
                        </div>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="chart-card" style={{ marginTop: '20px' }}>
                    <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>2024 Tax Projections</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div style={{ padding: '12px', background: 'var(--bg)', borderRadius: '8px' }}>
                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Projected Income</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>$2.1M</div>
                        </div>
                        <div style={{ padding: '12px', background: 'var(--bg)', borderRadius: '8px' }}>
                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Est. Tax Liability</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>$672K</div>
                        </div>
                        <div style={{ padding: '12px', background: 'var(--bg)', borderRadius: '8px' }}>
                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Effective Rate</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#22c55e' }}>32.0%</div>
                        </div>
                        <div style={{ padding: '12px', background: 'var(--bg)', borderRadius: '8px' }}>
                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Marginal Rate</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>37.0%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderStrategies = () => (
        <div className="chart-card">
            <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Tax Optimization Strategies</h3>
            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Strategy</th>
                            <th>Potential Savings</th>
                            <th>Impact</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {taxStrategies.map((strategy, index) => (
                            <tr key={index}>
                                <td>{strategy.strategy}</td>
                                <td style={{ textAlign: 'right' }}>${strategy.potentialSaving.toLocaleString()}</td>
                                <td>
                                    <span style={{
                                        padding: '2px 8px',
                                        background: strategy.impact === 'High' ? '#fee2e2' : strategy.impact === 'Medium' ? '#fef3c7' : '#e0e7ff',
                                        color: strategy.impact === 'High' ? '#dc2626' : strategy.impact === 'Medium' ? '#f59e0b' : '#4f46e5',
                                        borderRadius: '4px',
                                        fontSize: '11px'
                                    }}>
                                        {strategy.impact}
                                    </span>
                                </td>
                                <td>
                                    <span style={{
                                        padding: '2px 8px',
                                        background: getStatusColor(strategy.status) + '15',
                                        color: getStatusColor(strategy.status),
                                        borderRadius: '4px',
                                        fontSize: '11px'
                                    }}>
                                        {strategy.status}
                                    </span>
                                </td>
                                <td>
                                    <button style={{
                                        padding: '4px 12px',
                                        background: 'var(--primary)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontSize: '11px'
                                    }}>
                                        {strategy.status === 'Implemented' ? 'Review' : 'Implement'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div style={{ 
                marginTop: '20px',
                padding: '16px',
                background: 'linear-gradient(135deg, #22c55e15 0%, #3b82f615 100%)',
                borderRadius: '8px',
                border: '1px solid #22c55e50'
            }}>
                <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>Total Optimization Opportunity</h4>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#22c55e' }}>
                    $57,000
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    Implementing all available strategies could reduce your tax liability by approximately 8.5%
                </p>
            </div>
        </div>
    );

    const renderDeadlines = () => (
        <div className="chart-card">
            <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Upcoming Tax Deadlines</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {filingDeadlines.map((deadline, index) => (
                    <div key={index} style={{
                        padding: '16px',
                        background: 'var(--bg)',
                        borderRadius: '8px',
                        border: deadline.status === 'Upcoming' ? '1px solid #f59e0b' : '1px solid var(--border)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{deadline.form}</div>
                                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                                    Due: {deadline.date}
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                {deadline.amount && (
                                    <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>
                                        ${deadline.amount.toLocaleString()}
                                    </div>
                                )}
                                <span style={{
                                    padding: '4px 8px',
                                    background: deadline.status === 'Upcoming' ? '#fef3c7' : 
                                               deadline.status === 'In Progress' ? '#dbeafe' : '#f3f4f6',
                                    color: deadline.status === 'Upcoming' ? '#92400e' : 
                                           deadline.status === 'In Progress' ? '#1e40af' : '#6b7280',
                                    borderRadius: '4px',
                                    fontSize: '11px'
                                }}>
                                    {deadline.status}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <ModuleBase
            moduleName="taxIQ"
            moduleIcon="📋"
            description="Strategic tax planning, compliance tracking, and optimization opportunities"
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
                {['overview', 'strategies', 'deadlines', 'documents'].map(tab => (
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
                        {tab}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'strategies' && renderStrategies()}
            {activeTab === 'deadlines' && renderDeadlines()}
            {activeTab === 'documents' && (
                <div className="chart-card">
                    <h3>Tax Documents Vault</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>W-2s, 1099s, K-1s, and tax returns securely stored...</p>
                </div>
            )}
        </ModuleBase>
    );
};

export default TaxIQ; 