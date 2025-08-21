import React, { useMemo, useState } from 'react';
import ModuleTemplate from './ModuleTemplate';
import { getBookings, updateBooking } from '../../adminData';

const VaultAdmin: React.FC = () => {
  const bookings = useMemo(() => getBookings(), []);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = bookings.find(b => b.id === selectedId);

  const addMockDoc = () => {
    if (!selected) return;
    const docs = selected.docs || [];
    const newDoc = {
      id: String(Date.now()),
      title: 'Engagement Letter (Signed).pdf',
      type: 'pdf',
      createdAt: new Date().toISOString(),
      url: '#'
    };
    updateBooking(selected.id, { docs: [...docs, newDoc] });
    window.location.reload();
  };

  return (
    <ModuleTemplate title="Client Vault" description="Per-lead documents (mock).">
      <div className="module-grid">
        <div className="module-card">
          <h3 className="section-title">Select Lead</h3>
          <select className="form-input" value={selectedId || ''} onChange={(e) => setSelectedId(e.target.value)}>
            <option value="">Select...</option>
            {bookings.map(b => (
              <option key={b.id} value={b.id}>{b.name} — {b.email}</option>
            ))}
          </select>
          <button className="form-button" style={{ width: 'auto', marginTop: 12 }} onClick={addMockDoc} disabled={!selected}>Add Mock Signed Doc</button>
        </div>

        <div className="module-card">
          <h3 className="section-title">Documents</h3>
          {!selected && <div style={{ color: 'var(--text-secondary)' }}>Select a lead to view documents.</div>}
          {selected && (
            <div className="table-container" style={{ marginTop: 12 }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Created</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {(selected.docs || []).map(d => (
                    <tr key={d.id}>
                      <td>{d.title}</td>
                      <td>{d.type}</td>
                      <td>{new Date(d.createdAt).toLocaleString()}</td>
                      <td><a className="button-outline" href={d.url} style={{ textDecoration: 'none', width: 'auto' }}>Download</a></td>
                    </tr>
                  ))}
                  {(selected.docs || []).length === 0 && (
                    <tr><td colSpan={4} style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>No documents yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </ModuleTemplate>
  );
};

export default VaultAdmin;


