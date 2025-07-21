import React, { useState } from 'react';
import apiClient from '../apiClient';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        params.append('username', email);
        params.append('password', password);

        try {
            const response = await apiClient.post('/token', params);
            localStorage.setItem('access_token', response.data.access_token);
            setMessage('Login successful!');
            setEmail('');
            setPassword('');
        } catch (error) {
            setMessage('Error logging in');
            console.error(error);
        }
    };

    return (
        <div className="p-4 border rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <button type="submit" className="bg-green-500 text-white p-2 rounded">
                    Login
                </button>
            </form>
            {message && <p className="mt-4">{message}</p>}
        </div>
    );
};

export default Login; 