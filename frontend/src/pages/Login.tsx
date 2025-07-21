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
            const response = await apiClient.post('/api/token', params);
            localStorage.setItem('access_token', response.data.access_token);
            navigate('/');
        } catch (error) {
            setMessage('Invalid credentials. Please try again.');
            console.error(error);
        }
    };

    return (
        <div style={{ backgroundColor: 'var(--bg)' }} className="flex items-center justify-center min-h-screen">
            <div style={{ backgroundColor: 'var(--card-bg)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' }} className="w-full max-w-md p-8 space-y-6">
                <h2 style={{ color: 'var(--text-primary)' }} className="text-2xl font-bold text-center">Welcome Back</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label style={{ color: 'var(--text-secondary)' }} className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--input-border)', borderRadius: 'var(--radius)' }}
                            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label style={{ color: 'var(--text-secondary)' }} className="block text-sm font-medium">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--input-border)', borderRadius: 'var(--radius)' }}
                            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <button type="submit" style={{ backgroundColor: 'var(--primary)', borderRadius: 'var(--radius)' }} className="w-full py-2 text-white rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Sign In
                    </button>
                </form>
                {message && <p className="mt-4 text-center text-red-500">{message}</p>}
                <p style={{ color: 'var(--gray)' }} className="mt-4 text-center">
                    Don't have an account? <Link to="/register" style={{ color: 'var(--accent)' }} className="hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login; 