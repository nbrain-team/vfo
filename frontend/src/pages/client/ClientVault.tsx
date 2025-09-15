import React from 'react';
import ClientDashboard from '../ClientDashboard';

// Client Vault uses the ClientDashboard documents section behavior for now
const ClientVault: React.FC = () => {
  return (
    <div className="page-container">
      <h2 className="page-title">My Vault</h2>
      <ClientDashboard />
    </div>
  );
};

export default ClientVault;


