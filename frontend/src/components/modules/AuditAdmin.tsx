import React from 'react';
import { getAutomationLogs } from '../../adminData';

const AuditAdmin: React.FC = () => {
  const logs = getAutomationLogs().slice().reverse();
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Audit</h1>
        <p className="page-description">System and automation activity (latest first)</p>
      </div>
      <div className="module-card" style={{ marginTop: 16 }}>
        <div className="table-container" style={{ marginTop: 12 }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Event</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((l) => (
                <tr key={l.id}>
                  <td>{new Date(l.time).toLocaleString()}</td>
                  <td>{l.event}</td>
                  <td>{l.detail || '-'}</td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td colSpan={3} style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>No audit records yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuditAdmin;


