import React, { useEffect, useState } from 'react';
import ModuleTemplate from './ModuleTemplate';
import { getBookings, seedMockDataIfEmpty } from '../../adminData';
import googleCalendarService from '../../services/googleCalendarService';

const CalendarAdmin: React.FC = () => {
  const [bookings, setBookings] = useState(getBookings());
  const [googleEvents, setGoogleEvents] = useState<any[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [showGoogleEvents, setShowGoogleEvents] = useState(true);

  useEffect(() => {
    if (bookings.length === 0) {
      seedMockDataIfEmpty();
      setBookings(getBookings());
    }
    // Auto-sync with Google Calendar on component load
    syncOnLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const syncOnLoad = async () => {
    // Check if we have tokens from login
    const googleAccessToken = localStorage.getItem('google_access_token');
    if (googleAccessToken) {
      googleCalendarService.setAccessToken(googleAccessToken);
    }
    
    // Try to sync if we have access
    if (googleCalendarService.hasCalendarAccess()) {
      await syncGoogleCalendar();
    }
  };

  const syncGoogleCalendar = async () => {
    setIsSyncing(true);
    setSyncError(null);
    
    try {
      const events = await googleCalendarService.getEvents();
      const convertedEvents = events.map(event => googleCalendarService.convertToBooking(event));
      setGoogleEvents(convertedEvents);
    } catch (error: any) {
      console.error('Calendar sync error:', error);
      if (error.response?.status === 401) {
        setSyncError('Google Calendar access expired. Please re-authorize.');
      } else {
        setSyncError('Failed to sync with Google Calendar');
      }
    } finally {
      setIsSyncing(false);
    }
  };

  const handleAuthorizeCalendar = async () => {
    try {
      await googleCalendarService.requestCalendarAccess();
    } catch (error) {
      console.error('Authorization error:', error);
      setSyncError('Failed to request calendar access');
    }
  };

  const refresh = () => {
    setBookings(getBookings());
    if (googleCalendarService.hasCalendarAccess()) {
      syncGoogleCalendar();
    }
  };

  // Combine local bookings and Google events
  const allBookings = showGoogleEvents 
    ? [...bookings, ...googleEvents.filter(ge => !bookings.find(b => b.googleEventId === ge.googleEventId))]
    : bookings;
  
  const sorted = [...allBookings].sort((a, b) => a.slot.localeCompare(b.slot));
  return (
    <ModuleTemplate
      title="Calendar"
      description="View scheduled consults synced with Google Calendar."
    >
      <div className="module-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 className="section-title">Upcoming Consultations</h3>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {googleCalendarService.hasCalendarAccess() ? (
              <>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
                  <input 
                    type="checkbox" 
                    checked={showGoogleEvents}
                    onChange={(e) => setShowGoogleEvents(e.target.checked)}
                  />
                  Show Google Calendar
                </label>
                <button 
                  className="button-outline" 
                  style={{ width: 'auto' }} 
                  onClick={syncGoogleCalendar}
                  disabled={isSyncing}
                >
                  {isSyncing ? 'Syncing...' : 'Sync'}
                </button>
              </>
            ) : (
              <button 
                className="form-button" 
                style={{ width: 'auto' }} 
                onClick={handleAuthorizeCalendar}
              >
                Connect Google Calendar
              </button>
            )}
            <button className="button-outline" style={{ width: 'auto' }} onClick={refresh}>Reload</button>
          </div>
        </div>
        
        {syncError && (
          <div style={{ 
            padding: '12px', 
            background: 'var(--danger-light)', 
            border: '1px solid var(--danger)', 
            borderRadius: '6px',
            marginBottom: '16px',
            fontSize: '14px',
            color: 'var(--danger)'
          }}>
            {syncError}
            {syncError.includes('re-authorize') && (
              <button 
                className="button-outline" 
                style={{ width: 'auto', marginLeft: '12px', padding: '4px 12px' }} 
                onClick={handleAuthorizeCalendar}
              >
                Re-authorize
              </button>
            )}
          </div>
        )}
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
                  <td>
                    {b.googleEventId && (
                      <span style={{ 
                        display: 'inline-block', 
                        width: '8px', 
                        height: '8px', 
                        borderRadius: '50%', 
                        background: '#4285f4', 
                        marginRight: '8px',
                        verticalAlign: 'middle'
                      }} title="Google Calendar Event" />
                    )}
                    {b.slot}
                  </td>
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


