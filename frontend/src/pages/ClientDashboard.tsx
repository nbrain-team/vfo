import React, { useEffect, useMemo, useState } from 'react';
import apiClient from '../apiClient';

interface ClientDoc {
  id: string;
  title: string;
  description: string;
  category: 'Trust' | 'Engagement' | 'Meetings' | 'Other';
  requiresSignature?: boolean;
  lastModified: string;
}

const ClientDashboard: React.FC = () => {
  const userName = useMemo(() => localStorage.getItem('user_name') || 'Client', []);
  const [entityId, setEntityId] = useState<number | null>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        // Ensure a default entity exists for this user and get its id
        const ent = await apiClient.get('/users/me/default-entity');
        const eid = ent.data?.entity_id;
        setEntityId(eid);
        if (eid) {
          const docsRes = await apiClient.get(`/legal/entities/${eid}/documents/`.replace('/legal', '')); // baseURL already includes /api
          setDocuments(docsRes.data || []);
        }
      } catch (e: any) {
        setError(e?.response?.data?.detail || 'Failed to load your documents');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleUpload = async (file: File) => {
    if (!entityId) return;
    setUploading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      form.append('name', file.name);
      form.append('document_type', 'Client Upload');
      await apiClient.post(`/entities/${entityId}/documents/`, form, { headers: { 'Content-Type': 'multipart/form-data' } });
      const docsRes = await apiClient.get(`/entities/${entityId}/documents/`);
      setDocuments(docsRes.data || []);
    } catch (e: any) {
      alert(e?.response?.data?.detail || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const requestAppointment = async () => {
    try {
      await apiClient.post('/clients/request-appointment', {});
      alert('Your request has been sent to your advisor.');
    } catch (e: any) {
      alert(e?.response?.data?.detail || 'Request failed');
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, {userName}</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>Here are your documents and forms shared by your advisor.</p>

      <div className="chart-card" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{ margin: 0 }}>Your Documents</h3>
          <div style={{ display: 'flex', gap: 8 }}>
            <label className="button-outline" style={{ width: 'auto', cursor: 'pointer' }}>
              {uploading ? 'Uploading...' : 'Upload Document'}
              <input type="file" style={{ display: 'none' }} onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f); }} />
            </label>
            <button className="form-button" style={{ width: 'auto' }} onClick={requestAppointment}>Request Appointment</button>
          </div>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Uploaded</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={4}>Loading...</td></tr>
              )}
              {error && !loading && (
                <tr><td colSpan={4} style={{ color: 'var(--danger)' }}>{error}</td></tr>
              )}
              {!loading && !error && documents.map((doc: any) => (
                <tr key={doc.id}>
                  <td>{doc.name}</td>
                  <td>{doc.document_type || '-'}</td>
                  <td>{new Date(doc.upload_date || Date.now()).toLocaleString()}</td>
                  <td>
                    <a className="button-outline" href="#" onClick={(e) => { e.preventDefault(); alert('Download coming soon'); }} style={{ width: 'auto', textDecoration: 'none' }}>Download</a>
                  </td>
                </tr>
              ))}
              {!loading && !error && documents.length === 0 && (
                <tr><td colSpan={4} style={{ color: 'var(--text-secondary)' }}>No documents yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;


