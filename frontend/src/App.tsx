import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Platform from './pages/Platform';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/MainLayout';

// Import all module components
import AgentIQ from './components/modules/AgentIQ';
import LegalIQ from './components/LegalIQ';
import RiskIQ from './components/modules/RiskIQ';
import WealthIQ from './components/modules/WealthIQ';
import TrustIQ from './components/modules/TrustIQ';
import CryptoIQ from './components/modules/CryptoIQ';
import TaxIQ from './components/modules/TaxIQ';
import AssetIQ from './components/modules/AssetIQ';
import HealthIQ from './components/modules/HealthIQ';
import HomeIQ from './components/modules/HomeIQ';
import PromptIQ from './components/modules/PromptIQ';
import SignalIQ from './components/modules/SignalIQ';

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
          <Route path="/risk" element={
            <MainLayout>
              <RiskIQ />
            </MainLayout>
          } />
          <Route path="/wealth" element={
            <MainLayout>
              <WealthIQ />
            </MainLayout>
          } />
          <Route path="/trust" element={
            <MainLayout>
              <TrustIQ />
            </MainLayout>
          } />
          <Route path="/crypto" element={
            <MainLayout>
              <CryptoIQ />
            </MainLayout>
          } />
          <Route path="/tax" element={
            <MainLayout>
              <TaxIQ />
            </MainLayout>
          } />
          <Route path="/asset" element={
            <MainLayout>
              <AssetIQ />
            </MainLayout>
          } />
          <Route path="/health" element={
            <MainLayout>
              <HealthIQ />
            </MainLayout>
          } />
          <Route path="/home" element={
            <MainLayout>
              <HomeIQ />
            </MainLayout>
          } />
          <Route path="/prompt" element={
            <MainLayout>
              <PromptIQ />
            </MainLayout>
          } />
          <Route path="/signal" element={
            <MainLayout>
              <SignalIQ />
            </MainLayout>
          } />
        </Route>
        <Route path="/" element={<Navigate to="/platform" />} />
      </Routes>
    </Router>
  );
}

export default App;
