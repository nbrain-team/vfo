import React, { useState, useEffect } from 'react';
import { getAutomationLogs, getBookings, logAutomation } from '../../adminData';

interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  module: string;
  client?: string;
  matter?: string;
  user: string;
  details: any;
  status: 'success' | 'warning' | 'error';
}

const AuditAdmin: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [filter, setFilter] = useState({
    module: 'all',
    client: '',
    dateFrom: '',
    dateTo: '',
    action: 'all'
  });
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  // Initialize with existing automation logs and generate some system actions
  useEffect(() => {
    const existingLogs = getAutomationLogs();
    const bookings = getBookings();
    
    // Convert existing logs and add more comprehensive data
    const systemLogs: AuditLog[] = [
      // Existing automation logs
      ...existingLogs.map(log => ({
        id: log.id,
        timestamp: log.time,
        action: log.event,
        module: 'Workflow',
        user: 'System',
        details: { note: log.detail },
        status: 'success' as const
      })),
      
      // Recent login activity
      {
        id: 'audit-1',
        timestamp: new Date().toISOString(),
        action: 'User Login',
        module: 'Authentication',
        user: 'danny@nbrain.ai',
        details: { method: 'Google OAuth', ip: '192.168.1.1' },
        status: 'success'
      },
      
      // Document generation
      {
        id: 'audit-2',
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        action: 'Document Generated',
        module: 'Vault',
        client: 'John Smith',
        matter: 'WYDAPT-2024-001',
        user: 'Matt Meuli',
        details: { document: 'Engagement Letter', template: 'WYDAPT Standard' },
        status: 'success'
      },
      
      // Form submission
      {
        id: 'audit-3',
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        action: 'Form Submitted',
        module: 'Forms',
        client: 'Jane Doe',
        user: 'Client',
        details: { form: 'Life & Legacy Planning Questionnaire', fields: 45 },
        status: 'success'
      },
      
      // CRM update
      {
        id: 'audit-4',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        action: 'Pipeline Stage Updated',
        module: 'CRM',
        client: 'Robert Johnson',
        matter: 'WYDAPT-2024-002',
        user: 'Matt Meuli',
        details: { from: 'engaged', to: 'questionnaire_received' },
        status: 'success'
      },
      
      // Email sent
      {
        id: 'audit-5',
        timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        action: 'Email Sent',
        module: 'Communication',
        client: 'Sarah Williams',
        user: 'System',
        details: { template: 'Welcome Email', subject: 'Welcome to Your Estate Planning Journey' },
        status: 'success'
      },
      
      // Payment processed
      {
        id: 'audit-6',
        timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        action: 'Payment Processed',
        module: 'Billing',
        client: 'Michael Brown',
        matter: 'WYDAPT-2024-003',
        user: 'System',
        details: { amount: 18500, method: 'LawPay', invoice: 'INV-2024-001' },
        status: 'success'
      },
      
      // Calendar sync
      {
        id: 'audit-7',
        timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
        action: 'Calendar Synced',
        module: 'Integration',
        client: 'Emily Davis',
        user: 'Matt Meuli',
        details: { events: 3, provider: 'Google Calendar' },
        status: 'success'
      },
      
      // Error log
      {
        id: 'audit-8',
        timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
        action: 'API Error',
        module: 'Integration',
        user: 'System',
        details: { error: 'Google Calendar API rate limit exceeded', retry: true },
        status: 'error'
      }
    ];
    
    setLogs(systemLogs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      const actions = [
        { action: 'Page View', module: 'Analytics', details: { page: '/platform/crm' } },
        { action: 'Data Export', module: 'Reports', details: { type: 'Client List', format: 'CSV' } },
        { action: 'Setting Updated', module: 'System', details: { setting: 'Email Notifications', value: 'enabled' } },
        { action: 'Document Viewed', module: 'Vault', details: { document: 'Trust Agreement' } },
        { action: 'Task Completed', module: 'Workflow', details: { task: 'Review Client Documents' } }
      ];
      
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      const newLog: AuditLog = {
        id: `audit-${Date.now()}`,
        timestamp: new Date().toISOString(),
        ...randomAction,
        user: Math.random() > 0.5 ? 'Matt Meuli' : 'System',
        status: 'success'
      };
      
      setLogs(prev => [newLog, ...prev].slice(0, 100)); // Keep last 100 logs
    }, 10000); // Add new log every 10 seconds
    
    return () => clearInterval(interval);
  }, []);

  const filteredLogs = logs.filter(log => {
    if (filter.module !== 'all' && log.module !== filter.module) return false;
    if (filter.client && !log.client?.toLowerCase().includes(filter.client.toLowerCase())) return false;
    if (filter.action !== 'all' && !log.action.toLowerCase().includes(filter.action.toLowerCase())) return false;
    if (filter.dateFrom && new Date(log.timestamp) < new Date(filter.dateFrom)) return false;
    if (filter.dateTo && new Date(log.timestamp) > new Date(filter.dateTo)) return false;
    return true;
  });

  const exportToCSV = () => {
    const headers = ['Timestamp', 'Action', 'Module', 'Client', 'Matter', 'User', 'Status', 'Details'];
    const rows = filteredLogs.map(log => [
      new Date(log.timestamp).toLocaleString(),
      log.action,
      log.module,
      log.client || '-',
      log.matter || '-',
      log.user,
      log.status,
      JSON.stringify(log.details)
    ]);
    
    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-log-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">System Audit Log</h1>
        <p className="page-description">Real-time system activity and user actions</p>
      </div>

      {/* Filters */}
      <div className="module-card" style={{ marginTop: 16 }}>
        <h3 className="section-title">Filters</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginTop: '12px' }}>
          <div>
            <label className="field-label">Module</label>
            <select 
              className="form-select" 
              value={filter.module} 
              onChange={e => setFilter({...filter, module: e.target.value})}
            >
              <option value="all">All Modules</option>
              <option value="Authentication">Authentication</option>
              <option value="CRM">CRM</option>
              <option value="Vault">Vault</option>
              <option value="Forms">Forms</option>
              <option value="Workflow">Workflow</option>
              <option value="Billing">Billing</option>
              <option value="Integration">Integration</option>
              <option value="Communication">Communication</option>
              <option value="System">System</option>
            </select>
          </div>
          
          <div>
            <label className="field-label">Client</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Search by client name"
              value={filter.client}
              onChange={e => setFilter({...filter, client: e.target.value})}
            />
          </div>
          
          <div>
            <label className="field-label">Date From</label>
            <input 
              type="datetime-local" 
              className="form-input"
              value={filter.dateFrom}
              onChange={e => setFilter({...filter, dateFrom: e.target.value})}
            />
          </div>
          
          <div>
            <label className="field-label">Date To</label>
            <input 
              type="datetime-local" 
              className="form-input"
              value={filter.dateTo}
              onChange={e => setFilter({...filter, dateTo: e.target.value})}
            />
          </div>
        </div>
        
        <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
          <button className="form-button" onClick={exportToCSV}>
            Export to CSV ({filteredLogs.length} records)
          </button>
          <button 
            className="button-outline" 
            onClick={() => setFilter({ module: 'all', client: '', dateFrom: '', dateTo: '', action: 'all' })}
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Logs Table */}
      <div className="module-card" style={{ marginTop: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 className="section-title">Activity Log</h3>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Showing {filteredLogs.length} of {logs.length} total records
          </div>
        </div>
        
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Action</th>
                <th>Module</th>
                <th>Client/Matter</th>
                <th>User</th>
                <th>Status</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td>{new Date(log.timestamp).toLocaleString()}</td>
                  <td>{log.action}</td>
                  <td>
                    <span className="status-badge" style={{ 
                      background: `var(--${log.module.toLowerCase().replace(' ', '-')}-bg, var(--info-bg))`,
                      color: `var(--${log.module.toLowerCase().replace(' ', '-')}-text, var(--info-text))`
                    }}>
                      {log.module}
                    </span>
                  </td>
                  <td>
                    {log.client && <div>{log.client}</div>}
                    {log.matter && <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{log.matter}</div>}
                    {!log.client && !log.matter && '-'}
                  </td>
                  <td>{log.user}</td>
                  <td>
                    <span className={`status-badge ${log.status}`}>
                      {log.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="button-outline" 
                      style={{ width: 'auto', fontSize: '12px', padding: '4px 8px' }}
                      onClick={() => setSelectedLog(log)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                    No audit records match the current filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selectedLog && (
        <div className="modal-overlay" onClick={() => setSelectedLog(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <h3 className="modal-title">Audit Log Details</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '12px', marginTop: '20px' }}>
              <strong>Timestamp:</strong>
              <span>{new Date(selectedLog.timestamp).toLocaleString()}</span>
              
              <strong>Action:</strong>
              <span>{selectedLog.action}</span>
              
              <strong>Module:</strong>
              <span>{selectedLog.module}</span>
              
              <strong>Client:</strong>
              <span>{selectedLog.client || '-'}</span>
              
              <strong>Matter:</strong>
              <span>{selectedLog.matter || '-'}</span>
              
              <strong>User:</strong>
              <span>{selectedLog.user}</span>
              
              <strong>Status:</strong>
              <span className={`status-badge ${selectedLog.status}`}>{selectedLog.status}</span>
              
              <strong>Details:</strong>
              <div style={{ 
                background: 'var(--background)', 
                padding: '12px', 
                borderRadius: '4px',
                fontSize: '13px',
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}>
                {JSON.stringify(selectedLog.details, null, 2)}
              </div>
            </div>
            
            <div className="modal-actions">
              <button className="button-outline" onClick={() => setSelectedLog(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditAdmin;