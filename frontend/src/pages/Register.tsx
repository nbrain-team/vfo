import React, { useState } from 'react';
import apiClient from '../apiClient';
import { useNavigate, Link } from 'react-router-dom';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        try {
            await apiClient.post('/register', {
                email,
                password
            });
            setMessage('Registration successful! Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (error: any) {
            setMessage(error.response?.data?.detail || 'Registration failed. Please try again.');
            console.error(error);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="auth-title">Join LIFTed VFO</h2>
                <p style={{ textAlign: 'center', marginBottom: '24px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                    Create your Virtual Family Office account
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
                    <button type="submit" className="form-button">
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