import React, { useMemo, useState } from 'react';
import ModuleTemplate from './ModuleTemplate';
import { getBookings, updateBooking } from '../../adminData';

const template = `
Engagement Letter\n\n
Client: {{name}}\n
Email: {{email}}\n
Scope: Asset Protection Trust Consultation\n
Fee: $375 USD (placeholder)\n\n
Firm: Meuli Law Office, PC\n
Address: 1621 Central Avenue #8866, Cheyenne, WY 82001\n\n
Terms: This letter outlines the scope of the initial consultation...\n`;

const replaceFields = (t: string, vars: Record<string, string>) =>
  t.replace(/{{(\w+)}}/g, (_, k) => vars[k] || '');

const EngagementAdmin: React.FC = () => {
  const bookings = useMemo(() => getBookings(), []);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [content, setContent] = useState('');
  const [generated, setGenerated] = useState(false);

  const generate = () => {
    const b = bookings.find(x => x.id === selectedId);
    if (!b) return;
    const text = replaceFields(template, {
      name: b.name,
      email: b.email
    });
    setContent(text);
    setGenerated(true);
  };

  const markSent = () => {
    if (!selectedId) return;
    updateBooking(selectedId, { stage: 'Signed' });
    window.location.reload();
  };

  return (
    <ModuleTemplate title="Engagement Letters" description="Draft and send engagement letters (mock).">
      <div className="module-grid">
        <div className="module-card">
          <h3 className="section-title">Select Lead</h3>
          <select className="form-input" value={selectedId || ''} onChange={(e) => setSelectedId(e.target.value)}>
            <option value="">Select...</option>
            {bookings.map(b => (
              <option key={b.id} value={b.id}>{b.name} — {b.email}</option>
            ))}
          </select>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button className="form-button" style={{ width: 'auto' }} onClick={generate} disabled={!selectedId}>Generate Draft</button>
            <button className="button-outline" style={{ width: 'auto' }} onClick={markSent} disabled={!generated}>Approve & Send (Mock)</button>
          </div>
        </div>

        <div className="module-card">
          <h3 className="section-title">Draft Preview</h3>
          <textarea className="form-input" style={{ minHeight: 240 }} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Draft will appear here" />
        </div>
      </div>
    </ModuleTemplate>
  );
};

export default EngagementAdmin;


