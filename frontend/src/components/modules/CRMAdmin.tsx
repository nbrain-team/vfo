import React, { useMemo, useState } from 'react';
import ModuleTemplate from './ModuleTemplate';
import { getBookings, updateBooking, Booking } from '../../adminData';

const CRMAdmin: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const bookings = useMemo(() => getBookings(), []);
  const selected = bookings.find(b => b.id === selectedId);

  return (
    <ModuleTemplate
      title="CRM & Leads"
      description="View and manage intake, stages, and notes (mock)."
    >
      <div className="module-grid">
        <div className="module-card">
          <h3 className="section-title">Leads</h3>
          <div className="table-container" style={{ marginTop: 12 }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Package</th>
                  <th>Stage</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b.id} onClick={() => setSelectedId(b.id)} style={{ cursor: 'pointer' }}>
                    <td>{b.name}</td>
                    <td>{b.email}</td>
                    <td>{b.pkg}</td>
                    <td><span className="status-badge active">{b.stage}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="module-card">
          <h3 className="section-title">Lead Details</h3>
          {!selected && <div style={{ color: 'var(--text-secondary)' }}>Select a lead to view details.</div>}
          {selected && (
            <div style={{ display: 'grid', gap: 8 }}>
              <div><strong>When:</strong> {selected.slot}</div>
              <div><strong>Client:</strong> {selected.name} ({selected.email})</div>
              {selected.phone && <div><strong>Phone:</strong> {selected.phone}</div>}
              <div><strong>Stage:</strong> {selected.stage}</div>
              <div><strong>Priority:</strong> {(selected.priority || []).join(', ')}</div>
              <div><strong>Assets:</strong> {(selected.assetTypes || []).join(', ')}</div>
              <div><strong>Referral:</strong> {selected.referralSource} {selected.referralOther ? `— ${selected.referralOther}` : ''}</div>
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                {(['New','Booked','Paid','Signed','Onboarding','Completed'] as Booking['stage'][]).map(s => (
                  <button
                    key={s}
                    className="button-outline"
                    style={{ width: 'auto' }}
                    onClick={() => {
                      updateBooking(selected.id, { stage: s });
                      window.location.reload();
                    }}
                  >
                    Mark {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </ModuleTemplate>
  );
};

export default CRMAdmin;


