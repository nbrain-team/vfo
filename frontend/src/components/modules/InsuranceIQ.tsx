import React, { useState } from 'react';
import ModuleBase from './ModuleBase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';

const InsuranceIQ: React.FC = () => {
    const [activeTab, setActiveTab] = useState('overview');
    
    // Mock data
    const moduleScore = {
        overall: 72,
        status: 'green' as const,
        lastUpdated: '2024-08-08',
        subScores: {
            coverage: 85,
            premiums: 68,
            claims: 90,
            compliance: 75
        }
    };

    const alerts = [
        { type: 'warning' as const, message: 'Umbrella policy renewal due in 45 days' },
        { type: 'info' as const, message: 'Annual insurance review scheduled for next month' }
    ];

    // Coverage summary
    const coverageSummary = [
        { 
            type: 'Life Insurance',
            carrier: 'NY Life',
            coverage: 25000000,
            premium: 48000,
            status: 'Active',
            renewal: '2025-03-15',
            adequacy: 95
        },
        {
            type: 'Disability',
            carrier: 'Guardian',
            coverage: 50000,
            premium: 8400,
            status: 'Active',
            renewal: '2024-12-01',
            adequacy: 80
        },
        {
            type: 'Home & Property',
            carrier: 'Chubb',
            coverage: 15000000,
            premium: 36000,
            status: 'Active',
            renewal: '2024-11-30',
            adequacy: 100
        },
        {
            type: 'Auto',
            carrier: 'GEICO',
            coverage: 2000000,
            premium: 6800,
            status: 'Active',
            renewal: '2024-09-15',
            adequacy: 100
        },
        {
            type: 'Umbrella',
            carrier: 'Chubb',
            coverage: 50000000,
            premium: 12000,
            status: 'Renewal Due',
            renewal: '2024-09-22',
            adequacy: 90
        },
        {
            type: 'Health',
            carrier: 'Blue Cross',
            coverage: 'Comprehensive',
            premium: 24000,
            status: 'Active',
            renewal: '2025-01-01',
            adequacy: 100
        }
    ];

    // Risk assessment
    const riskAssessment = [
        { category: 'Life', exposure: 25000000, coverage: 25000000, gap: 0 },
        { category: 'Disability', exposure: 2500000, coverage: 2000000, gap: 500000 },
        { category: 'Property', exposure: 18000000, coverage: 15000000, gap: 3000000 },
        { category: 'Liability', exposure: 60000000, coverage: 52000000, gap: 8000000 },
        { category: 'Health', exposure: 5000000, coverage: 5000000, gap: 0 }
    ];

    // Claims history
    const claimsHistory = [
        { date: '2024-06-15', type: 'Auto', amount: 8500, status: 'Paid', carrier: 'GEICO' },
        { date: '2024-03-22', type: 'Health', amount: 2300, status: 'Paid', carrier: 'Blue Cross' },
        { date: '2023-11-10', type: 'Property', amount: 45000, status: 'Paid', carrier: 'Chubb' },
        { date: '2023-08-05', type: 'Health', amount: 1200, status: 'Paid', carrier: 'Blue Cross' }
    ];

    // Premium trend
    const premiumTrend = [
        { year: '2020', total: 110000 },
        { year: '2021', total: 118000 },
        { year: '2022', total: 125000 },
        { year: '2023', total: 132000 },
        { year: '2024', total: 135200 }
    ];

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'Active': return '#22c55e';
            case 'Renewal Due': return '#f59e0b';
            case 'Expired': return '#ef4444';
            default: return '#94a3b8';
        }
    };

    const renderOverview = () => (
        <div className="dashboard-grid">
            <div className="dashboard-left">
                {/* Coverage Summary */}
                <div className="chart-card">
                    <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Insurance Coverage Summary</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {coverageSummary.map(policy => (
                            <div key={policy.type} style={{
                                padding: '12px',
                                background: 'var(--bg)',
                                borderRadius: '8px',
                                border: policy.status === 'Renewal Due' ? '1px solid #f59e0b' : '1px solid var(--border)'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <div>
                                        <div style={{ fontWeight: 'bold' }}>{policy.type}</div>
                                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                                            {policy.carrier}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontWeight: 'bold' }}>
                                            {typeof policy.coverage === 'number' 
                                                ? `$${(policy.coverage / 1000000).toFixed(1)}M` 
                                                : policy.coverage}
                                        </div>
                                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                                            ${(policy.premium / 1000).toFixed(1)}K/yr
                                        </div>
                                    </div>
                                    <div style={{
                                        padding: '4px 8px',
                                        background: getStatusColor(policy.status) + '15',
                                        borderRadius: '4px',
                                        fontSize: '12px',
                                        color: getStatusColor(policy.status)
                                    }}>
                                        {policy.status}
                                    </div>
                                </div>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                        <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                                            Coverage Adequacy
                                        </span>
                                        <span style={{ fontSize: '11px', fontWeight: 'bold' }}>
                                            {policy.adequacy}%
                                        </span>
                                    </div>
                                    <div style={{ 
                                        height: '4px',
                                        background: '#e5e7eb',
                                        borderRadius: '2px',
                                        overflow: 'hidden'
                                    }}>
                                        <div style={{
                                            width: `${policy.adequacy}%`,
                                            height: '100%',
                                            background: policy.adequacy >= 90 ? '#22c55e' : policy.adequacy >= 70 ? '#f59e0b' : '#ef4444'
                                        }}/>
                                    </div>
                                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                                        Renewal: {policy.renewal}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="dashboard-right">
                {/* Risk Assessment */}
                <div className="chart-card">
                    <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Risk Coverage Analysis</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={riskAssessment}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                            <XAxis dataKey="category" tick={{ fontSize: 11 }} />
                            <YAxis 
                                tick={{ fontSize: 11 }}
                                tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}M`}
                            />
                            <Tooltip 
                                formatter={(value: any) => `$${(value / 1000000).toFixed(1)}M`}
                                contentStyle={{ 
                                    background: 'var(--card-bg)', 
                                    border: '1px solid var(--border)',
                                    borderRadius: '8px'
                                }}
                            />
                            <Bar dataKey="exposure" fill="#ef4444" opacity={0.3} />
                            <Bar dataKey="coverage" fill="#22c55e" />
                        </BarChart>
                    </ResponsiveContainer>
                    <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', background: '#ef4444', opacity: 0.3, marginRight: '4px' }}></span>
                        Risk Exposure
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', background: '#22c55e', marginLeft: '12px', marginRight: '4px' }}></span>
                        Current Coverage
                    </div>
                </div>

                {/* Premium Summary */}
                <div className="chart-card" style={{ marginTop: '20px' }}>
                    <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Annual Premium Trend</h3>
                    <ResponsiveContainer width="100%" height={150}>
                        <BarChart data={premiumTrend}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                            <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                            <YAxis 
                                tick={{ fontSize: 11 }}
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
                            <Bar dataKey="total" fill="var(--primary)" />
                        </BarChart>
                    </ResponsiveContainer>
                    <div style={{ 
                        padding: '12px',
                        background: 'var(--bg)',
                        borderRadius: '8px',
                        marginTop: '12px'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                                Total Annual Premium
                            </span>
                            <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                $135,200
                            </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                                YoY Change
                            </span>
                            <span style={{ fontSize: '14px', color: '#22c55e' }}>
                                +2.4%
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderClaims = () => (
        <div className="chart-card">
            <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Claims History</h3>
            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Carrier</th>
                            <th style={{ textAlign: 'right' }}>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {claimsHistory.map((claim, index) => (
                            <tr key={index}>
                                <td>{claim.date}</td>
                                <td>{claim.type}</td>
                                <td>{claim.carrier}</td>
                                <td style={{ textAlign: 'right' }}>${claim.amount.toLocaleString()}</td>
                                <td>
                                    <span style={{
                                        padding: '2px 8px',
                                        background: '#22c55e15',
                                        color: '#22c55e',
                                        borderRadius: '4px',
                                        fontSize: '12px'
                                    }}>
                                        {claim.status}
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
                background: 'var(--bg)',
                borderRadius: '8px'
            }}>
                <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Claims Summary</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                    <div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Total Claims (2Y)</div>
                        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>4</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Total Paid</div>
                        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>$57K</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Avg Processing</div>
                        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>12 days</div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <ModuleBase
            moduleName="insuranceIQ"
            moduleIcon="🛡️"
            description="Comprehensive risk management and insurance coverage optimization"
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
                {['overview', 'claims', 'documents', 'advisors'].map(tab => (
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
            {activeTab === 'claims' && renderClaims()}
            {activeTab === 'documents' && (
                <div className="chart-card">
                    <h3>Policy Documents</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>Upload and manage insurance policy documents...</p>
                </div>
            )}
            {activeTab === 'advisors' && (
                <div className="chart-card">
                    <h3>Insurance Advisors</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>Manage insurance broker and advisor contacts...</p>
                </div>
            )}
        </ModuleBase>
    );
};

export default InsuranceIQ; 