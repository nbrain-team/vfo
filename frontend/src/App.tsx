import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Platform from './pages/Platform';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/MainLayout';

// Import all modules
import AgentIQ from './components/modules/AgentIQ';
import LegalIQ from './components/LegalIQ';
import ValuesIQ from './components/modules/ValuesIQ';
import WealthIQ from './components/modules/WealthIQ';
import InsuranceIQ from './components/modules/InsuranceIQ';
import Profile from './pages/Profile';

// Placeholder components for modules still to be implemented
const TaxIQ = () => <div className="page-container"><h1>taxIQ - Coming Soon</h1></div>;
const CryptoIQ = () => <div className="page-container"><h1>cryptoIQ - Coming Soon</h1></div>;
const HealthIQ = () => <div className="page-container"><h1>healthIQ - Coming Soon</h1></div>;
const VCTO = () => <div className="page-container"><h1>vCTO - Coming Soon</h1></div>;

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
          <Route path="/insurance" element={
            <MainLayout>
              <InsuranceIQ />
            </MainLayout>
          } />
          <Route path="/wealth" element={
            <MainLayout>
              <WealthIQ />
            </MainLayout>
          } />
          <Route path="/tax" element={
            <MainLayout>
              <TaxIQ />
            </MainLayout>
          } />
          <Route path="/crypto" element={
            <MainLayout>
              <CryptoIQ />
            </MainLayout>
          } />
          <Route path="/values" element={
            <MainLayout>
              <ValuesIQ />
            </MainLayout>
          } />
          <Route path="/health" element={
            <MainLayout>
              <HealthIQ />
            </MainLayout>
          } />
          <Route path="/vcto" element={
            <MainLayout>
              <VCTO />
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
