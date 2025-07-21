import React, { useState } from 'react';
import apiClient from '../apiClient';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await apiClient.post('/api/users/', { email, password });
            setMessage(`User created successfully! You can now log in.`);
            setEmail('');
            setPassword('');
        } catch (error) {
            setMessage('Error creating user. The email may already be in use.');
            console.error(error);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="auth-title">Create an Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input"
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
                            required
                        />
                    </div>
                    <button type="submit" className="form-button">
                        Sign Up
                    </button>
                </form>
                {message && <p style={{ marginTop: '1rem', textAlign: 'center', color: 'green' }}>{message}</p>}
                <p style={{ marginTop: '1rem', textAlign: 'center' }}>
                    Already have an account? <Link to="/login" className="form-link">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default Register; 