import React, { useState } from 'react';
import ModuleTemplate from './ModuleTemplate';
import { getNurtureSequences, saveNurtureSequences, NurtureSequence } from '../../adminData';

const NurtureAdmin: React.FC = () => {
  const [seqs, setSeqs] = useState<NurtureSequence[]>(getNurtureSequences());

  const toggleSeq = (id: string) => {
    setSeqs(prev => prev.map(s => (s.id === id ? { ...s, enabled: !s.enabled } : s)));
  };

  const toggleStep = (sid: string, stepId: string) => {
    setSeqs(prev => prev.map(s => (s.id === sid ? { ...s, steps: s.steps.map(st => (st.id === stepId ? { ...st, enabled: !st.enabled } : st)) } : s)));
  };

  const save = () => saveNurtureSequences(seqs);

  return (
    <ModuleTemplate title="Nurture Sequences" description="Configure email/SMS sequences (mock toggles).">
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
        <button className="form-button" style={{ width: 'auto' }}>Create New Sequence</button>
      </div>
      <div className="module-grid">
        {seqs.map(s => (
          <div key={s.id} className="module-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="section-title">{s.name}</h3>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input type="checkbox" checked={s.enabled} onChange={() => toggleSeq(s.id)} /> Enabled
              </label>
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              {s.steps.map(st => (
                <label key={st.id} className="button-outline" style={{ padding: '8px 12px', display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input type="checkbox" checked={st.enabled} onChange={() => toggleStep(s.id, st.id)} />
                  <span>{st.type.toUpperCase()} — {st.label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12 }}>
        <button className="form-button" style={{ width: 'auto' }} onClick={save}>Save Sequences</button>
      </div>
    </ModuleTemplate>
  );
};

export default NurtureAdmin;


