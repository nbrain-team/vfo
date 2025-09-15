import React, { useMemo } from 'react';

interface ClientDoc {
  id: string;
  title: string;
  description: string;
  category: 'Trust' | 'Engagement' | 'Meetings' | 'Other';
  requiresSignature?: boolean;
  lastModified: string;
}

const ClientDashboard: React.FC = () => {
  const userName = useMemo(() => localStorage.getItem('user_name') || 'Client', []);

  const docs: ClientDoc[] = [
    { id: 'c-1', title: 'Engagement Agreement - WAPA', description: 'Your signed engagement agreement', category: 'Engagement', requiresSignature: true, lastModified: '2024-01-21' },
    { id: 'c-2', title: 'PTC Operating Agreement - Single Grantor', description: 'Operating agreement for your Private Trust Company', category: 'Trust', requiresSignature: true, lastModified: '2024-01-21' },
    { id: 'c-3', title: 'DDC Distribution Request Form', description: 'Form to request a discretionary distribution', category: 'Other', requiresSignature: true, lastModified: '2024-01-21' },
    { id: 'c-4', title: 'Organizational Meeting Minutes', description: 'Minutes from organizational meeting', category: 'Meetings', requiresSignature: true, lastModified: '2024-01-21' },
  ];

  return (
    <div className="page-container">
      <h2 className="page-title">Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, {userName}</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>Here are your documents and forms shared by your advisor.</p>

      <div className="chart-card" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{ margin: 0 }}>Your Documents</h3>
          <a className="button-outline" href="#" onClick={(e) => { e.preventDefault(); alert('Vault link coming soon'); }} style={{ width: 'auto', textDecoration: 'none' }}>Open Vault</a>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Requires eSign</th>
                <th>Last Modified</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {docs.map(doc => (
                <tr key={doc.id}>
                  <td>
                    <div style={{ fontWeight: 500 }}>{doc.title}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{doc.description}</div>
                  </td>
                  <td>{doc.category}</td>
                  <td>{doc.requiresSignature ? 'Yes' : 'No'}</td>
                  <td>{doc.lastModified}</td>
                  <td>
                    <button className="button-outline" style={{ width: 'auto' }} onClick={() => alert('Preview coming soon')}>Preview</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;


