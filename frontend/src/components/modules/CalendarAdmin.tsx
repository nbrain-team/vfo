import React, { useEffect, useState } from 'react';
import ModuleTemplate from './ModuleTemplate';
import { getBookings, seedMockDataIfEmpty } from '../../adminData';

const CalendarAdmin: React.FC = () => {
  const [bookings, setBookings] = useState(getBookings());

  useEffect(() => {
    if (bookings.length === 0) {
      seedMockDataIfEmpty();
      setBookings(getBookings());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refresh = () => setBookings(getBookings());
  const sorted = [...bookings].sort((a, b) => a.slot.localeCompare(b.slot));
  return (
    <ModuleTemplate
      title="Calendar"
      description="View scheduled consults (mock data stored locally)."
    >
      <div className="module-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 className="section-title">Upcoming Consultations</h3>
          <button className="button-outline" style={{ width: 'auto' }} onClick={refresh}>Reload</button>
        </div>
        <div className="table-container" style={{ marginTop: '12px' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>When</th>
                <th>Client</th>
                <th>Email</th>
                <th>Package</th>
                <th>Stage</th>
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>No bookings yet.</td>
                </tr>
              )}
              {sorted.map(b => (
                <tr key={b.id}>
                  <td>{b.slot}</td>
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
    </ModuleTemplate>
  );
};

export default CalendarAdmin;


