import React, { useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis, BarChart, Bar, Cell } from 'recharts';
import { getBookings } from '../adminData';

// Liberation Journey Stages
const JOURNEY_STAGES = ['Obscured', 'Awakening', 'Stabilizing', 'Liberating', 'Regenerative'];

const Platform: React.FC = () => {
    let userName = localStorage.getItem('user_name') || 'Matt';
    if (userName === 'wyoming-client') userName = 'Matt';
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

    // Next 24 hours appointments
    const next24 = bookings.filter(b => {
        const ts = Date.parse(b.appointmentAt || '');
        return !isNaN(ts) && ts > now && ts < now + 24 * 60 * 60 * 1000;
    }).sort((a, b) => Date.parse(a.appointmentAt || '') - Date.parse(b.appointmentAt || ''));

    // Top Opportunities (simple heuristic: stage not Signed/Completed, sorted by createdAt)
    const topOpps = bookings
        .filter(b => b.stage !== 'Signed' && b.stage !== 'Completed')
        .sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt))
        .slice(0, 5);

    // Analytics graph (mock)
    const analytics = [
        { month: 'Jan', traffic: 1200, booked: 8, revenue: 1500 },
        { month: 'Feb', traffic: 1400, booked: 10, revenue: 1875 },
        { month: 'Mar', traffic: 1800, booked: 13, revenue: 2430 },
        { month: 'Apr', traffic: 2100, booked: 15, revenue: 2810 },
        { month: 'May', traffic: 2500, booked: 18, revenue: 3375 },
        { month: 'Jun', traffic: 2700, booked: 20, revenue: 3750 },
        { month: 'Jul', traffic: 3000, booked: 24, revenue: 4520 }
    ];

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-greeting">{greeting}, {userName}</h1>
                
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="module-card">
                    <h3 className="section-title">Executive Daily Brief</h3>
                    <ul style={{ listStyle: 'none', padding: 0, marginTop: 12 }}>
                        <li style={{ padding: '8px 0', borderBottom: '1px solid var(--border-light)' }}>2 consults scheduled today</li>
                        <li style={{ padding: '8px 0', borderBottom: '1px solid var(--border-light)' }}>1 engagement draft pending approval</li>
                        <li style={{ padding: '8px 0' }}>Nurture “Lead → Paid Consult” active</li>
                    </ul>
                </div>

                <div className="module-card">
                    <h3 className="section-title">Next 24 Hours of Appointments</h3>
                    <ul style={{ listStyle: 'none', padding: 0, marginTop: 12 }}>
                        {next24.map(ev => (
                            <li key={ev.id} style={{ padding: '8px 0', borderBottom: '1px solid var(--border-light)' }}>
                                <div style={{ fontSize: 13 }}><strong>{ev.name}</strong> — {ev.pkg}</div>
                                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{ev.slot} ({new Date(ev.appointmentAt || '').toLocaleString()})</div>
                            </li>
                        ))}
                        {next24.length === 0 && (
                            <li style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>No upcoming appointments.</li>
                        )}
                    </ul>
                </div>

                <div className="module-card">
                    <h3 className="section-title">Important Tasks</h3>
                    <ul style={{ listStyle: 'none', padding: 0, marginTop: 12 }}>
                        {tasks.map(t => (
                            <li key={t.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-light)' }}>
                                <span>{t.label}</span>
                                <span className="status-badge pending">{t.status}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="module-card">
                    <h3 className="section-title">Closing Soon</h3>
                    <ul style={{ listStyle: 'none', padding: 0, marginTop: 12 }}>
                        {topOpps.map(op => (
                            <li key={op.id} style={{ padding: '8px 0', borderBottom: '1px solid var(--border-light)' }}>
                                <div style={{ fontSize: 13 }}><strong>{op.name}</strong> — {op.pkg}</div>
                                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Stage: {op.stage}</div>
                            </li>
                        ))}
                        {topOpps.length === 0 && (
                            <li style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>No current opportunities.</li>
                        )}
                    </ul>
                </div>

                <div className="module-card" style={{ gridColumn: '1 / -1' }}>
                    <h3 className="section-title">Website & Funnel Analytics</h3>
                    <ResponsiveContainer width="100%" height={260}>
                        <LineChart data={analytics}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                            <XAxis dataKey="month" stroke="var(--text-secondary)" />
                            <YAxis stroke="var(--text-secondary)" />
                            <Tooltip contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '8px' }} />
                            <Line type="monotone" dataKey="traffic" stroke="var(--primary)" strokeWidth={2} name="Site Traffic" />
                            <Line type="monotone" dataKey="booked" stroke="#C07C3D" strokeWidth={2} name="Booked Leads" />
                            <Line type="monotone" dataKey="revenue" stroke="#DCA85E" strokeWidth={2} name="Closed Deals ($)" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

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

                <div className="module-card">
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
    );
};

export default Platform; 