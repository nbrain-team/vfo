import React from 'react';
import { useNavigate } from 'react-router-dom';

const modules = [
    {
        name: 'Dashboard',
        path: '/platform',
        icon: '📊',
        title: 'Liberation Journey Dashboard',
        description: 'Track your financial liberation journey with personalized metrics, behavioral insights, and progress visualization across all wealth dimensions.'
    },
    {
        name: 'agentIQ',
        path: '/agent',
        icon: '🤖',
        title: 'AI Agent Management',
        description: 'Deploy intelligent AI agents to automate complex financial tasks, analyze documents, and provide 24/7 intelligent assistance.'
    },
    {
        name: 'legalIQ',
        path: '/legal',
        icon: '⚖️',
        title: 'Document Intelligence',
        description: 'Secure document vault with AI-powered analysis, automated contract review, and intelligent extraction of key terms and risks.'
    },
    {
        name: 'insuranceIQ',
        path: '/insurance',
        icon: '🛡️',
        title: 'Risk Management',
        description: 'Comprehensive insurance coverage optimization with gap analysis, premium tracking, and automated policy management.'
    },
    {
        name: 'wealthIQ',
        path: '/wealth',
        icon: '💰',
        title: 'Investment Portfolio',
        description: 'Real-time portfolio tracking, performance analytics, asset allocation optimization, and goal-based financial planning.'
    },
    {
        name: 'taxIQ',
        path: '/tax',
        icon: '📋',
        title: 'Strategic Tax Planning',
        description: 'Intelligent tax optimization, real-time liability calculations, deduction maximization, and automated compliance tracking.'
    },
    {
        name: 'cryptoIQ',
        path: '/crypto',
        icon: '₿',
        title: 'Digital Asset Management',
        description: 'Multi-chain portfolio aggregation, DeFi position monitoring, tax event tracking, and protocol risk assessment.'
    },
    {
        name: 'valuesIQ',
        path: '/values',
        icon: '🎯',
        title: 'Behavioral Intelligence',
        description: 'Align financial decisions with personal values through AI-powered insights, liberation journey mapping, and values tracking.'
    },
    {
        name: 'healthIQ',
        path: '/health',
        icon: '🏥',
        title: 'Healthcare Financial Planning',
        description: 'HSA optimization, healthcare coverage analysis, preventive care tracking, and tax-advantaged health savings strategies.'
    },
    {
        name: 'vCTO',
        path: '/vcto',
        icon: '🚀',
        title: 'Virtual Chief Technology Officer',
        description: 'Build custom AI agents, create automation workflows, monitor API usage, and orchestrate your entire digital wealth ecosystem.'
    }
];

const Welcome: React.FC = () => {
    const navigate = useNavigate();
    const userName = localStorage.getItem('user_name') || 'there';
    const currentHour = new Date().getHours();
    const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';

    return (
        <div className="page-container" style={{ maxWidth: '1400px', margin: '0 auto' }}>
            {/* Hero Section */}
            <div style={{
                background: 'linear-gradient(135deg, var(--primary) 0%, #8b5cf6 100%)',
                borderRadius: '16px',
                padding: '60px 40px',
                marginBottom: '40px',
                color: 'white',
                textAlign: 'center',
                boxShadow: 'var(--shadow-lg)'
            }}>
                <h1 style={{
                    fontSize: '48px',
                    fontWeight: 'bold',
                    marginBottom: '16px',
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    {greeting}, {userName}!
                </h1>
                <p style={{
                    fontSize: '20px',
                    opacity: 0.95,
                    maxWidth: '800px',
                    margin: '0 auto',
                    lineHeight: '1.6'
                }}>
                    Welcome to your Virtual Family Office. Your comprehensive wealth management platform powered by 
                    advanced AI, designed to guide you on your journey to financial liberation.
                </p>
                <div style={{
                    marginTop: '32px',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '16px'
                }}>
                    <button
                        onClick={() => navigate('/platform')}
                        style={{
                            padding: '14px 28px',
                            background: 'white',
                            color: 'var(--primary)',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            transition: 'transform 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        View Dashboard
                    </button>
                    <button
                        onClick={() => navigate('/docs')}
                        style={{
                            padding: '14px 28px',
                            background: 'rgba(255,255,255,0.2)',
                            color: 'white',
                            border: '2px solid white',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'background 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
                        onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                    >
                        Documentation
                    </button>
                </div>
            </div>

            {/* Modules Grid */}
            <div>
                <h2 style={{
                    fontSize: '28px',
                    marginBottom: '24px',
                    textAlign: 'center',
                    color: 'var(--text)'
                }}>
                    Explore Your Wealth Management Modules
                </h2>
                
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                    gap: '24px'
                }}>
                    {modules.map((module) => (
                        <div
                            key={module.name}
                            onClick={() => navigate(module.path)}
                            style={{
                                background: 'var(--card-bg)',
                                borderRadius: '12px',
                                padding: '24px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: 'var(--shadow)',
                                border: '1px solid var(--border)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                                e.currentTarget.style.borderColor = 'var(--primary)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'var(--shadow)';
                                e.currentTarget.style.borderColor = 'var(--border)';
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                                <div style={{
                                    fontSize: '36px',
                                    width: '60px',
                                    height: '60px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'var(--bg)',
                                    borderRadius: '12px'
                                }}>
                                    {module.icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        marginBottom: '4px',
                                        color: 'var(--primary)'
                                    }}>
                                        {module.title}
                                    </h3>
                                    <p style={{
                                        fontSize: '14px',
                                        color: 'var(--text-secondary)',
                                        lineHeight: '1.5'
                                    }}>
                                        {module.description}
                                    </p>
                                </div>
                            </div>
                            
                            {/* Arrow indicator */}
                            <div style={{
                                position: 'absolute',
                                right: '24px',
                                bottom: '24px',
                                width: '24px',
                                height: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'var(--primary)',
                                borderRadius: '50%',
                                color: 'white',
                                fontSize: '14px'
                            }}>
                                →
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Stats Section */}
            <div style={{
                marginTop: '40px',
                padding: '32px',
                background: 'var(--card-bg)',
                borderRadius: '12px',
                boxShadow: 'var(--shadow)'
            }}>
                <h3 style={{
                    fontSize: '20px',
                    marginBottom: '24px',
                    textAlign: 'center'
                }}>
                    Your Platform at a Glance
                </h3>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '24px'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--primary)' }}>10</div>
                        <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Active Modules</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#22c55e' }}>94%</div>
                        <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>AI Accuracy</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f59e0b' }}>47 hrs</div>
                        <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Time Saved/Month</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#8b5cf6' }}>24/7</div>
                        <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>AI Assistance</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome; 