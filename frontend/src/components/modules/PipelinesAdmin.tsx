import React, { useMemo, useState } from 'react';
import ModuleTemplate from './ModuleTemplate';
import { getWorkflows, upsertWorkflow, deleteWorkflow, WorkflowDefinition } from '../../adminData';

const PipelinesAdmin: React.FC = () => {
  const [workflows, setWorkflows] = useState<WorkflowDefinition[]>(getWorkflows());
  const [showImport, setShowImport] = useState(false);
  const [jsonText, setJsonText] = useState('');

  const importJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      const list: WorkflowDefinition[] = Array.isArray(parsed) ? parsed : [parsed];
      list.forEach(w => upsertWorkflow({
        workflow_key: w.workflow_key,
        name: w.name,
        pipeline: w.pipeline,
        stages: (w.stages || []).map((s: any) => ({ stage_key: s.stage_key, name: s.name, sla: s.sla, owner_role: s.owner_role }))
      }));
      setWorkflows(getWorkflows());
      setShowImport(false);
      setJsonText('');
    } catch (e) {
      alert('Invalid JSON');
    }
  };

  const remove = (key: string) => {
    deleteWorkflow(key);
    setWorkflows(getWorkflows());
  };

  return (
    <ModuleTemplate title="Pipelines" description="Import and manage workflow pipelines and stages (mock).">
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
        <button className="form-button" style={{ width: 'auto' }} onClick={() => setShowImport(true)}>Import Workflow JSON</button>
      </div>

      <div className="module-grid">
        {workflows.map(w => (
          <div key={w.workflow_key} className="module-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="section-title">{w.name}</h3>
              <button className="button-outline" style={{ width: 'auto' }} onClick={() => remove(w.workflow_key)}>Delete</button>
            </div>
            <div style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>Pipeline: {w.pipeline}</div>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Stage Key</th>
                    <th>Name</th>
                    <th>SLA</th>
                    <th>Owner</th>
                  </tr>
                </thead>
                <tbody>
                  {w.stages.map(s => (
                    <tr key={s.stage_key}>
                      <td>{s.stage_key}</td>
                      <td>{s.name}</td>
                      <td>{s.sla || '-'}</td>
                      <td>{s.owner_role || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
        {workflows.length === 0 && (
          <div className="module-card">
            <div style={{ color: 'var(--text-secondary)' }}>No workflows imported yet.</div>
          </div>
        )}
      </div>

      {showImport && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div className="module-card" style={{ width: 840, maxWidth: '95%' }}>
            <h3 className="section-title">Import Workflow JSON</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 6 }}>
              Paste a single workflow object or an array of workflows. The mermaid doc’s JSON packs will import here.
            </p>
            <textarea className="form-input" style={{ minHeight: 280, fontFamily: 'monospace' }} value={jsonText} onChange={(e) => setJsonText(e.target.value)} placeholder='{"workflow_key":"wyoming_apt_v1",...}' />
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 8 }}>
              <button className="button-outline" style={{ width: 'auto' }} onClick={() => setShowImport(false)}>Cancel</button>
              <button className="form-button" style={{ width: 'auto' }} onClick={importJson} disabled={!jsonText.trim()}>Import</button>
            </div>
          </div>
        </div>
      )}
    </ModuleTemplate>
  );
};

export default PipelinesAdmin;


