import React, { useState } from 'react';
import ModuleBase from './ModuleBase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';

const HealthIQ: React.FC = () => {
    const [activeTab, setActiveTab] = useState('overview');
    
    // Mock data
    const moduleScore = {
        overall: 82,
        status: 'green' as const,
        lastUpdated: '2024-08-08',
        subScores: {
            coverage: 90,
            prevention: 85,
            hsaOptimization: 78,
            wellness: 75
        }
    };

    const alerts = [
        { type: 'info' as const, message: 'Annual physical exam due next month - schedule with Dr. Smith' },
        { type: 'warning' as const, message: 'HSA contribution below annual maximum - $2,500 remaining' },
        { type: 'info' as const, message: 'New preventive care benefit available: Mental health screening' }
    ];

    // Healthcare coverage
    const healthcarePlans = [
        {
            type: 'Medical',
            provider: 'Blue Cross PPO',
            premium: 1800,
            deductible: 2000,
            deductibleMet: 1500,
            outOfPocketMax: 8000,
            outOfPocketMet: 2800,
            status: 'Active'
        },
        {
            type: 'Dental',
            provider: 'Delta Dental',
            premium: 120,
            deductible: 500,
            deductibleMet: 200,
            outOfPocketMax: 2000,
            outOfPocketMet: 450,
            status: 'Active'
        },
        {
            type: 'Vision',
            provider: 'VSP',
            premium: 45,
            deductible: 0,
            deductibleMet: 0,
            outOfPocketMax: 500,
            outOfPocketMet: 120,
            status: 'Active'
        },
        {
            type: 'Mental Health',
            provider: 'BetterHelp',
            premium: 260,
            deductible: 0,
            deductibleMet: 0,
            outOfPocketMax: 0,
            outOfPocketMet: 0,
            status: 'Active'
        }
    ];

    // HSA tracking
    const hsaData = {
        balance: 42500,
        contributions: {
            ytd: 5500,
            max: 8000,
            employer: 2000
        },
        investments: {
            stocks: 28000,
            bonds: 10000,
            cash: 4500
        },
        growth: [
            { month: 'Jan', balance: 38000 },
            { month: 'Feb', balance: 38500 },
            { month: 'Mar', balance: 39200 },
            { month: 'Apr', balance: 40100 },
            { month: 'May', balance: 40800 },
            { month: 'Jun', balance: 41600 },
            { month: 'Jul', balance: 42500 }
        ]
    };

    // Healthcare expenses
    const healthExpenses = [
        { category: 'Doctor Visits', amount: 1200, hsaEligible: true, reimbursed: 1200 },
        { category: 'Prescriptions', amount: 3600, hsaEligible: true, reimbursed: 3200 },
        { category: 'Dental Care', amount: 2400, hsaEligible: true, reimbursed: 1800 },
        { category: 'Vision Care', amount: 800, hsaEligible: true, reimbursed: 600 },
        { category: 'Mental Health', amount: 3120, hsaEligible: true, reimbursed: 2800 },
        { category: 'Wellness/Gym', amount: 1440, hsaEligible: false, reimbursed: 0 }
    ];

    // Wellness metrics
    const wellnessMetrics = [
        { metric: 'Annual Physical', status: 'Completed', date: '2024-03-15', nextDue: '2025-03-15' },
        { metric: 'Dental Cleaning', status: 'Completed', date: '2024-06-20', nextDue: '2024-12-20' },
        { metric: 'Eye Exam', status: 'Due Soon', date: '2023-08-10', nextDue: '2024-08-10' },
        { metric: 'Vaccinations', status: 'Up to Date', date: '2024-01-15', nextDue: '2025-01-15' },
        { metric: 'Cancer Screening', status: 'Scheduled', date: 'N/A', nextDue: '2024-09-30' }
    ];

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'Completed': return '#22c55e';
            case 'Up to Date': return '#22c55e';
            case 'Scheduled': return '#3b82f6';
            case 'Due Soon': return '#f59e0b';
            case 'Overdue': return '#ef4444';
            default: return '#94a3b8';
        }
    };

    const renderOverview = () => (
        <div className="dashboard-grid">
            <div className="dashboard-left">
                {/* Healthcare Plans */}
                <div className="chart-card">
                    <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Healthcare Coverage Summary</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {healthcarePlans.map(plan => (
                            <div key={plan.type} style={{
                                padding: '12px',
                                background: 'var(--bg)',
                                borderRadius: '8px',
                                border: '1px solid var(--border)'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <div>
                                        <div style={{ fontWeight: 'bold' }}>{plan.type}</div>
                                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                                            {plan.provider}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontWeight: 'bold' }}>
                                            ${plan.premium}/mo
                                        </div>
                                        <div style={{ fontSize: '12px', color: '#22c55e' }}>
                                            Active
                                        </div>
                                    </div>
                                </div>
                                {plan.deductible > 0 && (
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                            <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                                                Deductible Progress
                                            </span>
                                            <span style={{ fontSize: '11px' }}>
                                                ${plan.deductibleMet} / ${plan.deductible}
                                            </span>
                                        </div>
                                        <div style={{ 
                                            height: '4px',
                                            background: '#e5e7eb',
                                            borderRadius: '2px',
                                            overflow: 'hidden',
                                            marginBottom: '8px'
                                        }}>
                                            <div style={{
                                                width: `${(plan.deductibleMet / plan.deductible) * 100}%`,
                                                height: '100%',
                                                background: '#3b82f6'
                                            }}/>
                                        </div>
                                    </div>
                                )}
                                {plan.outOfPocketMax > 0 && (
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                            <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                                                Out-of-Pocket Progress
                                            </span>
                                            <span style={{ fontSize: '11px' }}>
                                                ${plan.outOfPocketMet} / ${plan.outOfPocketMax}
                                            </span>
                                        </div>
                                        <div style={{ 
                                            height: '4px',
                                            background: '#e5e7eb',
                                            borderRadius: '2px',
                                            overflow: 'hidden'
                                        }}>
                                            <div style={{
                                                width: `${(plan.outOfPocketMet / plan.outOfPocketMax) * 100}%`,
                                                height: '100%',
                                                background: '#22c55e'
                                            }}/>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Healthcare Expenses */}
                <div className="chart-card" style={{ marginTop: '20px' }}>
                    <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>2024 Healthcare Expenses</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={healthExpenses}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                            <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 10 }} />
                            <YAxis tick={{ fontSize: 11 }} tickFormatter={(value) => `$${(value / 1000).toFixed(1)}K`} />
                            <Tooltip 
                                formatter={(value: any) => `$${value.toLocaleString()}`}
                                contentStyle={{ 
                                    background: 'var(--card-bg)', 
                                    border: '1px solid var(--border)',
                                    borderRadius: '8px'
                                }}
                            />
                            <Bar dataKey="amount" fill="#ef4444" opacity={0.3} name="Total Expense" />
                            <Bar dataKey="reimbursed" fill="#22c55e" name="HSA/Insurance Covered" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="dashboard-right">
                {/* HSA Summary */}
                <div className="chart-card">
                    <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Health Savings Account</h3>
                    <div style={{ 
                        padding: '16px',
                        background: 'linear-gradient(135deg, var(--primary) 0%, #22c55e 100%)',
                        borderRadius: '8px',
                        color: 'white',
                        marginBottom: '16px'
                    }}>
                        <div style={{ fontSize: '12px', opacity: 0.9 }}>HSA Balance</div>
                        <div style={{ fontSize: '28px', fontWeight: 'bold', margin: '4px 0' }}>
                            ${hsaData.balance.toLocaleString()}
                        </div>
                        <div style={{ fontSize: '12px', opacity: 0.9 }}>
                            +12.5% YTD Growth
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                        <div style={{ padding: '12px', background: 'var(--bg)', borderRadius: '8px' }}>
                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>2024 Contributions</div>
                            <div style={{ fontSize: '16px', fontWeight: 'bold' }}>${hsaData.contributions.ytd}</div>
                        </div>
                        <div style={{ padding: '12px', background: 'var(--bg)', borderRadius: '8px' }}>
                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Contribution Room</div>
                            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#f59e0b' }}>
                                ${hsaData.contributions.max - hsaData.contributions.ytd}
                            </div>
                        </div>
                    </div>

                    <div>
                        <div style={{ fontSize: '13px', marginBottom: '8px' }}>Investment Allocation</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                                <span>Stocks (66%)</span>
                                <span>${(hsaData.investments.stocks / 1000).toFixed(1)}K</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                                <span>Bonds (24%)</span>
                                <span>${(hsaData.investments.bonds / 1000).toFixed(1)}K</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                                <span>Cash (10%)</span>
                                <span>${(hsaData.investments.cash / 1000).toFixed(1)}K</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="chart-card" style={{ marginTop: '20px' }}>
                    <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Healthcare Metrics</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div style={{ padding: '12px', background: 'var(--bg)', borderRadius: '8px' }}>
                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Total Premiums</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>$2,225/mo</div>
                        </div>
                        <div style={{ padding: '12px', background: 'var(--bg)', borderRadius: '8px' }}>
                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>YTD Expenses</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>$12,560</div>
                        </div>
                        <div style={{ padding: '12px', background: 'var(--bg)', borderRadius: '8px' }}>
                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>HSA Tax Savings</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#22c55e' }}>$2,800</div>
                        </div>
                        <div style={{ padding: '12px', background: 'var(--bg)', borderRadius: '8px' }}>
                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Coverage Score</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#22c55e' }}>90%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderWellness = () => (
        <div className="chart-card">
            <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Preventive Care & Wellness Tracking</h3>
            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Health Metric</th>
                            <th>Status</th>
                            <th>Last Completed</th>
                            <th>Next Due</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wellnessMetrics.map((metric, index) => (
                            <tr key={index}>
                                <td>{metric.metric}</td>
                                <td>
                                    <span style={{
                                        padding: '2px 8px',
                                        background: getStatusColor(metric.status) + '15',
                                        color: getStatusColor(metric.status),
                                        borderRadius: '4px',
                                        fontSize: '11px'
                                    }}>
                                        {metric.status}
                                    </span>
                                </td>
                                <td>{metric.date}</td>
                                <td>{metric.nextDue}</td>
                                <td>
                                    <button style={{
                                        padding: '4px 12px',
                                        background: metric.status === 'Due Soon' ? 'var(--primary)' : 'transparent',
                                        color: metric.status === 'Due Soon' ? 'white' : 'var(--primary)',
                                        border: metric.status === 'Due Soon' ? 'none' : '1px solid var(--primary)',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontSize: '11px'
                                    }}>
                                        {metric.status === 'Scheduled' ? 'View' : 'Schedule'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{ marginTop: '24px' }}>
                <h4 style={{ fontSize: '14px', marginBottom: '16px' }}>Wellness Goals & Tracking</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                    <div style={{
                        padding: '16px',
                        background: 'var(--bg)',
                        borderRadius: '8px',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '24px', marginBottom: '8px' }}>🏃‍♂️</div>
                        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>8,245</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Avg Daily Steps</div>
                        <div style={{ fontSize: '10px', color: '#22c55e', marginTop: '4px' }}>↑ 12% vs last month</div>
                    </div>
                    <div style={{
                        padding: '16px',
                        background: 'var(--bg)',
                        borderRadius: '8px',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '24px', marginBottom: '8px' }}>😴</div>
                        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>7.2h</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Avg Sleep</div>
                        <div style={{ fontSize: '10px', color: '#22c55e', marginTop: '4px' }}>Within target range</div>
                    </div>
                    <div style={{
                        padding: '16px',
                        background: 'var(--bg)',
                        borderRadius: '8px',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '24px', marginBottom: '8px' }}>🧘‍♀️</div>
                        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>4/5</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Weekly Workouts</div>
                        <div style={{ fontSize: '10px', color: '#f59e0b', marginTop: '4px' }}>1 session remaining</div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderHSA = () => (
        <div className="dashboard-grid">
            <div className="dashboard-left">
                <div className="chart-card">
                    <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>HSA Growth Trajectory</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={hsaData.growth}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                            <XAxis dataKey="month" stroke="var(--text-secondary)" />
                            <YAxis 
                                stroke="var(--text-secondary)"
                                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                            />
                            <Tooltip 
                                formatter={(value: any) => `$${value.toLocaleString()}`}
                                contentStyle={{ 
                                    background: 'var(--card-bg)', 
                                    border: '1px solid var(--border)',
                                    borderRadius: '8px'
                                }}
                            />
                            <Line 
                                type="monotone" 
                                dataKey="balance" 
                                stroke="#22c55e" 
                                strokeWidth={2}
                                dot={{ fill: '#22c55e' }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="dashboard-right">
                <div className="chart-card">
                    <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>HSA Optimization Tips</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{
                            padding: '12px',
                            background: '#fef3c7',
                            borderRadius: '8px',
                            fontSize: '13px'
                        }}>
                            <strong>Maximize Contributions:</strong> You have $2,500 remaining for 2024. 
                            Consider increasing monthly contributions to $625 to reach the limit.
                        </div>
                        <div style={{
                            padding: '12px',
                            background: '#dbeafe',
                            borderRadius: '8px',
                            fontSize: '13px'
                        }}>
                            <strong>Investment Strategy:</strong> Your HSA has grown 12.5% YTD. 
                            Consider rebalancing to maintain your 70/30 stock/bond allocation.
                        </div>
                        <div style={{
                            padding: '12px',
                            background: '#dcfce7',
                            borderRadius: '8px',
                            fontSize: '13px'
                        }}>
                            <strong>Tax Savings:</strong> You've saved approximately $2,800 in taxes this year 
                            through HSA contributions and qualified expenses.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <ModuleBase
            moduleName="healthIQ"
            moduleIcon="🏥"
            description="Healthcare coverage optimization, HSA management, and wellness tracking"
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
                {['overview', 'wellness', 'hsa', 'claims'].map(tab => (
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
                        {tab === 'hsa' ? 'HSA' : tab}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'wellness' && renderWellness()}
            {activeTab === 'hsa' && renderHSA()}
            {activeTab === 'claims' && (
                <div className="chart-card">
                    <h3>Claims History & Processing</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>Track insurance claims, appeals, and reimbursements...</p>
                </div>
            )}
        </ModuleBase>
    );
};

export default HealthIQ; 