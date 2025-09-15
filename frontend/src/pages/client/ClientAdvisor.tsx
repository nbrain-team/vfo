import React, { useEffect, useState } from 'react';
import apiClient from '../../apiClient';

const ClientAdvisor: React.FC = () => {
  const [advisor, setAdvisor] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const res = await apiClient.get('/clients/my-advisor');
        setAdvisor(res.data);
      } catch (e: any) {
        setError(e?.response?.data?.detail || 'Failed to load advisor');
      }
    })();
  }, []);
  return (
    <div className="page-container">
      <h2 className="page-title">My Advisor</h2>
      {error && <div className="chart-card" style={{ color: 'var(--danger)' }}>{error}</div>}
      {advisor && (
        <div className="chart-card">
          <div style={{ fontSize: 16, fontWeight: 600 }}>{advisor.name || 'Your Advisor'}</div>
          <div style={{ color: 'var(--text-secondary)', marginTop: 4 }}>{advisor.email}</div>
          {advisor.username && (
            <div style={{ marginTop: 8 }}>
              <a className="button-outline" style={{ width: 'auto', textDecoration: 'none' }} href={`/${advisor.username}`} target="_blank" rel="noreferrer">View Advisor Site</a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClientAdvisor;


