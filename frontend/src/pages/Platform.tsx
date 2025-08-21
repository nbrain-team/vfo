import React, { useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis, BarChart, Bar, Cell } from 'recharts';
import { getBookings } from '../adminData';

// Liberation Journey Stages
const JOURNEY_STAGES = ['Obscured', 'Awakening', 'Stabilizing', 'Liberating', 'Regenerative'];

const Platform: React.FC = () => {
    const userName = localStorage.getItem('user_name') || 'there';
    const currentHour = new Date().getHours();
    const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';
    
    // Mock user journey data
    const [journeyStage] = useState('Stabilizing');
    const [liberationScore] = useState(68);
    const [selfMasteryScore] = useState(72);
    
    // Module scores with traffic light indicators
    const moduleScores = [
        { name: 'legalIQ', score: 85, status: 'green', description: 'Documents up to date' },
        { name: 'insuranceIQ', score: 72, status: 'green', description: 'Coverage adequate' },
        { name: 'wealthIQ', score: 68, status: 'orange', description: 'Review cash flow' },
        { name: 'taxIQ', score: 90, status: 'green', description: 'Compliant & optimized' },
        { name: 'cryptoIQ', score: 45, status: 'orange', description: 'Needs tax planning' },
        { name: 'valuesIQ', score: 78, status: 'green', description: 'Well aligned' },
        { name: 'healthIQ', score: 82, status: 'green', description: 'Coverage complete' },
    ];
    
    // Money Dysmorphia indicators
    const dysmorphiaIndicators = {
        scarcityMindset: 25,
        wealthShame: 15,
        financialAvoidance: 30,
        comparisonTrap: 40,
    };
    
    // Journey progress data for visualization
    const journeyProgress = [
        { stage: 'Obscured', completed: 100, color: '#ff4444' },
        { stage: 'Awakening', completed: 100, color: '#ff8844' },
        { stage: 'Stabilizing', completed: 65, color: '#ffaa44' },
        { stage: 'Liberating', completed: 0, color: '#44ff44' },
        { stage: 'Regenerative', completed: 0, color: '#44ffff' },
    ];
    
    // Liberation trend over time
    const liberationTrend = [
        { month: 'Jan', score: 42 },
        { month: 'Feb', score: 48 },
        { month: 'Mar', score: 52 },
        { month: 'Apr', score: 58 },
        { month: 'May', score: 61 },
        { month: 'Jun', score: 65 },
        { month: 'Jul', score: 68 },
    ];

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'green': return '#22c55e';
            case 'orange': return '#f59e0b';
            case 'red': return '#ef4444';
            default: return '#94a3b8';
        }
    };

    // Admin KPIs from mock bookings
    const bookings = useMemo(() => getBookings(), []);
    const kpiTotalLeads = bookings.length;
    const kpiBooked = bookings.filter(b => b.stage === 'Booked').length;
    const kpiSigned = bookings.filter(b => b.stage === 'Signed' || b.stage === 'Completed').length;
    const now = Date.now();
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
    const kpiNewThisWeek = bookings.filter(b => {
        const ts = Date.parse(b.createdAt || '');
        return !isNaN(ts) && (now - ts) < sevenDaysMs;
    }).length;

    // Tasks (mock) + generated tasks
    const tasks = [
        { id: 't1', label: 'Review this week\'s bookings', status: 'Pending' },
        { id: 't2', label: 'Approve engagement draft for latest lead', status: 'Pending' },
        { id: 't3', label: 'Prepare onboarding packet', status: 'Queued' },
        ...bookings.slice(0, 3).map(b => ({ id: b.id, label: `Prepare engagement letter for ${b.name}`, status: 'Pending' }))
    ];

    // Alerts (mock)
    const alerts = [
        { id: 'a1', type: 'Payment', text: 'Consult fee pending (placeholder)', severity: 'info' },
        { id: 'a2', type: 'Signature', text: 'Engagement letter not sent for 2 new leads', severity: 'warn' }
    ];

    // Global Timeline (mock from bookings)
    const timeline = bookings
        .map(b => ({ time: b.createdAt, text: `New booking: ${b.name} — ${b.pkg}` }))
        .sort((a, b) => Date.parse(b.time || '') - Date.parse(a.time || ''))
        .slice(0, 10);

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-greeting">{greeting}, {userName}</h1>
                <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                    Your Liberation Journey: <strong style={{ color: 'var(--primary)' }}>{journeyStage}</strong>
                </p>
            </div>

            {/* Liberation Journey Visual */}
            <div style={{ 
                background: 'var(--card-bg)', 
                borderRadius: '12px', 
                padding: '24px',
                marginBottom: '24px',
                boxShadow: 'var(--shadow)'
            }}>
                <h2 style={{ fontSize: '18px', marginBottom: '20px' }}>Your Financial Liberation Journey</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                    {journeyProgress.map((stage, index) => (
                        <div key={stage.stage} style={{ flex: 1 }}>
                            <div style={{ 
                                height: '8px', 
                                background: '#e5e7eb',
                                borderRadius: '4px',
                                overflow: 'hidden'
                            }}>
                                <div style={{
                                    width: `${stage.completed}%`,
                                    height: '100%',
                                    background: stage.color,
                                    transition: 'width 0.3s ease'
                                }}/>
                            </div>
                            <p style={{ 
                                fontSize: '11px', 
                                marginTop: '8px',
                                textAlign: 'center',
                                color: stage.stage === journeyStage ? 'var(--primary)' : 'var(--text-secondary)'
                            }}>
                                {stage.stage}
                            </p>
                        </div>
                    ))}
                </div>
                
                {/* Key Metrics Row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                    <div style={{ textAlign: 'center', padding: '16px', background: 'var(--bg)', borderRadius: '8px' }}>
                        <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--primary)' }}>
                            {liberationScore}%
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Liberation Score</div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '16px', background: 'var(--bg)', borderRadius: '8px' }}>
                        <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#22c55e' }}>
                            {selfMasteryScore}%
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Self-Mastery Score</div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '16px', background: 'var(--bg)', borderRadius: '8px' }}>
                        <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f59e0b' }}>
                            7/9
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Modules Optimized</div>
                    </div>
                </div>
            </div>

            {/* Admin KPIs */}
            <div className="summary-row" style={{ marginBottom: '24px' }}>
                <div className="summary-card">
                    <div className="summary-label">Total Leads</div>
                    <div className="summary-value">{kpiTotalLeads}</div>
                </div>
                <div className="summary-card">
                    <div className="summary-label">Booked</div>
                    <div className="summary-value">{kpiBooked}</div>
                </div>
                <div className="summary-card">
                    <div className="summary-label">Signed</div>
                    <div className="summary-value">{kpiSigned}</div>
                </div>
                <div className="summary-card">
                    <div className="summary-label">New (7d)</div>
                    <div className="summary-value">{kpiNewThisWeek}</div>
                </div>
            </div>

            <div className="dashboard-grid">
                {/* Module Scores */}
                <div className="dashboard-left">
                    <div className="chart-card">
                        <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Module Health Scores</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {moduleScores.map(module => (
                                <div key={module.name} style={{ 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    padding: '12px',
                                    background: 'var(--bg)',
                                    borderRadius: '8px',
                                    border: '1px solid var(--border)'
                                }}>
                                    <div style={{ 
                                        width: '8px', 
                                        height: '8px', 
                                        borderRadius: '50%',
                                        background: getStatusColor(module.status),
                                        marginRight: '12px'
                                    }}/>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: '500' }}>{module.name}</div>
                                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                                            {module.description}
                                        </div>
                                    </div>
                                    <div style={{ 
                                        fontSize: '18px', 
                                        fontWeight: 'bold',
                                        color: getStatusColor(module.status)
                                    }}>
                                        {module.score}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Liberation Trend Chart */}
                    <div className="chart-card" style={{ marginTop: '20px' }}>
                        <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Liberation Score Trend</h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={liberationTrend}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                                <XAxis dataKey="month" stroke="var(--text-secondary)" />
                                <YAxis stroke="var(--text-secondary)" />
                                <Tooltip 
                                    contentStyle={{ 
                                        background: 'var(--card-bg)', 
                                        border: '1px solid var(--border)',
                                        borderRadius: '8px'
                                    }}
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="score" 
                                    stroke="var(--primary)" 
                                    strokeWidth={2}
                                    dot={{ fill: 'var(--primary)' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="dashboard-right">
                    {/* Alerts */}
                    <div className="module-card">
                        <h3 className="section-title">Alerts</h3>
                        <ul style={{ listStyle: 'none', padding: 0, marginTop: 12 }}>
                            {alerts.map(a => (
                                <li key={a.id} style={{ padding: '8px 0', borderBottom: '1px solid var(--border-light)' }}>
                                    <strong>{a.type}:</strong> {a.text}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tasks */}
                    <div className="module-card" style={{ marginTop: '20px' }}>
                        <h3 className="section-title">Tasks</h3>
                        <ul style={{ listStyle: 'none', padding: 0, marginTop: 12 }}>
                            {tasks.map(t => (
                                <li key={t.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-light)' }}>
                                    <span>{t.label}</span>
                                    <span className="status-badge pending">{t.status}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Money Dysmorphia Assessment */}
                    <div className="chart-card">
                        <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Money Dysmorphia Indicators</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {Object.entries(dysmorphiaIndicators).map(([key, value]) => (
                                <div key={key}>
                                    <div style={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between',
                                        marginBottom: '4px'
                                    }}>
                                        <span style={{ fontSize: '14px', textTransform: 'capitalize' }}>
                                            {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </span>
                                        <span style={{ 
                                            fontSize: '14px', 
                                            fontWeight: 'bold',
                                            color: value > 50 ? '#ef4444' : value > 30 ? '#f59e0b' : '#22c55e'
                                        }}>
                                            {value}%
                                        </span>
                                    </div>
                                    <div style={{ 
                                        height: '6px', 
                                        background: '#e5e7eb',
                                        borderRadius: '3px',
                                        overflow: 'hidden'
                                    }}>
                                        <div style={{
                                            width: `${value}%`,
                                            height: '100%',
                                            background: value > 50 ? '#ef4444' : value > 30 ? '#f59e0b' : '#22c55e',
                                            transition: 'width 0.3s ease'
                                        }}/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Values Alignment */}
                    <div className="chart-card" style={{ marginTop: '20px' }}>
                        <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Values Alignment</h3>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ 
                                width: '120px', 
                                height: '120px',
                                margin: '0 auto 16px',
                                position: 'relative'
                            }}>
                                <svg width="120" height="120">
                                    <circle
                                        cx="60"
                                        cy="60"
                                        r="50"
                                        fill="none"
                                        stroke="#e5e7eb"
                                        strokeWidth="10"
                                    />
                                    <circle
                                        cx="60"
                                        cy="60"
                                        r="50"
                                        fill="none"
                                        stroke="var(--primary)"
                                        strokeWidth="10"
                                        strokeDasharray={`${2 * Math.PI * 50 * 0.78} ${2 * Math.PI * 50}`}
                                        strokeDashoffset="0"
                                        transform="rotate(-90 60 60)"
                                    />
                                </svg>
                                <div style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    fontSize: '24px',
                                    fontWeight: 'bold'
                                }}>
                                    78%
                                </div>
                            </div>
                            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                                Your financial decisions align well with your stated values
                            </p>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="chart-card" style={{ marginTop: '20px' }}>
                        <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>Recommended Actions</h3>
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
                                Complete Money Map Assessment
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
                                Review Crypto Tax Strategy
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
                                Update Cash Flow Forecast
                            </button>
                        </div>
                    </div>

                    {/* Global Timeline */}
                    <div className="module-card" style={{ marginTop: '20px' }}>
                        <h3 className="section-title">Global Timeline</h3>
                        <ul style={{ listStyle: 'none', padding: 0, marginTop: 12 }}>
                            {timeline.map((e, idx) => (
                                <li key={idx} style={{ padding: '8px 0', borderBottom: '1px solid var(--border-light)' }}>
                                    <div style={{ fontSize: 13 }}>{e.text}</div>
                                    <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{e.time ? new Date(e.time).toLocaleString() : ''}</div>
                                </li>
                            ))}
                            {timeline.length === 0 && (
                                <li style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>No recent activity.</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Platform; 