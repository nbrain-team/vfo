import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Welcome from './pages/Welcome';
import Platform from './pages/Platform';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/MainLayout';

// Import all modules
import AgentIQ from './components/modules/AgentIQ';
import LegalIQ from './components/LegalIQ';
import ValuesIQ from './components/modules/ValuesIQ';
import WealthIQ from './components/modules/WealthIQ';
import InsuranceIQ from './components/modules/InsuranceIQ';
import TaxIQ from './components/modules/TaxIQ';
import CryptoIQ from './components/modules/CryptoIQ';
import HealthIQ from './components/modules/HealthIQ';
import VCTO from './components/modules/VCTO';
import CalendarAdmin from './components/modules/CalendarAdmin';
import CRMAdmin from './components/modules/CRMAdmin';
import SiteBuilderAdmin from './components/modules/SiteBuilderAdmin';
import EngagementAdmin from './components/modules/EngagementAdmin';
import VaultAdmin from './components/modules/VaultAdmin';
import NurtureAdmin from './components/modules/NurtureAdmin';
import PipelinesAdmin from './components/modules/PipelinesAdmin';
import Profile from './pages/Profile';
import Documentation from './pages/Documentation';
import MockWyomingAPT from './pages/MockWyomingAPT';
import PublicBookCall from './pages/PublicBookCall';
import PublicConfirm from './pages/PublicConfirm';
import PublicSelectTime from './pages/PublicSelectTime';
import AuditAdmin from './components/modules/AuditAdmin';
import FormbuilderAdmin from './components/modules/FormbuilderAdmin';
import DocumentLibraryAdmin from './components/modules/DocumentLibraryAdmin';
import CalendarCallback from './pages/CalendarCallback';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/calendar-callback" element={<CalendarCallback />} />
        {/* Public-facing page outside of the admin/sidebar layout */}
        <Route path="/wyoming-apt" element={<MockWyomingAPT />} />
        <Route path="/wyoming-apt/select" element={<PublicSelectTime />} />
        <Route path="/wyoming-apt/book" element={<PublicBookCall />} />
        <Route path="/wyoming-apt/confirmed" element={<PublicConfirm />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/welcome" element={
            <MainLayout>
              <Welcome />
            </MainLayout>
          } />
          <Route path="/platform" element={
            <MainLayout>
              <Platform />
            </MainLayout>
          } />
          <Route path="/admin/calendar" element={
            <MainLayout>
              <CalendarAdmin />
            </MainLayout>
          } />
          <Route path="/admin/crm" element={
            <MainLayout>
              <CRMAdmin />
            </MainLayout>
          } />
          <Route path="/admin/site" element={
            <MainLayout>
              <SiteBuilderAdmin />
            </MainLayout>
          } />
          <Route path="/admin/formbuilder" element={
            <MainLayout>
              <FormbuilderAdmin />
            </MainLayout>
          } />
          <Route path="/admin/documents" element={
            <MainLayout>
              <DocumentLibraryAdmin />
            </MainLayout>
          } />
          <Route path="/admin/engagement" element={
            <MainLayout>
              <EngagementAdmin />
            </MainLayout>
          } />
          <Route path="/admin/vault" element={
            <MainLayout>
              <VaultAdmin />
            </MainLayout>
          } />
          <Route path="/admin/nurture" element={
            <MainLayout>
              <NurtureAdmin />
            </MainLayout>
          } />
          <Route path="/admin/pipelines" element={
            <MainLayout>
              <PipelinesAdmin />
            </MainLayout>
          } />
          <Route path="/admin/audit" element={
            <MainLayout>
              <AuditAdmin />
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
          <Route path="/docs" element={
            <MainLayout>
              <Documentation />
            </MainLayout>
          } />
        </Route>
        <Route path="/" element={<Navigate to="/welcome" />} />
      </Routes>
    </Router>
  );
}

export default App;
