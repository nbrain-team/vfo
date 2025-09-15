import React, { useEffect, useState } from 'react';
import apiClient from '../../apiClient';

const ClientQuestionnaires: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const res = await apiClient.get('/clients/me/intakes');
        setItems(res.data || []);
      } catch (e: any) {
        setError(e?.response?.data?.detail || 'Failed to load questionnaires');
      }
    })();
  }, []);
  return (
    <div className="page-container">
      <h2 className="page-title">My Questionnaires</h2>
      {error && <div className="chart-card" style={{ color: 'var(--danger)' }}>{error}</div>}
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map(i => (
              <tr key={i.id}>
                <td>{i.name}</td>
                <td>{i.status || 'Open'}</td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={2} style={{ color: 'var(--text-secondary)' }}>No questionnaires yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientQuestionnaires;


