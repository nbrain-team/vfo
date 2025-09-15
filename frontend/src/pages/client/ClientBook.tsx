import React, { useEffect, useState } from 'react';
import apiClient from '../../apiClient';

const ClientBook: React.FC = () => {
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
  const bookingHref = advisor?.username ? `/${advisor.username}/select` : '/wyoming-apt/select';
  return (
    <div className="page-container">
      <h2 className="page-title">Book a Consult</h2>
      {error && <div className="chart-card" style={{ color: 'var(--danger)' }}>{error}</div>}
      <div className="chart-card">
        <p>Choose a time that works for you.</p>
        <a className="form-button" style={{ width: 'auto', textDecoration: 'none' }} href={bookingHref}>Open Booking</a>
      </div>
    </div>
  );
};

export default ClientBook;


