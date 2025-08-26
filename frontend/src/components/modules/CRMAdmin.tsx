import React, { useEffect, useMemo, useState } from 'react';
import ModuleTemplate from './ModuleTemplate';
import { getBookings, updateBooking, Booking, seedMockDataIfEmpty, addBooking, saveBookings, seedFundingItemsIfMissing, enrollMaintenance, logAutomation, evaluateAutomations, getEmailTemplates, addOutboxEmail } from '../../adminData';
import apiClient from '../../apiClient';

const CRMAdmin: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [bookingsState, setBookingsState] = useState(getBookings());

  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPkg, setNewPkg] = useState('');
  const [newSlot, setNewSlot] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newStage, setNewStage] = useState<Booking['stage']>('New');

  const [showImport, setShowImport] = useState(false);
  const [importText, setImportText] = useState('');
  const [showSchedule, setShowSchedule] = useState(false);
  const [schedDateTime, setSchedDateTime] = useState('');
  const [amount, setAmount] = useState<number>(375);
  const [zoomLink, setZoomLink] = useState<string>('https://zoom.us/j/123456789');

  useEffect(() => {
    if (bookingsState.length === 0) {
      seedMockDataIfEmpty();
      setBookingsState(getBookings());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bookings = useMemo(() => bookingsState, [bookingsState]);
  const selected = bookings.find(b => b.id === selectedId);

  const resetAdd = () => {
    setNewName(''); setNewEmail(''); setNewPkg(''); setNewSlot(''); setNewPhone(''); setNewStage('New');
  };

  const syncLeadToBackend = async (b: Booking) => {
    try {
      const contactRes = await apiClient.post('/contacts/', {
        name: b.name,
        email: b.email,
        phone: b.phone || undefined,
      });
      const contactId = contactRes.data?.id;
      if (contactId) {
        const matterTitle = b.pkg ? `Lead: ${b.pkg}` : 'Lead';
        await apiClient.post('/matters/', {
          title: matterTitle,
          pipeline: 'CRM',
          stage: b.stage,
          contact_id: contactId,
        });
      }
    } catch (e) {
      // Non-fatal in demo mode; backend may not be reachable in mock mode
      console.warn('CRM sync failed or skipped:', e);
    }
  };

  const handleAdd = async () => {
    if (!newName || !newEmail) return;
    const nowIso = new Date().toISOString();
    const b: Booking = {
      id: `lead-${Date.now()}`,
      createdAt: nowIso,
      appointmentAt: newSlot || undefined,
      name: newName,
      email: newEmail,
      guests: [],
      pkg: newPkg,
      slot: newSlot,
      phone: newPhone || undefined,
      stage: newStage,
      notes: [],
      docs: []
    };
    addBooking(b);
    setBookingsState(getBookings());
    setShowAdd(false);
    resetAdd();
    // fire-and-forget backend persistence
    syncLeadToBackend(b);
  };

  const parseCsv = (text: string): Booking[] => {
    // Expected headers (case-insensitive): name,email,pkg,slot,stage,phone
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) return [];
    const header = lines[0].split(',').map(h => h.trim().toLowerCase());
    const idx = (k: string) => header.indexOf(k);
    const out: Booking[] = [];
    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',');
      const name = cols[idx('name')]?.trim();
      const email = cols[idx('email')]?.trim();
      if (!name || !email) continue;
      const pkg = cols[idx('pkg')]?.trim() || '';
      const slot = cols[idx('slot')]?.trim() || '';
      const stageRaw = (cols[idx('stage')]?.trim() || 'New') as Booking['stage'];
      const phone = cols[idx('phone')]?.trim() || '';
      const nowIso = new Date().toISOString();
      out.push({
        id: `lead-${Date.now()}-${i}`,
        createdAt: nowIso,
        appointmentAt: slot ? new Date(slot).toISOString() : undefined,
        name,
        email,
        guests: [],
        pkg,
        slot,
        phone: phone || undefined,
        stage: ['New','Booked','Paid','Signed','Onboarding','Completed'].includes(stageRaw) ? stageRaw : 'New',
        notes: [],
        docs: []
      });
    }
    return out;
  };

  const handleImportText = () => {
    const rows = parseCsv(importText);
    if (rows.length === 0) { setShowImport(false); return; }
    const current = getBookings();
    const next = [...current, ...rows];
    saveBookings(next);
    setBookingsState(getBookings());
    setShowImport(false);
    setImportText('');
    // sync to backend
    rows.forEach(r => syncLeadToBackend(r));
  };

  const handleImportFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const text = (reader.result as string) || '';
      const rows = parseCsv(text);
      const current = getBookings();
      const next = [...current, ...rows];
      saveBookings(next);
      setBookingsState(getBookings());
      setShowImport(false);
      // sync to backend
      rows.forEach(r => syncLeadToBackend(r));
    };
    reader.readAsText(file);
  };

  return (
    <ModuleTemplate
      title="CRM & Leads"
      description="View and manage intake, stages, and notes (mock)."
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <div />
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="button-outline" style={{ width: 'auto' }} onClick={() => setShowImport(true)}>Import CSV</button>
          <button className="form-button" style={{ width: 'auto' }} onClick={() => setShowAdd(true)}>Add Lead</button>
        </div>
      </div>

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
                {bookings.length === 0 && (
                  <tr>
                    <td colSpan={4} style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>No leads yet.</td>
                  </tr>
                )}
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
                      const fromStage = selected.stage;
                      if (s === 'Signed') { seedFundingItemsIfMissing(selected.id); }
                      if (s === 'Completed') { enrollMaintenance(selected.id); logAutomation('maintenance_enrolled', selected.id); }
                      const acts = evaluateAutomations('stage_change', { bookingId: selected.id, fromStage, toStage: s });
                      const b = getBookings().find(x => x.id === selected.id);
                      acts.forEach(a => {
                        if (a.type === 'move_stage') {
                          updateBooking(selected.id, { stage: a.stage });
                          logAutomation('auto_move_stage', `${fromStage}→${a.stage}`);
                        } else if (a.type === 'send_email_template') {
                          const tpl = getEmailTemplates().find(t => t.id === a.templateId);
                          if (tpl && b) {
                            addOutboxEmail({ id: `em-${Date.now()}`, bookingId: b.id, templateId: tpl.id, subject: tpl.subject, html: tpl.html, createdAt: new Date().toISOString() });
                            logAutomation('send_email_template', tpl.id);
                          }
                        } else if (a.type === 'log') {
                          logAutomation('rule_log', a.message);
                        }
                      });
                      window.location.reload();
                    }}
                  >
                    Mark {s}
                  </button>
                ))}
              </div>
              <div>
                <button className="form-button" style={{ width: 'auto', marginTop: 8 }} onClick={() => setShowSchedule(true)}>Schedule & Collect Payment</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {showSchedule && selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div className="module-card" style={{ width: 520, maxWidth: '90%' }}>
            <h3 className="section-title">Schedule & Collect Payment</h3>
            <div style={{ display: 'grid', gap: 12, marginTop: 8 }}>
              <div>
                <label className="form-label">Date & Time</label>
                <input className="form-input" type="datetime-local" value={schedDateTime} onChange={(e) => setSchedDateTime(e.target.value)} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 12 }}>
                <div>
                  <label className="form-label">Amount (USD)</label>
                  <input className="form-input" type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
                </div>
                <div>
                  <label className="form-label">Zoom Link</label>
                  <input className="form-input" value={zoomLink} onChange={(e) => setZoomLink(e.target.value)} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <button className="button-outline" style={{ width: 'auto' }} onClick={() => setShowSchedule(false)}>Cancel</button>
                <button className="form-button" style={{ width: 'auto' }} onClick={() => {
                  // Compute slot display
                  const dt = schedDateTime ? new Date(schedDateTime) : new Date();
                  const slot = dt.toLocaleString();
                  updateBooking(selected.id, { stage: 'Paid', appointmentAt: dt.toISOString(), slot, price: { amount, currency: 'USD' } });
                  logAutomation('payment_collected', `${amount}`);
                  logAutomation('zoom_created', zoomLink);
                  setShowSchedule(false);
                  window.location.reload();
                }}>Confirm</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAdd && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div className="module-card" style={{ width: 520, maxWidth: '90%' }}>
            <h3 className="section-title">Add Lead</h3>
            <div style={{ display: 'grid', gap: 12, marginTop: 8 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label className="form-label">Name</label>
                  <input className="form-input" value={newName} onChange={(e) => setNewName(e.target.value)} />
                </div>
                <div>
                  <label className="form-label">Email</label>
                  <input className="form-input" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label className="form-label">Package</label>
                  <input className="form-input" value={newPkg} onChange={(e) => setNewPkg(e.target.value)} placeholder="consult-30 / wy-apt-assess" />
                </div>
                <div>
                  <label className="form-label">Stage</label>
                  <select className="form-input" value={newStage} onChange={(e) => setNewStage(e.target.value as Booking['stage'])}>
                    {(['New','Booked','Paid','Signed','Onboarding','Completed'] as Booking['stage'][]).map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="form-label">Slot (display text)</label>
                <input className="form-input" value={newSlot} onChange={(e) => setNewSlot(e.target.value)} placeholder="Wed 11:30 AM MT" />
              </div>
              <div>
                <label className="form-label">Phone (optional)</label>
                <input className="form-input" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} placeholder="+1 (555) 123-4567" />
              </div>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <button className="button-outline" style={{ width: 'auto' }} onClick={() => { setShowAdd(false); resetAdd(); }}>Cancel</button>
                <button className="form-button" style={{ width: 'auto' }} onClick={handleAdd} disabled={!newName || !newEmail}>Add Lead</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showImport && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div className="module-card" style={{ width: 720, maxWidth: '95%' }}>
            <h3 className="section-title">Import CSV</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 6 }}>
              Expected headers: <code>name,email,pkg,slot,stage,phone</code>. You can either upload a file or paste CSV below.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <input type="file" accept=".csv" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImportFile(f); }} />
              <button className="button-outline" style={{ width: 'auto' }} onClick={() => {
                const demo = 'name,email,pkg,slot,stage,phone\nJohn Doe,john@example.com,consult-30,Wed 1:00 PM MT,New,+1 (555) 222-3333';
                setImportText(demo);
              }}>Insert Example</button>
            </div>
            <div style={{ marginTop: 8 }}>
              <textarea className="form-input" style={{ minHeight: 180, fontFamily: 'monospace' }} value={importText} onChange={(e) => setImportText(e.target.value)} placeholder="Paste CSV here" />
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 8 }}>
              <button className="button-outline" style={{ width: 'auto' }} onClick={() => { setShowImport(false); setImportText(''); }}>Cancel</button>
              <button className="form-button" style={{ width: 'auto' }} onClick={handleImportText} disabled={!importText.trim()}>Import</button>
            </div>
          </div>
        </div>
      )}
    </ModuleTemplate>
  );
};

export default CRMAdmin;


