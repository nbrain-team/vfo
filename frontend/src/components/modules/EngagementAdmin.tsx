import React, { useMemo, useState } from 'react';
import ModuleTemplate from './ModuleTemplate';
import { getBookings, updateBooking, getProductCatalog, saveProductCatalog, ProductCatalog, addDocVersion } from '../../adminData';

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
  const [catalog, setCatalog] = useState<ProductCatalog>(getProductCatalog());
  const [showCatalog, setShowCatalog] = useState(false);

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
    addDocVersion({ id: `v-${Date.now()}`, bookingId: b.id, name: 'Engagement Letter v1', content: text, status: 'Draft', createdAt: new Date().toISOString() });
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
            <button className="button-outline" style={{ width: 'auto' }} onClick={() => setShowCatalog(true)}>Product Catalog</button>
          </div>
        </div>

        <div className="module-card">
          <h3 className="section-title">Draft Preview</h3>
          <textarea className="form-input" style={{ minHeight: 240 }} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Draft will appear here" />
        </div>
      </div>

      {showCatalog && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div className="module-card" style={{ width: 760, maxWidth: '95%' }}>
            <h3 className="section-title">Product Catalog & Add-ons</h3>
            <div style={{ display: 'grid', gap: 12, marginTop: 8 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label className="form-label">Base Label</label>
                  <input className="form-input" value={catalog.base_label} onChange={(e) => setCatalog({ ...catalog, base_label: e.target.value })} />
                </div>
                <div>
                  <label className="form-label">Base Price</label>
                  <input className="form-input" type="number" value={catalog.base_price} onChange={(e) => setCatalog({ ...catalog, base_price: Number(e.target.value) })} />
                </div>
              </div>
              <div>
                <h4 className="section-title" style={{ fontSize: 14 }}>Add-ons</h4>
                <div style={{ display: 'grid', gap: 8, marginTop: 8 }}>
                  {catalog.add_ons.map((a, idx) => (
                    <div key={a.key} className="button-outline" style={{ padding: '8px 12px', display: 'grid', gridTemplateColumns: '24px 1fr 120px 80px', alignItems: 'center', gap: 8 }}>
                      <input type="checkbox" checked={a.enabled} onChange={(e) => {
                        const next = [...catalog.add_ons];
                        next[idx] = { ...a, enabled: e.target.checked };
                        setCatalog({ ...catalog, add_ons: next });
                      }} />
                      <div>{a.label}</div>
                      <input className="form-input" type="number" value={a.price} onChange={(e) => {
                        const next = [...catalog.add_ons];
                        next[idx] = { ...a, price: Number(e.target.value) };
                        setCatalog({ ...catalog, add_ons: next });
                      }} />
                      <button className="button-outline" style={{ width: 'auto' }} onClick={() => {
                        const next = catalog.add_ons.filter(x => x.key !== a.key);
                        setCatalog({ ...catalog, add_ons: next });
                      }}>Remove</button>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 8 }}>
                  <button className="button-outline" style={{ width: 'auto' }} onClick={() => {
                    const key = `addon-${Date.now()}`;
                    setCatalog({ ...catalog, add_ons: [...catalog.add_ons, { key, label: 'New Add-on', price: 0, enabled: false }] });
                  }}>Add Add-on</button>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <button className="button-outline" style={{ width: 'auto' }} onClick={() => setShowCatalog(false)}>Close</button>
                <button className="form-button" style={{ width: 'auto' }} onClick={() => { saveProductCatalog(catalog); setShowCatalog(false); }}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </ModuleTemplate>
  );
};

export default EngagementAdmin;


