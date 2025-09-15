import React, { useEffect, useMemo, useState } from 'react';
import apiClient from '../apiClient';

interface Overview {
  total_advisors: number;
  active_advisors: number;
  total_admins: number;
  total_clients: number;
}

interface AdvisorRow {
  id: number;
  email: string;
  name: string | null;
  username?: string | null;
  role: string;
  is_active: boolean;
  created_at?: string | null;
  client_count?: number;
}

const SuperAdmin: React.FC = () => {
  const [overview, setOverview] = useState<Overview | null>(null);
  const [advisors, setAdvisors] = useState<AdvisorRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [query, setQuery] = useState('');

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [ovr, adv] = await Promise.all([
        apiClient.get('/superadmin/overview'),
        apiClient.get('/superadmin/advisors'),
      ]);
      setOverview(ovr.data);
      setAdvisors(adv.data);
    } catch (e: any) {
      setError(e?.response?.data?.detail || 'Failed to load Super Admin data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return advisors;
    return advisors.filter(a =>
      (a.email || '').toLowerCase().includes(q) ||
      (a.name || '').toLowerCase().includes(q) ||
      (a.username || '').toLowerCase().includes(q)
    );
  }, [advisors, query]);

  const updateAdvisor = async (row: AdvisorRow, patch: Partial<AdvisorRow>) => {
    try {
      setSavingId(row.id);
      const payload: any = {};
      if (patch.name !== undefined) payload.name = patch.name;
      if (patch.username !== undefined) payload.username = patch.username;
      if (patch.is_active !== undefined) payload.is_active = patch.is_active;
      if (patch.role !== undefined) payload.role = patch.role;
      await apiClient.patch(`/superadmin/advisors/${row.id}`, payload);
      await fetchData();
    } catch (e: any) {
      alert(e?.response?.data?.detail || 'Update failed');
    } finally {
      setSavingId(null);
    }
  };

  if (loading) {
    return <div className="page-container"><div className="chart-card">Loading Super Admin...</div></div>;
  }
  if (error) {
    return <div className="page-container"><div className="chart-card" style={{ color: 'var(--danger)' }}>{error}</div></div>;
  }

  return (
    <div className="page-container">
      <h2 className="page-title">Super Admin</h2>

      {overview && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 16 }}>
          <div className="stat-card">
            <div className="stat-label">Total Advisors</div>
            <div className="stat-value">{overview.total_advisors}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Active Advisors</div>
            <div className="stat-value">{overview.active_advisors}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Admins</div>
            <div className="stat-value">{overview.total_admins}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Clients</div>
            <div className="stat-value">{overview.total_clients}</div>
          </div>
        </div>
      )}

      <div className="chart-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h3 style={{ margin: 0 }}>Advisors & Admins</h3>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email, username"
            className="form-input"
            style={{ maxWidth: 280 }}
          />
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Username</th>
                <th>Role</th>
                <th>Active</th>
                <th>Clients</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(row => (
                <tr key={row.id}>
                  <td>
                    <input
                      defaultValue={row.name || ''}
                      className="form-input"
                      onBlur={(e) => e.target.value !== (row.name || '') && updateAdvisor(row, { name: e.target.value })}
                    />
                  </td>
                  <td>{row.email}</td>
                  <td>
                    <input
                      defaultValue={row.username || ''}
                      className="form-input"
                      onBlur={(e) => e.target.value !== (row.username || '') && updateAdvisor(row, { username: e.target.value })}
                    />
                  </td>
                  <td>
                    <select
                      defaultValue={row.role}
                      className="form-input"
                      onChange={(e) => updateAdvisor(row, { role: e.target.value })}
                    >
                      <option value="Advisor">Advisor</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </td>
                  <td>
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <input
                        type="checkbox"
                        defaultChecked={row.is_active}
                        onChange={(e) => updateAdvisor(row, { is_active: e.target.checked })}
                      />
                      <span>{row.is_active ? 'Active' : 'Inactive'}</span>
                    </label>
                  </td>
                  <td>{row.client_count ?? '-'}</td>
                  <td>
                    {savingId === row.id ? (
                      <span>Saving...</span>
                    ) : (
                      <button className="button-outline" onClick={() => updateAdvisor(row, {})}>Refresh</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SuperAdmin;


