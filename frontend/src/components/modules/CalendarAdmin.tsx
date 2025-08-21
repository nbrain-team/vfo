import React from 'react';
import ModuleTemplate from './ModuleTemplate';
import { getBookings } from '../../adminData';

const CalendarAdmin: React.FC = () => {
  const bookings = getBookings().sort((a, b) => a.slot.localeCompare(b.slot));
  return (
    <ModuleTemplate
      title="Calendar"
      description="View scheduled consults (mock data stored locally)."
    >
      <div className="module-card">
        <h3 className="section-title">Upcoming Consultations</h3>
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
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>No bookings yet.</td>
                </tr>
              )}
              {bookings.map(b => (
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


