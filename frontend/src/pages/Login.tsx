import React, { useState } from 'react';
import apiClient from '../apiClient';
import { useNavigate, Link } from 'react-router-dom';

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
            // Store user name if available
            if (email) {
                const userName = email.split('@')[0];
                localStorage.setItem('user_name', userName);
            }
            navigate('/platform');
        } catch (error) {
            setMessage('Invalid credentials. Please try again.');
            console.error(error);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="auth-title">Welcome to LIFTed VFO</h2>
                <p style={{ textAlign: 'center', marginBottom: '24px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                    Your AI-Powered Virtual Family Office
                </p>
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