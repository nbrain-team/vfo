import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis, BarChart, Bar, Cell } from 'recharts';
import { getBookings } from '../adminData';
import apiClient from '../apiClient';

// Liberation Journey Stages
const JOURNEY_STAGES = ['Obscured', 'Awakening', 'Stabilizing', 'Liberating', 'Regenerative'];

const Platform: React.FC = () => {
    const navigate = useNavigate();
    let userName = localStorage.getItem('user_name') || 'Matt';
    if (userName === 'wyoming-client') userName = 'Matt';
    const currentHour = new Date().getHours();
    const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';
    
    // Mock user journey data
    const [journeyStage] = useState('Stabilizing');
    const [liberationScore] = useState(68);
    const [selfMasteryScore] = useState(72);
    
    // KPI time period toggle
    const [kpiPeriod, setKpiPeriod] = useState<'month' | 'inception'>('month');
    const [pipelineStats, setPipelineStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    
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

    // Admin KPIs from mock bookings and backend
    const [bookingsState, setBookingsState] = useState(getBookings());
    useEffect(() => {
        const handler = () => setBookingsState(getBookings());
        window.addEventListener('bookings-updated', handler as EventListener);
        return () => window.removeEventListener('bookings-updated', handler as EventListener);
    }, []);
    const bookings = useMemo(() => bookingsState, [bookingsState]);
    
    // Fetch pipeline stats from backend
    useEffect(() => {
        const fetchPipelineStats = async () => {
            try {
                const response = await apiClient.get(`/pipeline/stats?period=${kpiPeriod}`);
                setPipelineStats(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch pipeline stats:', error);
                setLoading(false);
            }
        };
        fetchPipelineStats();
    }, [kpiPeriod]);
    
    // Calculate KPIs based on period
    const now = Date.now();
    const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
    const filteredBookings = kpiPeriod === 'month' 
        ? bookings.filter(b => {
            const ts = Date.parse(b.createdAt || '');
            return !isNaN(ts) && (now - ts) < thirtyDaysMs;
          })
        : bookings;
    
    // KPI calculations - use backend data if available, fallback to mock
    const kpiLeads = pipelineStats?.leads ?? filteredBookings.filter(b => b.stage === 'New').length;
    const kpiBooked = pipelineStats?.booked ?? filteredBookings.filter(b => b.stage === 'Booked' || b.stage === 'Paid').length;
    const kpiShowed = pipelineStats?.showed ?? filteredBookings.filter(b => ['Signed', 'Onboarding', 'Completed'].includes(b.stage)).length;
    const kpiSigned = pipelineStats?.signed ?? filteredBookings.filter(b => b.stage === 'Signed' || b.stage === 'Completed').length;
    const kpiMattersInProcess = pipelineStats?.matters_in_process ?? filteredBookings.filter(b => b.stage === 'Onboarding').length;
    
    // Calculate show up ratio and average $ per matter
    const showUpRatio = pipelineStats?.show_up_ratio ?? (kpiBooked > 0 ? Math.min(100, Math.round((kpiShowed / kpiBooked) * 100)) : 0);
    const avgDollarPerMatter = pipelineStats?.avg_dollar_per_matter ?? (kpiSigned > 0 ? 18500 : 0); // $18,500 per WYDAPT matter
    
    const kpiTotalLeads = bookings.length;
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

            

            {/* KPI Toggle */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px', gap: '8px' }}>
                <button 
                    onClick={() => setKpiPeriod('month')}
                    style={{
                        padding: '6px 16px',
                        background: kpiPeriod === 'month' ? 'var(--primary)' : 'var(--background-secondary)',
                        color: kpiPeriod === 'month' ? 'white' : 'var(--text-primary)',
                        border: '1px solid var(--border)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px'
                    }}
                >
                    Month to Date
                </button>
                <button 
                    onClick={() => setKpiPeriod('inception')}
                    style={{
                        padding: '6px 16px',
                        background: kpiPeriod === 'inception' ? 'var(--primary)' : 'var(--background-secondary)',
                        color: kpiPeriod === 'inception' ? 'white' : 'var(--text-primary)',
                        border: '1px solid var(--border)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px'
                    }}
                >
                    Inception to Date
                </button>
            </div>

            {/* Admin KPIs */}
            <div className="summary-row" style={{ marginBottom: '24px', display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px' }}>
                <div className="summary-card">
                    <div className="summary-label">Leads</div>
                    <div className="summary-value">{kpiLeads}</div>
                </div>
                <div className="summary-card">
                    <div className="summary-label">Booked</div>
                    <div className="summary-value">{kpiBooked}</div>
                </div>
                <div className="summary-card">
                    <div className="summary-label">Show up Ratio</div>
                    <div className="summary-value">{showUpRatio}%</div>
                </div>
                <div className="summary-card">
                    <div className="summary-label">Signed</div>
                    <div className="summary-value">{kpiSigned}</div>
                </div>
                <div className="summary-card">
                    <div className="summary-label">Avg $ per Matter</div>
                    <div className="summary-value">${avgDollarPerMatter.toLocaleString()}</div>
                </div>
                <div className="summary-card success">
                    <div className="summary-label">Matters In Process</div>
                    <div className="summary-value">{kpiMattersInProcess}</div>
                </div>
            </div>

            {/* Pipeline Widget */}
            <div className="module-card" style={{ marginBottom: '20px' }}>
                <h3 className="section-title">LIFTed Advisor Pipeline</h3>
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    marginTop: '16px',
                    position: 'relative',
                    padding: '0 20px'
                }}>
                    {/* Pipeline stages */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '40px',
                        right: '40px',
                        height: '4px',
                        background: 'var(--border-light)',
                        transform: 'translateY(-50%)',
                        zIndex: 0
                    }}></div>
                    
                    {[
                        { name: 'Booked Consults', count: pipelineStats?.pipeline_stages?.['Booked Consults'] ?? bookings.filter(b => b.stage === 'Booked' || b.stage === 'Paid').length, color: '#3C4630' },
                        { name: 'Pre-Engagement', count: pipelineStats?.pipeline_stages?.['Pre-Engagement'] ?? bookings.filter(b => b.stage === 'New').length, color: '#C07C3D' },
                        { name: 'Engaged', count: pipelineStats?.pipeline_stages?.['Engaged'] ?? bookings.filter(b => b.stage === 'Signed').length, color: '#DCA85E' },
                        { name: 'Questionnaire Received', count: pipelineStats?.pipeline_stages?.['Questionnaire Received'] ?? 0, color: '#E9EDE4' },
                        { name: 'Matter in Process', count: pipelineStats?.pipeline_stages?.['Matter in Process'] ?? bookings.filter(b => b.stage === 'Onboarding').length, color: '#22c55e' },
                        { name: 'Matter Fulfilled', count: pipelineStats?.pipeline_stages?.['Matter Fulfilled'] ?? bookings.filter(b => b.stage === 'Completed').length, color: '#44ffff' }
                    ].map((stage, index) => (
                        <div key={stage.name} style={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center',
                            flex: 1,
                            zIndex: 1
                        }}
                        onClick={() => navigate('/admin/crm')}
                        >
                            <div style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                background: stage.color,
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                fontSize: '18px',
                                marginBottom: '8px',
                                border: '3px solid white',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                cursor: 'pointer'
                            }}>
                                {stage.count}
                            </div>
                            <div style={{ 
                                fontSize: '12px', 
                                textAlign: 'center',
                                color: 'var(--text-secondary)',
                                maxWidth: '80px'
                            }}>
                                {stage.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="module-card">
                    <h3 className="section-title">Advisor Daily Brief</h3>
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
                    <h3 className="section-title">KPIs</h3>
                    <div style={{ marginTop: 12 }}>
                        <div style={{ padding: '8px 0', borderBottom: '1px solid var(--border-light)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: 13 }}>Conversion Rate</span>
                                <span style={{ fontSize: 14, fontWeight: 'bold', color: '#22c55e' }}>
                                    {kpiBooked > 0 ? Math.round((kpiSigned / kpiBooked) * 100) : 0}%
                                </span>
                            </div>
                        </div>
                        <div style={{ padding: '8px 0', borderBottom: '1px solid var(--border-light)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: 13 }}>Active Matters</span>
                                <span style={{ fontSize: 14, fontWeight: 'bold' }}>{kpiSigned}</span>
                            </div>
                        </div>
                        <div style={{ padding: '8px 0', borderBottom: '1px solid var(--border-light)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: 13 }}>Weekly Growth</span>
                                <span style={{ fontSize: 14, fontWeight: 'bold', color: '#f59e0b' }}>+{kpiNewThisWeek}</span>
                            </div>
                        </div>
                        <div style={{ padding: '8px 0' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: 13 }}>Client Satisfaction</span>
                                <span style={{ fontSize: 14, fontWeight: 'bold', color: '#22c55e' }}>98%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="module-card">
                    <h3 className="section-title">Current Site Preview</h3>
                    <div style={{ marginTop: 12, position: 'relative', cursor: 'pointer' }} onClick={() => window.location.href = '/admin/sitebuilder'}>
                        <div style={{ 
                            width: '100%', 
                            height: '200px', 
                            background: 'linear-gradient(135deg, #0B3617 0%, #0F5223 100%)', 
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            border: '1px solid var(--border)'
                        }}>
                            <div style={{ textAlign: 'center', color: 'white' }}>
                                <h2 style={{ fontSize: '18px', marginBottom: '8px' }}>Your Professional Site</h2>
                                <p style={{ fontSize: '12px', opacity: 0.8 }}>Click to edit in Site Builder</p>
                            </div>
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '8px', textAlign: 'center' }}>
                            Live preview of your current website
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Platform; 