import React, { useState } from 'react';
import apiClient from '../apiClient';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await apiClient.post('/users/', { email, password });
            setMessage(`User created successfully: ${response.data.email}`);
            setEmail('');
            setPassword('');
        } catch (error) {
            setMessage('Error creating user');
            console.error(error);
        }
    };

    return (
        <div className="p-4 border rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Register User</h2>
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
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Register
                </button>
            </form>
            {message && <p className="mt-4">{message}</p>}
        </div>
    );
};

export default Register; 