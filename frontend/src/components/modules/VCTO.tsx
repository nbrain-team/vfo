import React, { useState } from 'react';
import ModuleBase from './ModuleBase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';

const VCTO: React.FC = () => {
    const [activeTab, setActiveTab] = useState('overview');
    
    // Mock data
    const moduleScore = {
        overall: 88,
        status: 'green' as const,
        lastUpdated: '2024-08-08',
        subScores: {
            automation: 92,
            integration: 85,
            aiUtilization: 90,
            efficiency: 83
        }
    };

    const alerts = [
        { type: 'info' as const, message: 'New AI model GPT-4o-mini available for cost optimization' },
        { type: 'warning' as const, message: 'API rate limit approaching for OpenAI - 85% utilized' },
        { type: 'info' as const, message: '3 automation workflows completed successfully today' }
    ];

    // AI Agents
    const aiAgents = [
        {
            name: 'Tax Optimizer',
            type: 'Financial Analysis',
            model: 'GPT-4o',
            status: 'Active',
            tasksCompleted: 156,
            accuracy: 94,
            lastRun: '2 hours ago',
            description: 'Analyzes tax strategies and identifies optimization opportunities'
        },
        {
            name: 'Document Analyzer',
            type: 'Legal Review',
            model: 'Claude 3.5',
            status: 'Active',
            tasksCompleted: 89,
            accuracy: 96,
            lastRun: '1 hour ago',
            description: 'Extracts key terms and risks from legal documents'
        },
        {
            name: 'Investment Scout',
            type: 'Market Research',
            model: 'GPT-4o',
            status: 'Active',
            tasksCompleted: 234,
            accuracy: 88,
            lastRun: '30 min ago',
            description: 'Identifies investment opportunities based on your criteria'
        },
        {
            name: 'Expense Classifier',
            type: 'Bookkeeping',
            model: 'GPT-3.5',
            status: 'Training',
            tasksCompleted: 45,
            accuracy: 82,
            lastRun: '1 day ago',
            description: 'Automatically categorizes and tags financial transactions'
        },
        {
            name: 'Risk Monitor',
            type: 'Compliance',
            model: 'GPT-4o',
            status: 'Active',
            tasksCompleted: 178,
            accuracy: 91,
            lastRun: '15 min ago',
            description: 'Monitors portfolio and alerts on risk threshold breaches'
        }
    ];

    // Automation Workflows
    const workflows = [
        {
            name: 'Monthly Financial Report',
            trigger: 'Schedule (1st of month)',
            actions: 5,
            lastRun: '2024-08-01',
            nextRun: '2024-09-01',
            status: 'Scheduled',
            saves: '4 hours/month'
        },
        {
            name: 'Document Classification',
            trigger: 'On Upload',
            actions: 3,
            lastRun: '2024-08-08',
            nextRun: 'On Trigger',
            status: 'Active',
            saves: '2 hours/week'
        },
        {
            name: 'Tax Loss Harvesting',
            trigger: 'Market Conditions',
            actions: 7,
            lastRun: '2024-07-28',
            nextRun: 'When Triggered',
            status: 'Monitoring',
            saves: '$12K/year'
        },
        {
            name: 'Compliance Check',
            trigger: 'Weekly',
            actions: 4,
            lastRun: '2024-08-05',
            nextRun: '2024-08-12',
            status: 'Scheduled',
            saves: '3 hours/week'
        }
    ];

    // API Usage
    const apiUsage = [
        { service: 'OpenAI GPT-4o', calls: 12500, limit: 15000, cost: 125, status: 'Normal' },
        { service: 'Claude 3.5', calls: 3200, limit: 5000, cost: 48, status: 'Normal' },
        { service: 'Pinecone Vector DB', calls: 8900, limit: 10000, cost: 15, status: 'Normal' },
        { service: 'Document OCR', calls: 450, limit: 1000, cost: 22, status: 'Normal' },
        { service: 'Market Data API', calls: 28000, limit: 30000, cost: 85, status: 'Warning' }
    ];

    // Performance metrics
    const performanceData = [
        { month: 'Feb', tasks: 450, accuracy: 88, cost: 220 },
        { month: 'Mar', tasks: 520, accuracy: 89, cost: 245 },
        { month: 'Apr', tasks: 580, accuracy: 91, cost: 260 },
        { month: 'May', tasks: 650, accuracy: 92, cost: 280 },
        { month: 'Jun', tasks: 720, accuracy: 93, cost: 295 },
        { month: 'Jul', tasks: 810, accuracy: 94, cost: 310 },
        { month: 'Aug', tasks: 524, accuracy: 94, cost: 295 }
    ];

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'Active': return '#22c55e';
            case 'Scheduled': return '#3b82f6';
            case 'Training': return '#f59e0b';
            case 'Monitoring': return '#8b5cf6';
            case 'Normal': return '#22c55e';
            case 'Warning': return '#f59e0b';
            default: return '#94a3b8';
        }
    };

    const renderOverview = () => (
        <div className="dashboard-grid">
            <div className="dashboard-left">
                {/* AI Agents List */}
                <div className="chart-card">
                    <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>AI Agents</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {aiAgents.map(agent => (
                            <div key={agent.name} style={{
                                padding: '12px',
                                background: 'var(--bg)',
                                borderRadius: '8px',
                                border: '1px solid var(--border)'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <div>
                                        <div style={{ fontWeight: 'bold' }}>{agent.name}</div>
                                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                                            {agent.type} • {agent.model}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <span style={{
                                            padding: '2px 8px',
                                            background: getStatusColor(agent.status) + '15',
                                            color: getStatusColor(agent.status),
                                            borderRadius: '4px',
                                            fontSize: '11px'
                                        }}>
                                            {agent.status}
                                        </span>
                                        <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                                            {agent.lastRun}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                                    {agent.description}
                                </div>
                                <div style={{ display: 'flex', gap: '16px', fontSize: '11px' }}>
                                    <span>Tasks: <strong>{agent.tasksCompleted}</strong></span>
                                    <span>Accuracy: <strong style={{ color: agent.accuracy >= 90 ? '#22c55e' : '#f59e0b' }}>
                                        {agent.accuracy}%
                                    </strong></span>
                                    <button style={{
                                        marginLeft: 'auto',
                                        padding: '2px 8px',
                                        background: 'var(--primary)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontSize: '10px'
                                    }}>
                                        Configure
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Performance Chart */}
                <div className="chart-card" style={{ marginTop: '20px' }}>
                    <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>AI Performance Metrics</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={performanceData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                            <XAxis dataKey="month" stroke="var(--text-secondary)" />
                            <YAxis yAxisId="left" stroke="var(--text-secondary)" />
                            <YAxis yAxisId="right" orientation="right" stroke="var(--text-secondary)" />
                            <Tooltip 
                                contentStyle={{ 
                                    background: 'var(--card-bg)', 
                                    border: '1px solid var(--border)',
                                    borderRadius: '8px'
                                }}
                            />
                            <Line yAxisId="left" type="monotone" dataKey="tasks" stroke="#3b82f6" strokeWidth={2} name="Tasks" />
                            <Line yAxisId="right" type="monotone" dataKey="accuracy" stroke="#22c55e" strokeWidth={2} name="Accuracy %" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="dashboard-right">
                {/* Key Metrics */}
                <div className="chart-card">
                    <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>AI Operations Summary</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div style={{ padding: '12px', background: 'var(--bg)', borderRadius: '8px' }}>
                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Active Agents</div>
                            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>4/5</div>
                        </div>
                        <div style={{ padding: '12px', background: 'var(--bg)', borderRadius: '8px' }}>
                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Tasks Today</div>
                            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>127</div>
                        </div>
                        <div style={{ padding: '12px', background: 'var(--bg)', borderRadius: '8px' }}>
                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Avg Accuracy</div>
                            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#22c55e' }}>92%</div>
                        </div>
                        <div style={{ padding: '12px', background: 'var(--bg)', borderRadius: '8px' }}>
                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Monthly Cost</div>
                            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>$295</div>
                        </div>
                    </div>
                </div>

                {/* Time Savings */}
                <div className="chart-card" style={{ marginTop: '20px' }}>
                    <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Automation Impact</h3>
                    <div style={{
                        padding: '16px',
                        background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                        borderRadius: '8px',
                        color: 'white',
                        marginBottom: '16px'
                    }}>
                        <div style={{ fontSize: '12px', opacity: 0.9 }}>Time Saved This Month</div>
                        <div style={{ fontSize: '28px', fontWeight: 'bold', margin: '4px 0' }}>
                            47 Hours
                        </div>
                        <div style={{ fontSize: '12px', opacity: 0.9 }}>
                            Equivalent to $9,400 in productivity
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                            <span>Document Processing</span>
                            <strong>18 hrs</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                            <span>Financial Analysis</span>
                            <strong>12 hrs</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                            <span>Report Generation</span>
                            <strong>9 hrs</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                            <span>Data Entry</span>
                            <strong>8 hrs</strong>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="chart-card" style={{ marginTop: '20px' }}>
                    <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>Quick Actions</h3>
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
                            + Create New Agent
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
                            Build Workflow
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
                            View API Dashboard
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderWorkflows = () => (
        <div className="chart-card">
            <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Automation Workflows</h3>
            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Workflow Name</th>
                            <th>Trigger</th>
                            <th>Actions</th>
                            <th>Next Run</th>
                            <th>Impact</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workflows.map((workflow, index) => (
                            <tr key={index}>
                                <td>{workflow.name}</td>
                                <td>{workflow.trigger}</td>
                                <td>{workflow.actions}</td>
                                <td>{workflow.nextRun}</td>
                                <td style={{ color: '#22c55e' }}>{workflow.saves}</td>
                                <td>
                                    <span style={{
                                        padding: '2px 8px',
                                        background: getStatusColor(workflow.status) + '15',
                                        color: getStatusColor(workflow.status),
                                        borderRadius: '4px',
                                        fontSize: '11px'
                                    }}>
                                        {workflow.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{ marginTop: '24px' }}>
                <h4 style={{ fontSize: '14px', marginBottom: '16px' }}>Workflow Builder</h4>
                <div style={{
                    padding: '20px',
                    background: 'var(--bg)',
                    borderRadius: '8px',
                    border: '2px dashed var(--border)',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '32px', marginBottom: '12px' }}>⚡</div>
                    <h5 style={{ marginBottom: '8px' }}>Create Custom Workflow</h5>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                        Drag and drop actions to build automated processes
                    </p>
                    <button style={{
                        padding: '8px 16px',
                        background: 'var(--primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '13px'
                    }}>
                        Open Workflow Builder
                    </button>
                </div>
            </div>
        </div>
    );

    const renderAPIs = () => (
        <div className="dashboard-grid">
            <div className="dashboard-left">
                <div className="chart-card">
                    <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>API Usage & Costs</h3>
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Service</th>
                                    <th style={{ textAlign: 'right' }}>Usage</th>
                                    <th style={{ textAlign: 'right' }}>Limit</th>
                                    <th style={{ textAlign: 'right' }}>Cost</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {apiUsage.map((api, index) => (
                                    <tr key={index}>
                                        <td>{api.service}</td>
                                        <td style={{ textAlign: 'right' }}>{api.calls.toLocaleString()}</td>
                                        <td style={{ textAlign: 'right' }}>{api.limit.toLocaleString()}</td>
                                        <td style={{ textAlign: 'right' }}>${api.cost}</td>
                                        <td>
                                            <span style={{
                                                padding: '2px 8px',
                                                background: getStatusColor(api.status) + '15',
                                                color: getStatusColor(api.status),
                                                borderRadius: '4px',
                                                fontSize: '11px'
                                            }}>
                                                {api.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr style={{ borderTop: '2px solid var(--border)' }}>
                                    <td colSpan={3}><strong>Total Monthly Cost</strong></td>
                                    <td style={{ textAlign: 'right' }}><strong>$295</strong></td>
                                    <td></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
            <div className="dashboard-right">
                <div className="chart-card">
                    <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>API Configuration</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{
                            padding: '12px',
                            background: 'var(--bg)',
                            borderRadius: '8px'
                        }}>
                            <div style={{ fontSize: '13px', fontWeight: '500', marginBottom: '8px' }}>Rate Limiting</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                                Automatically throttles requests to stay within limits
                            </div>
                            <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <input type="checkbox" checked readOnly />
                                <label style={{ fontSize: '12px' }}>Enabled</label>
                            </div>
                        </div>
                        <div style={{
                            padding: '12px',
                            background: 'var(--bg)',
                            borderRadius: '8px'
                        }}>
                            <div style={{ fontSize: '13px', fontWeight: '500', marginBottom: '8px' }}>Fallback Models</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                                Use alternative models when primary is unavailable
                            </div>
                            <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <input type="checkbox" checked readOnly />
                                <label style={{ fontSize: '12px' }}>Enabled</label>
                            </div>
                        </div>
                        <div style={{
                            padding: '12px',
                            background: 'var(--bg)',
                            borderRadius: '8px'
                        }}>
                            <div style={{ fontSize: '13px', fontWeight: '500', marginBottom: '8px' }}>Cost Optimization</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                                Automatically route to most cost-effective model
                            </div>
                            <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <input type="checkbox" checked readOnly />
                                <label style={{ fontSize: '12px' }}>Enabled</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <ModuleBase
            moduleName="vCTO"
            moduleIcon="🚀"
            description="AI agent orchestration, workflow automation, and technical strategy management"
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
                {['overview', 'workflows', 'apis', 'training'].map(tab => (
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
                        {tab === 'apis' ? 'APIs' : tab}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'workflows' && renderWorkflows()}
            {activeTab === 'apis' && renderAPIs()}
            {activeTab === 'training' && (
                <div className="chart-card">
                    <h3>Agent Training Center</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>Fine-tune and train custom AI agents for specific tasks...</p>
                </div>
            )}
        </ModuleBase>
    );
};

export default VCTO; 