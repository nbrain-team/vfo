import React, { useState } from 'react';
import ModuleTemplate from './ModuleTemplate';
import DocumentChat from '../DocumentChat';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AgentIQ: React.FC = () => {
    const [activeTab, setActiveTab] = useState('overview');
    
    // Mock data for agents
    const agents = [
        { id: 1, name: 'Legal Advisor', type: 'Legal', status: 'Active', queries: 156, accuracy: 94 },
        { id: 2, name: 'Tax Strategist', type: 'Tax', status: 'Active', queries: 89, accuracy: 91 },
        { id: 3, name: 'Investment Analyst', type: 'Financial', status: 'Active', queries: 234, accuracy: 96 },
        { id: 4, name: 'Compliance Monitor', type: 'Compliance', status: 'Training', queries: 45, accuracy: 88 },
    ];

    const queryData = [
        { day: 'Mon', queries: 45 },
        { day: 'Tue', queries: 52 },
        { day: 'Wed', queries: 48 },
        { day: 'Thu', queries: 70 },
        { day: 'Fri', queries: 61 },
        { day: 'Sat', queries: 30 },
        { day: 'Sun', queries: 25 },
    ];

    const topicData = [
        { name: 'Legal', value: 35, fill: '#0066ff' },
        { name: 'Tax', value: 25, fill: '#28a745' },
        { name: 'Investment', value: 30, fill: '#ffc107' },
        { name: 'Compliance', value: 10, fill: '#dc3545' },
    ];

    return (
        <ModuleTemplate 
            title="agentIQ" 
            description="AI-powered intelligent agents for automated document analysis and insights"
        >
            {/* Tabs */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
                {['overview', 'agents', 'chat', 'analytics'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`time-button ${activeTab === tab ? 'active' : ''}`}
                        style={{ padding: '10px 20px', textTransform: 'capitalize' }}
                    >
                        {tab === 'overview' && '📊 Overview'}
                        {tab === 'agents' && '🤖 Agents'}
                        {tab === 'chat' && '💬 Chat'}
                        {tab === 'analytics' && '📈 Analytics'}
                    </button>
                ))}
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
                <>
                    <div className="summary-row">
                        <div className="summary-card">
                            <div className="summary-label">Active Agents</div>
                            <div className="summary-value">4</div>
                            <div className="summary-change positive">All operational</div>
                        </div>
                        <div className="summary-card">
                            <div className="summary-label">Total Queries</div>
                            <div className="summary-value">524</div>
                            <div className="summary-change positive">+23% this week</div>
                        </div>
                        <div className="summary-card">
                            <div className="summary-label">Avg Response Time</div>
                            <div className="summary-value">1.2s</div>
                            <div className="summary-change positive">-15% improved</div>
                        </div>
                        <div className="summary-card">
                            <div className="summary-label">Accuracy Rate</div>
                            <div className="summary-value">92.3%</div>
                            <div className="summary-change">Above target</div>
                        </div>
                    </div>

                    <div className="module-grid">
                        <div className="module-card">
                            <h3 className="section-title">Weekly Query Volume</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={queryData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="day" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="queries" fill="#0066ff" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="module-card">
                            <h3 className="section-title">Query Distribution by Topic</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={topicData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={(entry: any) => `${entry.name}: ${entry.value}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {topicData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </>
            )}

            {/* Agents Tab */}
            {activeTab === 'agents' && (
                <div className="module-card">
                    <h3 className="section-title">AI Agent Management</h3>
                    <div className="table-container" style={{ marginTop: '20px' }}>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Agent Name</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Queries Handled</th>
                                    <th>Accuracy</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {agents.map(agent => (
                                    <tr key={agent.id}>
                                        <td style={{ fontWeight: '500' }}>{agent.name}</td>
                                        <td>{agent.type}</td>
                                        <td>
                                            <span className={`status-badge ${agent.status === 'Active' ? 'active' : 'pending'}`}>
                                                {agent.status}
                                            </span>
                                        </td>
                                        <td>{agent.queries}</td>
                                        <td>
                                            <span className={`performance ${agent.accuracy >= 90 ? 'positive' : ''}`}>
                                                {agent.accuracy}%
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                style={{
                                                    padding: '4px 8px',
                                                    fontSize: '12px',
                                                    backgroundColor: 'var(--primary)',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: 'var(--radius)',
                                                    cursor: 'pointer',
                                                    marginRight: '8px'
                                                }}
                                            >
                                                Configure
                                            </button>
                                            <button
                                                style={{
                                                    padding: '4px 8px',
                                                    fontSize: '12px',
                                                    backgroundColor: 'var(--gray-light)',
                                                    color: 'var(--text-primary)',
                                                    border: '1px solid var(--border)',
                                                    borderRadius: 'var(--radius)',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                View Logs
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div style={{ marginTop: '30px' }}>
                        <button className="form-button" style={{ width: 'auto', padding: '10px 20px' }}>
                            + Create New Agent
                        </button>
                    </div>
                </div>
            )}

            {/* Chat Tab */}
            {activeTab === 'chat' && (
                <div className="module-card" style={{ padding: '20px' }}>
                    <h3 className="section-title">AI Assistant Chat</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '14px' }}>
                        Chat with your AI agents to get insights across all your data and documents. 
                        Our agents use GPT-4o to provide intelligent, context-aware responses.
                    </p>
                    <DocumentChat 
                        contextType="general"
                    />
                </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
                <div className="module-grid">
                    <div className="module-card">
                        <h3 className="section-title">Agent Performance Metrics</h3>
                        <div style={{ marginTop: '20px' }}>
                            {agents.map(agent => (
                                <div key={agent.id} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '12px',
                                    borderBottom: '1px solid var(--border-light)'
                                }}>
                                    <div>
                                        <div style={{ fontWeight: '500', fontSize: '14px' }}>{agent.name}</div>
                                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                                            {agent.type} Agent
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '18px', fontWeight: '600', color: 'var(--primary)' }}>
                                            {agent.accuracy}%
                                        </div>
                                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                                            Accuracy
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="module-card">
                        <h3 className="section-title">Recent Agent Activity</h3>
                        <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
                            <li style={{ 
                                padding: '10px',
                                borderBottom: '1px solid var(--border-light)',
                                fontSize: '13px'
                            }}>
                                <strong>Legal Advisor:</strong> Analyzed trust document for compliance issues
                                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                                    2 minutes ago
                                </div>
                            </li>
                            <li style={{ 
                                padding: '10px',
                                borderBottom: '1px solid var(--border-light)',
                                fontSize: '13px'
                            }}>
                                <strong>Tax Strategist:</strong> Generated Q3 tax optimization report
                                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                                    15 minutes ago
                                </div>
                            </li>
                            <li style={{ 
                                padding: '10px',
                                borderBottom: '1px solid var(--border-light)',
                                fontSize: '13px'
                            }}>
                                <strong>Investment Analyst:</strong> Updated portfolio risk assessment
                                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                                    1 hour ago
                                </div>
                            </li>
                            <li style={{ 
                                padding: '10px',
                                fontSize: '13px'
                            }}>
                                <strong>Compliance Monitor:</strong> Flagged upcoming filing deadline
                                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                                    3 hours ago
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </ModuleTemplate>
    );
};

export default AgentIQ; 