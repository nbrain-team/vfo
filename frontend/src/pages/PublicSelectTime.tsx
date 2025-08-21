import React, { useState } from 'react';
import '../public.css';
import { useNavigate } from 'react-router-dom';

const TIMESLOTS = [
  'Tue 10:00 AM MT',
  'Tue 2:00 PM MT',
  'Wed 11:30 AM MT',
  'Thu 9:00 AM MT',
  'Fri 1:00 PM MT',
  'Fri 3:30 PM MT'
];

const PublicSelectTime: React.FC = () => {
  const navigate = useNavigate();
  const [slot, setSlot] = useState<string | null>(null);

  return (
    <div className="public-site">
      <div className="public-container">
        <header className="public-header">
          <div className="public-logo">
            <img src="/wy-apt-logo.png" alt="Firm Logo" />
            <div>
              <div style={{ fontWeight: 700, color: 'var(--brand-forest)' }}>Wyoming Asset Protection</div>
              <div style={{ fontSize: 12, color: 'var(--brand-slate)' }}>Select a Time</div>
            </div>
          </div>
        </header>

        <section className="public-section" style={{ maxWidth: 640, margin: '0 auto' }}>
          <h2 style={{ marginTop: 0 }}>Asset Protection Trusts</h2>
          <div style={{ color: 'var(--brand-slate)', marginBottom: 12 }}>
            30 min • Web conferencing • $375 USD • Mountain Time
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {TIMESLOTS.map((t) => (
              <button
                type="button"
                key={t}
                className={slot === t ? 'btn-primary' : 'btn-outline'}
                onClick={() => setSlot(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
            <button
              className="btn-gradient"
              disabled={!slot}
              style={{ opacity: slot ? 1 : 0.7, cursor: slot ? 'pointer' : 'not-allowed' }}
              onClick={() => navigate('/wyoming-apt/book', { state: { slot } })}
            >
              Continue
            </button>
            <a href="/wyoming-apt" className="btn-outline" style={{ textDecoration: 'none' }}>Cancel</a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PublicSelectTime;


