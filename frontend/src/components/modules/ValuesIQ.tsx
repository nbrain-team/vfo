import React, { useState } from 'react';
import ModuleBase from './ModuleBase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const ValuesIQ: React.FC = () => {
    const [activeTab, setActiveTab] = useState('overview');
    
    // Mock data
    const moduleScore = {
        overall: 78,
        status: 'green' as const,
        lastUpdated: '2024-08-08',
        subScores: {
            alignment: 82,
            consistency: 75,
            progress: 78,
            authenticity: 77
        }
    };

    const alerts = [
        { type: 'info' as const, message: 'Your spending patterns align well with your stated value of "Family First"' },
        { type: 'warning' as const, message: 'Time allocation to "Personal Growth" is below your target' }
    ];

    // Core values data
    const coreValues = [
        { value: 'Family First', importance: 95, alignment: 88, category: 'Relationships' },
        { value: 'Financial Freedom', importance: 90, alignment: 72, category: 'Wealth' },
        { value: 'Personal Growth', importance: 85, alignment: 65, category: 'Development' },
        { value: 'Health & Wellness', importance: 80, alignment: 78, category: 'Health' },
        { value: 'Community Impact', importance: 75, alignment: 82, category: 'Legacy' },
        { value: 'Adventure & Experience', importance: 70, alignment: 55, category: 'Lifestyle' }
    ];

    // Values alignment over time
    const alignmentTrend = [
        { month: 'Jan', alignment: 65 },
        { month: 'Feb', alignment: 68 },
        { month: 'Mar', alignment: 70 },
        { month: 'Apr', alignment: 72 },
        { month: 'May', alignment: 75 },
        { month: 'Jun', alignment: 76 },
        { month: 'Jul', alignment: 78 }
    ];

    // Resource allocation vs values
    const resourceAllocation = [
        { category: 'Family', target: 35, actual: 32, variance: -3 },
        { category: 'Career', target: 25, actual: 38, variance: 13 },
        { category: 'Health', target: 20, actual: 15, variance: -5 },
        { category: 'Growth', target: 10, actual: 8, variance: -2 },
        { category: 'Community', target: 10, actual: 7, variance: -3 }
    ];

    // Liberation Journey Mapping
    const liberationMap = {
        currentStage: 'Stabilizing',
        nextMilestone: 'Achieve 85% values alignment',
        daysToMilestone: 45,
        blockers: [
            'Work-life balance needs adjustment',
            'Investment strategy not fully aligned with values',
            'Time allocation to personal growth insufficient'
        ],
        achievements: [
            'Established family trust structure',
            'Automated charitable giving',
            'Created values-based investment policy'
        ]
    };

    // Radar chart data for values wheel
    const valuesWheel = coreValues.map(v => ({
        value: v.value,
        importance: v.importance,
        alignment: v.alignment
    }));

    const renderOverview = () => (
        <div className="dashboard-grid">
            <div className="dashboard-left">
                {/* Values Alignment Chart */}
                <div className="chart-card">
                    <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Values Alignment Wheel</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <RadarChart data={valuesWheel}>
                            <PolarGrid stroke="var(--border)" />
                            <PolarAngleAxis dataKey="value" tick={{ fontSize: 11 }} />
                            <PolarRadiusAxis angle={90} domain={[0, 100]} />
                            <Radar name="Importance" dataKey="importance" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                            <Radar name="Alignment" dataKey="alignment" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
                            <Tooltip />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>

                {/* Core Values List */}
                <div className="chart-card" style={{ marginTop: '20px' }}>
                    <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Core Values Assessment</h3>
                    {coreValues.map(value => (
                        <div key={value.value} style={{
                            padding: '12px',
                            marginBottom: '8px',
                            background: 'var(--bg)',
                            borderRadius: '8px',
                            border: '1px solid var(--border)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <div>
                                    <strong>{value.value}</strong>
                                    <span style={{ 
                                        marginLeft: '8px',
                                        fontSize: '12px',
                                        color: 'var(--text-secondary)',
                                        background: 'var(--card-bg)',
                                        padding: '2px 8px',
                                        borderRadius: '4px'
                                    }}>
                                        {value.category}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <span style={{ fontSize: '14px' }}>
                                        Importance: <strong>{value.importance}%</strong>
                                    </span>
                                    <span style={{ 
                                        fontSize: '14px',
                                        color: value.alignment >= 80 ? '#22c55e' : value.alignment >= 60 ? '#f59e0b' : '#ef4444'
                                    }}>
                                        Alignment: <strong>{value.alignment}%</strong>
                                    </span>
                                </div>
                            </div>
                            <div style={{ 
                                height: '4px',
                                background: '#e5e7eb',
                                borderRadius: '2px',
                                overflow: 'hidden'
                            }}>
                                <div style={{
                                    width: `${value.alignment}%`,
                                    height: '100%',
                                    background: value.alignment >= 80 ? '#22c55e' : value.alignment >= 60 ? '#f59e0b' : '#ef4444'
                                }}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="dashboard-right">
                {/* Liberation Journey Progress */}
                <div className="chart-card">
                    <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Liberation Journey Progress</h3>
                    <div style={{
                        padding: '16px',
                        background: 'linear-gradient(135deg, var(--primary) 0%, #8b5cf6 100%)',
                        borderRadius: '8px',
                        color: 'white',
                        marginBottom: '16px'
                    }}>
                        <div style={{ fontSize: '14px', opacity: 0.9 }}>Current Stage</div>
                        <div style={{ fontSize: '24px', fontWeight: 'bold', margin: '4px 0' }}>
                            {liberationMap.currentStage}
                        </div>
                        <div style={{ fontSize: '12px', opacity: 0.9 }}>
                            Next: {liberationMap.nextMilestone}
                        </div>
                        <div style={{ fontSize: '12px', marginTop: '8px' }}>
                            Est. {liberationMap.daysToMilestone} days to milestone
                        </div>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Recent Achievements</h4>
                        {liberationMap.achievements.map((achievement, index) => (
                            <div key={index} style={{
                                padding: '8px',
                                marginBottom: '4px',
                                background: 'var(--bg)',
                                borderRadius: '4px',
                                fontSize: '13px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <span style={{ color: '#22c55e' }}>✓</span>
                                {achievement}
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '16px' }}>
                        <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Current Blockers</h4>
                        {liberationMap.blockers.map((blocker, index) => (
                            <div key={index} style={{
                                padding: '8px',
                                marginBottom: '4px',
                                background: '#fef3c7',
                                borderRadius: '4px',
                                fontSize: '13px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <span style={{ color: '#f59e0b' }}>!</span>
                                {blocker}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Resource Allocation */}
                <div className="chart-card" style={{ marginTop: '20px' }}>
                    <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Resource Allocation vs Values</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={resourceAllocation}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                            <XAxis dataKey="category" tick={{ fontSize: 11 }} />
                            <YAxis tick={{ fontSize: 11 }} />
                            <Tooltip />
                            <Bar dataKey="target" fill="#3b82f6" opacity={0.5} />
                            <Bar dataKey="actual" fill="#22c55e" />
                        </BarChart>
                    </ResponsiveContainer>
                    <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', background: '#3b82f6', opacity: 0.5, marginRight: '4px' }}></span>
                        Target Allocation
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', background: '#22c55e', marginLeft: '12px', marginRight: '4px' }}></span>
                        Actual Allocation
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="chart-card" style={{ marginTop: '20px' }}>
                    <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>Values Actions</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <button style={{
                            padding: '12px',
                            background: 'var(--primary)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '14px'
                        }}>
                            Update Values Assessment
                        </button>
                        <button style={{
                            padding: '12px',
                            background: 'transparent',
                            color: 'var(--primary)',
                            border: '1px solid var(--primary)',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '14px'
                        }}>
                            Schedule Values Review
                        </button>
                        <button style={{
                            padding: '12px',
                            background: 'transparent',
                            color: 'var(--primary)',
                            border: '1px solid var(--primary)',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '14px'
                        }}>
                            Generate Family Charter
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderJournal = () => (
        <div className="chart-card">
            <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Values Journal & Reflections</h3>
            <div style={{ marginBottom: '20px' }}>
                <textarea
                    placeholder="Reflect on how your recent decisions align with your core values..."
                    style={{
                        width: '100%',
                        minHeight: '120px',
                        padding: '12px',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        background: 'var(--bg)',
                        resize: 'vertical',
                        fontFamily: 'inherit',
                        fontSize: '14px'
                    }}
                />
                <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                    <button style={{
                        padding: '8px 16px',
                        background: 'var(--primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px'
                    }}>
                        Save Entry
                    </button>
                    <button style={{
                        padding: '8px 16px',
                        background: 'transparent',
                        color: 'var(--primary)',
                        border: '1px solid var(--border)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px'
                    }}>
                        🎤 Voice Entry
                    </button>
                </div>
            </div>

            <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Recent Reflections</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{
                    padding: '12px',
                    background: 'var(--bg)',
                    borderRadius: '8px',
                    border: '1px solid var(--border)'
                }}>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                        July 15, 2024
                    </div>
                    <p style={{ fontSize: '14px', margin: 0 }}>
                        Realized today that my investment portfolio doesn't fully reflect my value of environmental sustainability. 
                        Need to review ESG options with my advisor.
                    </p>
                </div>
                <div style={{
                    padding: '12px',
                    background: 'var(--bg)',
                    borderRadius: '8px',
                    border: '1px solid var(--border)'
                }}>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                        July 8, 2024
                    </div>
                    <p style={{ fontSize: '14px', margin: 0 }}>
                        Family meeting went well. Everyone aligned on our charitable giving strategy for next year. 
                        Feels good to involve the kids in these decisions.
                    </p>
                </div>
            </div>
        </div>
    );

    return (
        <ModuleBase
            moduleName="valuesIQ"
            moduleIcon="🎯"
            description="Align your financial decisions with your core values and track your liberation journey"
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
                {['overview', 'journal', 'governance', 'liberation'].map(tab => (
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
            {activeTab === 'journal' && renderJournal()}
            {activeTab === 'governance' && (
                <div className="chart-card">
                    <h3>Family Governance Framework</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>Coming soon...</p>
                </div>
            )}
            {activeTab === 'liberation' && (
                <div className="chart-card">
                    <h3>Liberation Journey Mapping</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>Coming soon...</p>
                </div>
            )}
        </ModuleBase>
    );
};

export default ValuesIQ; 