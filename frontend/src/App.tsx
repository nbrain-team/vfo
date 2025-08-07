import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Platform from './pages/Platform';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/MainLayout';

// Import only the modules we're keeping
import AgentIQ from './components/modules/AgentIQ';
import LegalIQ from './components/LegalIQ';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/platform" element={
            <MainLayout>
              <Platform />
            </MainLayout>
          } />
          <Route path="/agent" element={
            <MainLayout>
              <AgentIQ />
            </MainLayout>
          } />
          <Route path="/legal" element={
            <MainLayout>
              <LegalIQ />
            </MainLayout>
          } />
          <Route path="/profile" element={
            <MainLayout>
              <Profile />
            </MainLayout>
          } />
        </Route>
        <Route path="/" element={<Navigate to="/platform" />} />
      </Routes>
    </Router>
  );
}

export default App;
