import React, { useState, useEffect } from 'react';
import apiClient from '../apiClient';
import { useNavigate, Link } from 'react-router-dom';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [userType, setUserType] = useState<'advisor' | 'client'>('client');
    const [username, setUsername] = useState('');
    const [selectedAdvisor, setSelectedAdvisor] = useState<number | null>(null);
    const [advisors, setAdvisors] = useState<any[]>([]);
    const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
    const [checkingUsername, setCheckingUsername] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        try {
            const userData: any = {
                email,
                password,
                name,
                role: userType === 'advisor' ? 'Advisor' : 'Client'
            };

            if (userType === 'advisor' && username) {
                userData.username = username;
            }

            if (userType === 'client' && selectedAdvisor) {
                userData.advisor_id = selectedAdvisor;
            }

            await apiClient.post('/users/', userData);
            
            setMessage('Registration successful! Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (error: any) {
            setMessage(error.response?.data?.detail || 'Registration failed. Please try again.');
            console.error(error);
        }
    };

    // Fetch advisors when component mounts or when user type changes
    useEffect(() => {
        if (userType === 'client') {
            apiClient.get('/advisors/')
                .then(response => {
                    setAdvisors(response.data);
                })
                .catch(error => {
                    console.error('Failed to fetch advisors:', error);
                });
        }
    }, [userType]);

    // Check username availability
    useEffect(() => {
        if (userType === 'advisor' && username.length > 2) {
            const timer = setTimeout(() => {
                setCheckingUsername(true);
                apiClient.get(`/advisors/check-username/${username}`)
                    .then(response => {
                        setUsernameAvailable(response.data.available);
                        setCheckingUsername(false);
                    })
                    .catch(() => {
                        setCheckingUsername(false);
                    });
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [username, userType]);

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="auth-title">Join LIFTed VFO</h2>
                <p style={{ textAlign: 'center', marginBottom: '24px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                    Create your Virtual Family Office account
                </p>
                
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                        I am a:
                    </label>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                            type="button"
                            onClick={() => setUserType('advisor')}
                            style={{
                                flex: 1,
                                padding: '12px',
                                border: `2px solid ${userType === 'advisor' ? 'var(--primary)' : 'var(--border-light)'}`,
                                borderRadius: '8px',
                                background: userType === 'advisor' ? 'var(--primary-light)' : 'transparent',
                                color: userType === 'advisor' ? 'var(--primary)' : 'var(--text-primary)',
                                cursor: 'pointer',
                                fontWeight: userType === 'advisor' ? '600' : '400',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            LIFTed Advisor
                        </button>
                        <button
                            type="button"
                            onClick={() => setUserType('client')}
                            style={{
                                flex: 1,
                                padding: '12px',
                                border: `2px solid ${userType === 'client' ? 'var(--primary)' : 'var(--border-light)'}`,
                                borderRadius: '8px',
                                background: userType === 'client' ? 'var(--primary-light)' : 'transparent',
                                color: userType === 'client' ? 'var(--primary)' : 'var(--text-primary)',
                                cursor: 'pointer',
                                fontWeight: userType === 'client' ? '600' : '400',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            Client
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-input"
                            placeholder="Your full name"
                            required
                        />
                    </div>
                    
                    {userType === 'advisor' && (
                        <div className="form-group">
                            <label className="form-label">Username (for your public URL)</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                                className="form-input"
                                placeholder="e.g., john-smith"
                                required
                                style={{
                                    borderColor: username.length > 2 ? (
                                        checkingUsername ? 'var(--warning)' : 
                                        usernameAvailable === false ? 'var(--danger)' : 
                                        usernameAvailable === true ? 'var(--success)' : 'var(--border)'
                                    ) : 'var(--border)'
                                }}
                            />
                            <small style={{ 
                                display: 'block', 
                                marginTop: '4px', 
                                color: 'var(--text-secondary)',
                                fontSize: '12px'
                            }}>
                                Your public URL will be: https://liftedadvisors.com/{username || 'username'}
                            </small>
                            {username.length > 2 && (
                                <small style={{ 
                                    display: 'block', 
                                    marginTop: '4px', 
                                    color: checkingUsername ? 'var(--warning)' : 
                                           usernameAvailable === false ? 'var(--danger)' : 
                                           usernameAvailable === true ? 'var(--success)' : 'var(--text-secondary)',
                                    fontSize: '12px'
                                }}>
                                    {checkingUsername ? 'Checking availability...' :
                                     usernameAvailable === false ? 'Username already taken' :
                                     usernameAvailable === true ? 'Username available!' : ''}
                                </small>
                            )}
                        </div>
                    )}
                    
                    {userType === 'client' && (
                        <div className="form-group">
                            <label className="form-label">Select Your Advisor</label>
                            <select
                                value={selectedAdvisor || ''}
                                onChange={(e) => setSelectedAdvisor(e.target.value ? parseInt(e.target.value) : null)}
                                className="form-input"
                                required
                                style={{
                                    appearance: 'none',
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 12px center',
                                    paddingRight: '40px'
                                }}
                            >
                                <option value="">Choose your advisor...</option>
                                {advisors.map(advisor => (
                                    <option key={advisor.id} value={advisor.id}>
                                        {advisor.name || advisor.username || advisor.email}
                                    </option>
                                ))}
                            </select>
                            <small style={{ 
                                display: 'block', 
                                marginTop: '4px', 
                                color: 'var(--text-secondary)',
                                fontSize: '12px'
                            }}>
                                Search by name or username
                            </small>
                        </div>
                    )}
                    
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input"
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                            placeholder="Create a password"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="form-input"
                            placeholder="Confirm your password"
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="form-button"
                        disabled={userType === 'advisor' && username.length > 2 && usernameAvailable === false}
                    >
                        Create Account
                    </button>
                </form>
                {message && (
                    <p style={{ 
                        marginTop: '16px', 
                        textAlign: 'center', 
                        color: message.includes('successful') ? 'var(--success)' : 'var(--danger)',
                        fontSize: '13px'
                    }}>
                        {message}
                    </p>
                )}
                <p style={{ 
                    marginTop: '20px', 
                    textAlign: 'center',
                    fontSize: '14px',
                    color: 'var(--text-secondary)'
                }}>
                    Already have an account? <Link to="/login" className="form-link">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;