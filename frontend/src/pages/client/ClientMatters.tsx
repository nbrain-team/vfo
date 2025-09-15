import React, { useEffect, useState } from 'react';
import apiClient from '../../apiClient';

const ClientMatters: React.FC = () => {
  const [matters, setMatters] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const res = await apiClient.get('/clients/me/matters');
        setMatters(res.data || []);
      } catch (e: any) {
        setError(e?.response?.data?.detail || 'Failed to load matters');
      }
    })();
  }, []);
  return (
    <div className="page-container">
      <h2 className="page-title">Matters in Process</h2>
      {error && <div className="chart-card" style={{ color: 'var(--danger)' }}>{error}</div>}
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Pipeline</th>
              <th>Stage</th>
            </tr>
          </thead>
          <tbody>
            {matters.map(m => (
              <tr key={m.id}>
                <td>{m.title}</td>
                <td>{m.pipeline}</td>
                <td>{m.stage}</td>
              </tr>
            ))}
            {matters.length === 0 && (
              <tr><td colSpan={3} style={{ color: 'var(--text-secondary)' }}>No matters yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientMatters;


