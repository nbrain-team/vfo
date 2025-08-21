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

const DOC_TEMPLATES: { id: string; name: string; template: string }[] = [
  { id: 'engagement', name: 'Engagement Letter', template },
  { id: 'nda', name: 'Mutual NDA', template: `Mutual NDA\n\nParty A: {{name}}\nEmail: {{email}}\nTerms: Placeholder NDA terms...` },
  { id: 'retainer', name: 'Legal Services Retainer', template: `Retainer Agreement\n\nClient: {{name}}\nEmail: {{email}}\nScope: Asset Protection Trust\nFee: TBD (placeholder)` }
];

const EngagementAdmin: React.FC = () => {
  const bookings = useMemo(() => getBookings(), []);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [docType, setDocType] = useState<string>('engagement');
  const [content, setContent] = useState('');
  const [generated, setGenerated] = useState(false);

  const generate = () => {
    const b = bookings.find(x => x.id === selectedId);
    if (!b) return;
    const chosen = DOC_TEMPLATES.find(d => d.id === docType) || DOC_TEMPLATES[0];
    const text = replaceFields(chosen.template, {
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
    <ModuleTemplate title="Documents" description="Draft and send documents (mock).">
      <div className="module-grid">
        <div className="module-card">
          <h3 className="section-title">Select Lead</h3>
          <select className="form-input" value={selectedId || ''} onChange={(e) => setSelectedId(e.target.value)}>
            <option value="">Select...</option>
            {bookings.map(b => (
              <option key={b.id} value={b.id}>{b.name} — {b.email}</option>
            ))}
          </select>
          <div style={{ marginTop: 12 }}>
            <label className="form-label">Document Template</label>
            <select className="form-input" value={docType} onChange={(e) => setDocType(e.target.value)}>
              {DOC_TEMPLATES.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
            <div style={{ marginTop: 8 }}>
              <a href="#" className="form-link">Edit Documents</a>
            </div>
          </div>
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


