import React, { useState } from 'react';
import apiClient from '../apiClient';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        params.append('username', email);
        params.append('password', password);

        try {
            const response = await apiClient.post('/token', params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });
            localStorage.setItem('access_token', response.data.access_token);
            // Store user name from response, fallback to email prefix
            const userName = response.data.user_name || email.split('@')[0];
            localStorage.setItem('user_name', userName);
            // Store role from response
            const role = response.data.role || 'Client';
            localStorage.setItem('role', role);
            localStorage.setItem('user_id', response.data.user_id);
            navigate('/platform');
        } catch (error) {
            setMessage('Invalid credentials. Please try again.');
            console.error(error);
        }
    };

    const handleGoogleLogin = async (credentialResponse: any) => {
        try {
            console.log('Google credential response:', credentialResponse);
            
            // Send the Google credential to backend
            const response = await apiClient.post('/auth/google', {
                credential: credentialResponse.credential
            });
            
            // Store the tokens and user info
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('user_name', response.data.user_name);
            localStorage.setItem('user_email', response.data.email);
            localStorage.setItem('role', response.data.role || 'Client');
            
            // Store Google tokens if provided for calendar access
            if (response.data.google_access_token) {
                localStorage.setItem('google_access_token', response.data.google_access_token);
                localStorage.setItem('google_refresh_token', response.data.google_refresh_token);
            }
            
            navigate('/platform');
        } catch (error: any) {
            const errorMessage = error.response?.data?.detail || error.message || 'Google authentication failed. Please try again.';
            setMessage(`Error: ${errorMessage}`);
            console.error('Google login error:', error);
            console.error('Error response:', error.response?.data);
        }
    };

    const handleGoogleError = () => {
        setMessage('Google authentication failed. Please try again.');
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="auth-title">Welcome to LIFTed VFO</h2>
                <p style={{ textAlign: 'center', marginBottom: '24px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                    Your AI-Powered Virtual Family Office
                </p>
                
                <div style={{
                    backgroundColor: 'var(--primary-light)',
                    border: '1px solid var(--primary)',
                    borderRadius: '8px',
                    padding: '12px',
                    marginBottom: '20px',
                    fontSize: '13px',
                    color: 'var(--primary-dark)'
                }}>
                    <div style={{ marginBottom: 8 }}>
                        <strong>Clients</strong>: Connect with Google or use email/password. After sign-in, you’ll select your advisor if not already linked.
                    </div>
                    <div>
                        <strong>LIFTed Advisors</strong>: Sign in with credentials. New? <Link to="/register" className="form-link">Create an account</Link>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
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
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" className="form-button">
                        Sign In
                    </button>
                </form>
                
                <div style={{ margin: '20px 0', textAlign: 'center' }}>
                    <div style={{ position: 'relative', marginBottom: '20px' }}>
                        <hr style={{ border: '0', borderTop: '1px solid var(--border-light)' }} />
                        <span style={{ 
                            position: 'absolute', 
                            top: '-10px', 
                            left: '50%', 
                            transform: 'translateX(-50%)', 
                            background: 'var(--background-secondary)', 
                            padding: '0 10px',
                            color: 'var(--text-secondary)',
                            fontSize: '14px'
                        }}>
                            or
                        </span>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <GoogleLogin
                            onSuccess={handleGoogleLogin}
                            onError={handleGoogleError}
                            useOneTap
                            theme="outline"
                            size="large"
                            text="continue_with"
                            shape="rectangular"
                            width="280"
                        />
                    </div>
                </div>
                
                <div style={{ marginTop: '12px' }}>
                    <button
                        type="button"
                        className="button-outline"
                        onClick={() => {
                            localStorage.setItem('access_token', 'mock_access_token');
                            localStorage.setItem('user_name', 'wyoming-client');
                            localStorage.setItem('role', 'Client');
                            navigate('/agent');
                        }}
                    >
                        Use Mock Mode (No Backend)
                    </button>
                </div>
                {message && (
                    <p style={{ 
                        marginTop: '16px', 
                        textAlign: 'center', 
                        color: 'var(--danger)',
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
                    Don't have an account? <Link to="/register" className="form-link">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login; 