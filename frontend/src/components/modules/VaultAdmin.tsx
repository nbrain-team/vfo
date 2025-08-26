import React, { useEffect, useMemo, useState } from 'react';
import ModuleTemplate from './ModuleTemplate';
import { getBookings, updateBooking, getDraftingQueue, spawnDraftingTasksForSigned, DraftTask, getDocVersions, updateDocVersion, getFundingItems, updateFundingItem, getMaintenance, getAnnualReviews, updateAnnualReview } from '../../adminData';

const VaultAdmin: React.FC = () => {
  const bookings = useMemo(() => getBookings(), []);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = bookings.find(b => b.id === selectedId);
  const [tasks, setTasks] = useState<DraftTask[]>([]);
  const [versions, setVersions] = useState<any[]>([]);
  const [funding, setFunding] = useState<any[]>([]);
  const maintenance = getMaintenance();
  const [annual, setAnnual] = useState<any[]>([]);

  useEffect(() => {
    spawnDraftingTasksForSigned();
    setTasks(getDraftingQueue());
  }, []);

  useEffect(() => {
    if (selectedId) {
      setVersions(getDocVersions(selectedId));
      setFunding(getFundingItems(selectedId));
      setAnnual(getAnnualReviews().filter((a: any) => a.bookingId === selectedId));
    }
  }, [selectedId]);

  const addMockDoc = () => {
    if (!selected) return;
    const docs = selected.docs || [];
    const newDoc = {
      id: String(Date.now()),
      title: 'Engagement Letter (Signed).pdf',
      type: 'pdf',
      createdAt: new Date().toISOString(),
      url: '#'
    };
    updateBooking(selected.id, { docs: [...docs, newDoc] });
    window.location.reload();
  };

  return (
    <ModuleTemplate title="Client Vault" description="Per-lead documents (mock).">
      <div className="module-grid">
        <div className="module-card">
          <h3 className="section-title">Select Lead</h3>
          <select className="form-input" value={selectedId || ''} onChange={(e) => setSelectedId(e.target.value)}>
            <option value="">Select...</option>
            {bookings.map(b => (
              <option key={b.id} value={b.id}>{b.name} — {b.email}</option>
            ))}
          </select>
          <button className="form-button" style={{ width: 'auto', marginTop: 12 }} onClick={addMockDoc} disabled={!selected}>Add Mock Signed Doc</button>
        </div>

        <div className="module-card">
          <h3 className="section-title">Documents</h3>
          {!selected && <div style={{ color: 'var(--text-secondary)' }}>Select a lead to view documents.</div>}
          {selected && (
            <div className="table-container" style={{ marginTop: 12 }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Created</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {(selected.docs || []).map(d => (
                    <tr key={d.id}>
                      <td>{d.title}</td>
                      <td>{d.type}</td>
                      <td>{new Date(d.createdAt).toLocaleString()}</td>
                      <td><a className="button-outline" href={d.url} style={{ textDecoration: 'none', width: 'auto' }}>Download</a></td>
                    </tr>
                  ))}
                  {(selected.docs || []).length === 0 && (
                    <tr><td colSpan={4} style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>No documents yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="module-card">
          <h3 className="section-title">Drafting Queue</h3>
          <div className="table-container" style={{ marginTop: 12 }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Lead</th>
                  <th>Task</th>
                  <th>Due</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(t => (
                  <tr key={t.id}>
                    <td>{bookings.find(b => b.id === t.bookingId)?.name || t.bookingId}</td>
                    <td>{t.label}</td>
                    <td>{t.due ? new Date(t.due).toLocaleDateString() : '-'}</td>
                    <td><span className="status-badge pending">{t.status}</span></td>
                  </tr>
                ))}
                {tasks.length === 0 && (
                  <tr>
                    <td colSpan={4} style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>No drafting tasks.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="module-card">
          <h3 className="section-title">Document Versions</h3>
          {!selected && <div style={{ color: 'var(--text-secondary)' }}>Select a lead to view versions.</div>}
          {selected && (
            <div className="table-container" style={{ marginTop: 12 }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {versions.map(v => (
                    <tr key={v.id}>
                      <td>{v.name}</td>
                      <td><span className="status-badge pending">{v.status}</span></td>
                      <td>{new Date(v.createdAt).toLocaleString()}</td>
                      <td>
                        <button className="button-outline" style={{ width: 'auto' }} onClick={() => { updateDocVersion(v.id, { status: 'Redlined' }); setVersions(getDocVersions(selected.id)); }}>Mark Redlined</button>
                        <button className="form-button" style={{ width: 'auto', marginLeft: 8 }} onClick={() => { updateDocVersion(v.id, { status: 'Approved' }); setVersions(getDocVersions(selected.id)); }}>Approve</button>
                      </td>
                    </tr>
                  ))}
                  {versions.length === 0 && (
                    <tr><td colSpan={4} style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>No versions.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="module-card">
          <h3 className="section-title">Funding & Titling</h3>
          {!selected && <div style={{ color: 'var(--text-secondary)' }}>Select a lead to view funding items.</div>}
          {selected && (
            <div className="table-container" style={{ marginTop: 12 }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Status</th>
                    <th>Proof</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {funding.map(i => (
                    <tr key={i.id}>
                      <td>{i.label}</td>
                      <td><span className="status-badge pending">{i.status}</span></td>
                      <td>{i.proof ? 'Attached' : '-'}</td>
                      <td>
                        <button className="button-outline" style={{ width: 'auto' }} onClick={() => { updateFundingItem(i.id, { status: 'Submitted' }); setFunding(getFundingItems(selected.id)); }}>Submit Proof</button>
                        <button className="form-button" style={{ width: 'auto', marginLeft: 8 }} onClick={() => { updateFundingItem(i.id, { status: 'Verified' }); setFunding(getFundingItems(selected.id)); }}>Verify</button>
                      </td>
                    </tr>
                  ))}
                  {funding.length === 0 && (
                    <tr><td colSpan={4} style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>No funding items.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="module-card">
          <h3 className="section-title">Maintenance</h3>
          <div style={{ marginTop: 12 }}>
            {maintenance.length === 0 && <div style={{ color: 'var(--text-secondary)' }}>No enrollments yet.</div>}
            {maintenance.map(m => (
              <div key={m.bookingId} className="button-outline" style={{ padding: '8px 12px', marginBottom: 8 }}>
                Enrolled: {getBookings().find(b => b.id === m.bookingId)?.name || m.bookingId} — {new Date(m.enrolledAt).toLocaleDateString()}
              </div>
            ))}
          </div>
        </div>

        <div className="module-card">
          <h3 className="section-title">Annual Review</h3>
          {!selected && <div style={{ color: 'var(--text-secondary)' }}>Select a lead to view annual reviews.</div>}
          {selected && (
            <div className="table-container" style={{ marginTop: 12 }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Stage</th>
                    <th>Next</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {annual.map(a => (
                    <tr key={a.id}>
                      <td>{a.id}</td>
                      <td><span className="status-badge pending">{a.stage}</span></td>
                      <td>{a.nextAt ? new Date(a.nextAt).toLocaleDateString() : '-'}</td>
                      <td>
                        <button className="button-outline" style={{ width: 'auto' }} onClick={() => { updateAnnualReview(a.id, { stage: 'Scheduled', nextAt: new Date(Date.now() + 30*24*60*60*1000).toISOString() }); setAnnual(getAnnualReviews().filter((x:any)=>x.bookingId===selected.id)); }}>Schedule</button>
                        <button className="form-button" style={{ width: 'auto', marginLeft: 8 }} onClick={() => { updateAnnualReview(a.id, { stage: 'Completed' }); setAnnual(getAnnualReviews().filter((x:any)=>x.bookingId===selected.id)); }}>Complete</button>
                      </td>
                    </tr>
                  ))}
                  {annual.length === 0 && (
                    <tr><td colSpan={4} style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>No annual reviews.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </ModuleTemplate>
  );
};

export default VaultAdmin;


