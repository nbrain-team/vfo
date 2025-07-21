import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './components/Home';
import LegalIQ from './components/LegalIQ';
import AgentIQ from './components/modules/AgentIQ';
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
import Login from './pages/Login';
import Register from './pages/Register';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="agent" element={<AgentIQ />} />
          <Route path="legal" element={<LegalIQ />} />
          <Route path="risk" element={<RiskIQ />} />
          <Route path="wealth" element={<WealthIQ />} />
          <Route path="trust" element={<TrustIQ />} />
          <Route path="crypto" element={<CryptoIQ />} />
          <Route path="tax" element={<TaxIQ />} />
          <Route path="asset" element={<AssetIQ />} />
          <Route path="health" element={<HealthIQ />} />
          <Route path="home" element={<HomeIQ />} />
          <Route path="prompt" element={<PromptIQ />} />
          <Route path="signal" element={<SignalIQ />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
