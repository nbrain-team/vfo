import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
    // With cookie-based sessions, we can infer auth by presence of role or user_name
    const isAuthenticated = !!localStorage.getItem('role') || !!localStorage.getItem('user_name');

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute; 