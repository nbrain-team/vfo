import React, { useState } from 'react';

const Profile: React.FC = () => {
    const storedUserName = localStorage.getItem('user_name') || 'User';
    const [activeTab, setActiveTab] = useState('personal');
    
    // Personal info state
    const [userName, setUserName] = useState(storedUserName);
    const [email, setEmail] = useState('user@example.com');
    const [phone, setPhone] = useState('+1 (555) 123-4567');
    const [showSaveSuccess, setShowSaveSuccess] = useState(false);
    
    const [privacyConsent, setPrivacyConsent] = useState({
        emotionalData: true,
        behavioralData: true,
        sharingData: false,
        marketingData: false
    });
    const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

    const handleSavePersonalInfo = () => {
        // Save to localStorage
        localStorage.setItem('user_name', userName);
        
        // Show success message
        setShowSaveSuccess(true);
        setTimeout(() => setShowSaveSuccess(false), 3000);
    };

    const privacyPolicyText = `LIFTed VFO – Privacy Policy and Consent for Emotional and Behavioral Data

Introduction
This Privacy Policy Addendum outlines how LIFTed VFO ("Company," "we," "our," or "us") collects, uses, stores, and protects emotional, behavioral, and values-based data provided voluntarily by users ("you," "client," or "user") in connection with our platform, tools, and services.

This addendum is supplemental to our core Privacy Policy and applies specifically to features including self-reflection tools, journaling inputs (text and voice), financial behavior tracking, and values-based assessments.

Categories of Data Collected with Consent
Subject to your explicit and revocable consent, we may collect and process the following categories of data for the purpose of enhancing your personal user experience and generating intelligent insights:

• Emotional Data: Reflections expressed via journaling tools, surveys, or other self-assessment methods, whether typed or transcribed via voice-to-text.

• Values and Intentions: Stated life priorities, value rankings, and related responses entered in onboarding questionnaires or during active use of the platform.

• Behavioral Indicators: Patterns of usage across modules, frequency of interactions, responsiveness to prompts, and other digital activity relevant to your financial behavior.

This data will be used to generate personalized scores and metrics such as the Self-Mastery Score, Liberation Journey Stage, Values Alignment Index, and indicators related to money dysmorphia risk.

Voluntary Participation and Consent
Participation in emotional and behavioral insight features is strictly voluntary. No such data will be collected or processed unless you affirmatively opt in.

By selecting the applicable consent checkbox during onboarding or within the settings of your user profile, you provide informed consent for LIFTed VFO to:
• Collect and process the data categories described above
• Use these data solely for the purpose of generating personal insights and related features
• Retain these data securely, consistent with our data retention and privacy protocols

You may withdraw your consent at any time. Upon withdrawal, any previously collected data in these categories may be deleted upon request or retained in anonymized form for platform training purposes, in accordance with our core data policy.

Use and Purpose of Data
The emotional and behavioral data collected will be used solely for the following purposes:
• To generate personalized insights, scores, and progress reports within your secure dashboard
• To inform intelligent prompts and coaching suggestions from our AI system
• To support advisor interactions, where applicable and where you grant permission
• To allow you to track your values alignment, emotional progress, and behavioral change over time

At no time will we use these data categories for advertising, resale, or third-party profiling.

Data Security and Confidentiality
All data collected under this policy is encrypted at rest and in transit. Voice-to-text journaling is processed using secure transcription methods and is not retained unless explicitly saved by the user. Access to these data is strictly limited to systems and authorized personnel supporting core user functionality.

LIFTed VFO operates on a zero-trust security model and applies role-based access controls, data minimization principles, and best-in-class cybersecurity protocols across all systems handling sensitive information.

Transparency and User Controls
Users may at any time:
• Review or download their emotional and behavioral data
• Delete any or all entries submitted through journaling or values assessments
• Adjust or withdraw consent for specific data types or modules
• Request a full report of how their data has been used

These controls are available within the platform's Privacy Center and Account Settings.

Changes to This Policy
We reserve the right to update this Privacy Policy Addendum at any time to reflect changes in platform capabilities, applicable regulations, or user preferences. Users will be notified of material changes and may be required to reconfirm consent for newly introduced data types or uses.

Contact Information
If you have questions about this addendum or your data rights, you may contact:

Data Protection Officer
LIFTed VFO Privacy Office
privacy@liftedvfo.com
858.883.7529`;

    const integrations = [
        { name: 'MonarchMoney.com', status: 'Not Connected', icon: '💰' },
        { name: 'Wealth.com', status: 'Not Connected', icon: '📊' },
        { name: 'Mint.com', status: 'Not Connected', icon: '🌿' },
        { name: 'LLCAttorney.com', status: 'Not Connected', icon: '⚖️' },
        { name: 'Altruist', status: 'Connected', icon: '🏦' },
        { name: 'SDM.co (Crypto)', status: 'Not Connected', icon: '₿' },
        { name: 'NY Life', status: 'Connected', icon: '🛡️' },
        { name: 'Plaid', status: 'Connected', icon: '🔗' }
    ];

    const renderPersonalInfo = () => (
        <div className="chart-card">
            <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Personal Information</h3>
            {showSaveSuccess && (
                <div style={{
                    padding: '12px',
                    background: '#22c55e15',
                    border: '1px solid #22c55e',
                    borderRadius: '6px',
                    marginBottom: '16px',
                    color: '#22c55e',
                    fontSize: '14px'
                }}>
                    ✓ Changes saved successfully!
                </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                    <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                        Full Name
                    </label>
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid var(--border)',
                            borderRadius: '6px',
                            background: 'var(--bg)',
                            fontSize: '14px'
                        }}
                    />
                </div>
                <div>
                    <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid var(--border)',
                            borderRadius: '6px',
                            background: 'var(--bg)',
                            fontSize: '14px'
                        }}
                    />
                </div>
                <div>
                    <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                        Phone
                    </label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid var(--border)',
                            borderRadius: '6px',
                            background: 'var(--bg)',
                            fontSize: '14px'
                        }}
                    />
                </div>
                <div>
                    <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                        Liberation Stage
                    </label>
                    <input
                        type="text"
                        value="Stabilizing"
                        disabled
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid var(--border)',
                            borderRadius: '6px',
                            background: 'var(--bg)',
                            fontSize: '14px',
                            opacity: 0.7
                        }}
                    />
                </div>
            </div>

            <div style={{ marginTop: '24px' }}>
                <button 
                    onClick={handleSavePersonalInfo}
                    style={{
                        padding: '10px 20px',
                        background: 'var(--primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        marginRight: '12px'
                    }}
                >
                    Save Changes
                </button>
                <button 
                    onClick={() => {
                        setUserName(storedUserName);
                        setEmail('user@example.com');
                        setPhone('+1 (555) 123-4567');
                    }}
                    style={{
                        padding: '10px 20px',
                        background: 'transparent',
                        color: 'var(--primary)',
                        border: '1px solid var(--primary)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px'
                    }}
                >
                    Cancel
                </button>
            </div>
        </div>
    );

    const renderPrivacy = () => (
        <div className="chart-card">
            <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Privacy & Data Consent</h3>
            
            <div style={{
                padding: '16px',
                background: 'var(--bg)',
                borderRadius: '8px',
                marginBottom: '20px'
            }}>
                <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Data Collection Preferences</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                    Control what data LIFTed VFO can collect and process to enhance your experience
                </p>
                
                {Object.entries({
                    emotionalData: 'Emotional & Behavioral Data - Journal entries, reflections, and behavioral patterns',
                    behavioralData: 'Values & Alignment Tracking - Track alignment between values and financial decisions',
                    sharingData: 'Anonymized Intelligence Sharing - Contribute to aggregated insights (optional)',
                    marketingData: 'Marketing Communications - Receive updates about new features and insights'
                }).map(([key, label]) => (
                    <div key={key} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        marginBottom: '12px',
                        padding: '12px',
                        background: 'var(--card-bg)',
                        borderRadius: '6px'
                    }}>
                        <input
                            type="checkbox"
                            checked={privacyConsent[key as keyof typeof privacyConsent]}
                            onChange={(e) => setPrivacyConsent({
                                ...privacyConsent,
                                [key]: e.target.checked
                            })}
                            style={{ marginRight: '12px', marginTop: '2px' }}
                        />
                        <label style={{ fontSize: '13px', cursor: 'pointer' }}>
                            {label}
                        </label>
                    </div>
                ))}
            </div>

            <div style={{
                padding: '16px',
                background: '#fef3c7',
                borderRadius: '8px',
                marginBottom: '20px'
            }}>
                <h4 style={{ fontSize: '14px', marginBottom: '8px', color: '#92400e' }}>
                    ⚠️ Privacy Policy Acknowledgment Required
                </h4>
                <p style={{ fontSize: '12px', color: '#92400e', marginBottom: '12px' }}>
                    Please review and acknowledge our privacy policy to continue using behavioral and emotional data features.
                </p>
                <button
                    onClick={() => setShowPrivacyPolicy(true)}
                    style={{
                        padding: '8px 16px',
                        background: '#f59e0b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '13px'
                    }}
                >
                    Review Privacy Policy
                </button>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
                <button style={{
                    padding: '10px 20px',
                    background: 'var(--primary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px'
                }}>
                    Save Preferences
                </button>
                <button style={{
                    padding: '10px 20px',
                    background: 'transparent',
                    color: '#ef4444',
                    border: '1px solid #ef4444',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px'
                }}>
                    Download My Data
                </button>
            </div>
        </div>
    );

    const renderIntegrations = () => (
        <div className="chart-card">
            <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Connected Services</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {integrations.map(integration => (
                    <div key={integration.name} style={{
                        padding: '16px',
                        background: 'var(--bg)',
                        borderRadius: '8px',
                        border: '1px solid var(--border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontSize: '24px' }}>{integration.icon}</span>
                            <div>
                                <div style={{ fontSize: '14px', fontWeight: '500' }}>{integration.name}</div>
                                <div style={{ 
                                    fontSize: '11px', 
                                    color: integration.status === 'Connected' ? '#22c55e' : 'var(--text-secondary)'
                                }}>
                                    {integration.status}
                                </div>
                            </div>
                        </div>
                        <button style={{
                            padding: '6px 12px',
                            background: integration.status === 'Connected' ? 'transparent' : 'var(--primary)',
                            color: integration.status === 'Connected' ? 'var(--text-secondary)' : 'white',
                            border: integration.status === 'Connected' ? '1px solid var(--border)' : 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '12px'
                        }}>
                            {integration.status === 'Connected' ? 'Disconnect' : 'Connect'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderMoneyMap = () => (
        <div className="chart-card">
            <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Money Map Assessment</h3>
            <div style={{
                padding: '20px',
                background: 'linear-gradient(135deg, var(--primary) 0%, #8b5cf6 100%)',
                borderRadius: '12px',
                color: 'white',
                textAlign: 'center',
                marginBottom: '20px'
            }}>
                <h4 style={{ fontSize: '20px', marginBottom: '12px' }}>Discover Your Money Personality</h4>
                <p style={{ fontSize: '14px', opacity: 0.9, marginBottom: '20px' }}>
                    Take our comprehensive Money Map assessment to understand your financial psychology,
                    identify money dysmorphia patterns, and accelerate your liberation journey.
                </p>
                <button style={{
                    padding: '12px 24px',
                    background: 'white',
                    color: 'var(--primary)',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold'
                }}>
                    Start Assessment (15 min)
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{
                    padding: '16px',
                    background: 'var(--bg)',
                    borderRadius: '8px',
                    border: '1px solid var(--border)'
                }}>
                    <h5 style={{ fontSize: '14px', marginBottom: '8px' }}>Previous Assessment</h5>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                        Completed: June 15, 2024
                    </p>
                    <div style={{ fontSize: '13px', marginBottom: '4px' }}>
                        Primary Type: <strong>Builder</strong>
                    </div>
                    <div style={{ fontSize: '13px' }}>
                        Secondary: <strong>Protector</strong>
                    </div>
                </div>
                <div style={{
                    padding: '16px',
                    background: 'var(--bg)',
                    borderRadius: '8px',
                    border: '1px solid var(--border)'
                }}>
                    <h5 style={{ fontSize: '14px', marginBottom: '8px' }}>Next Review</h5>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                        Recommended: December 15, 2024
                    </p>
                    <button style={{
                        padding: '6px 12px',
                        background: 'transparent',
                        color: 'var(--primary)',
                        border: '1px solid var(--primary)',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px'
                    }}>
                        Schedule Reminder
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Profile Settings</h1>
                <p style={{ color: 'var(--text-secondary)' }}>
                    Manage your personal information, privacy preferences, and connected services
                </p>
            </div>

            {/* Tab Navigation */}
            <div style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '24px',
                borderBottom: '1px solid var(--border)',
                paddingBottom: '12px'
            }}>
                {['personal', 'privacy', 'integrations', 'money map'].map(tab => (
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
                        {tab.replace(/([A-Z])/g, ' $1').trim()}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'personal' && renderPersonalInfo()}
            {activeTab === 'privacy' && renderPrivacy()}
            {activeTab === 'integrations' && renderIntegrations()}
            {activeTab === 'money map' && renderMoneyMap()}

            {/* Privacy Policy Modal */}
            {showPrivacyPolicy && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: 'var(--card-bg)',
                        borderRadius: '12px',
                        padding: '24px',
                        maxWidth: '800px',
                        maxHeight: '80vh',
                        overflow: 'auto',
                        position: 'relative'
                    }}>
                        <button
                            onClick={() => setShowPrivacyPolicy(false)}
                            style={{
                                position: 'absolute',
                                top: '16px',
                                right: '16px',
                                background: 'transparent',
                                border: 'none',
                                fontSize: '24px',
                                cursor: 'pointer'
                            }}
                        >
                            ×
                        </button>
                        <h2 style={{ marginBottom: '20px' }}>Privacy Policy</h2>
                        <pre style={{
                            whiteSpace: 'pre-wrap',
                            fontSize: '13px',
                            lineHeight: '1.6',
                            color: 'var(--text-secondary)'
                        }}>
                            {privacyPolicyText}
                        </pre>
                        <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
                            <button
                                onClick={() => setShowPrivacyPolicy(false)}
                                style={{
                                    padding: '10px 20px',
                                    background: 'var(--primary)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '14px'
                                }}
                            >
                                I Acknowledge
                            </button>
                            <button
                                onClick={() => setShowPrivacyPolicy(false)}
                                style={{
                                    padding: '10px 20px',
                                    background: 'transparent',
                                    color: 'var(--text)',
                                    border: '1px solid var(--border)',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '14px'
                                }}
                            >
                                Download PDF
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile; 