import React, { useState } from 'react';
import ModuleTemplate from './ModuleTemplate';
import { getNurtureSequences, saveNurtureSequences, NurtureSequence, NurtureStep, getEmailTemplates, upsertEmailTemplate, deleteEmailTemplate, EmailTemplate, getAutomationRules, upsertAutomationRule, deleteAutomationRule, AutomationRule, getSiteConfig, saveSiteConfig } from '../../adminData';

const NurtureAdmin: React.FC = () => {
  const [seqs, setSeqs] = useState<NurtureSequence[]>(() => {
    const existing = getNurtureSequences();
    // Add default WYDAPT workflow if not exists
    if (!existing.find(s => s.id === 'wydapt-workflow')) {
      const wydaptWorkflow: NurtureSequence = {
        id: 'wydapt-workflow',
        name: 'WYDAPT Matter Workflow',
        enabled: true,
        steps: [
          { id: 'wydapt-1', type: 'email', label: 'Send WYDAPT Welcome Email (T+0)', enabled: true, templateId: 'wydapt-welcome' },
          { id: 'wydapt-2', type: 'esign_request', label: 'Send Engagement Letter for E-Sign (T+1 day)', enabled: true },
          { id: 'wydapt-3', type: 'email', label: 'Payment Instructions - $18,500 (T+2 days)', enabled: true, templateId: 'wydapt-payment' },
          { id: 'wydapt-4', type: 'form_send', label: 'Send Life & Legacy Planning Questionnaire (T+3 days)', enabled: true },
          { id: 'wydapt-5', type: 'alert_advisor', label: 'Notify Advisor: Questionnaire Due (T+7 days)', enabled: true },
          { id: 'wydapt-6', type: 'document_send', label: 'Generate & Send Trust Documents (T+14 days)', enabled: true },
          { id: 'wydapt-7', type: 'manual_review', label: 'Advisor Review: Final Documents (T+15 days)', enabled: true },
          { id: 'wydapt-8', type: 'email', label: 'Matter Complete Email (T+21 days)', enabled: true, templateId: 'wydapt-complete' }
        ]
      };
      existing.push(wydaptWorkflow);
      saveNurtureSequences(existing);
    }
    return existing;
  });
  const [showSeqModal, setShowSeqModal] = useState(false);
  const [draftName, setDraftName] = useState('New Sequence');
  const [draftEnabled, setDraftEnabled] = useState(true);
  const [draftSteps, setDraftSteps] = useState<NurtureStep[]>([
    { id: 'step-1', type: 'email', label: 'Welcome email (T+0)', enabled: true }
  ]);

  const [templates, setTemplates] = useState<EmailTemplate[]>(getEmailTemplates());
  const [showTplModal, setShowTplModal] = useState(false);
  const [rules, setRules] = useState<AutomationRule[]>(getAutomationRules());
  const [showRules, setShowRules] = useState(false);
  const [ruleName, setRuleName] = useState('Stage → Email');
  const [fromStage, setFromStage] = useState('New');
  const [toStage, setToStage] = useState('Signed');
  const [ruleTemplateId, setRuleTemplateId] = useState('');
  const [tplId, setTplId] = useState<string>('');
  const [tplName, setTplName] = useState<string>('New Template');
  const [tplSubject, setTplSubject] = useState<string>('');
  const [tplHtml, setTplHtml] = useState<string>('');

  const toggleSeq = (id: string) => {
    setSeqs(prev => prev.map(s => (s.id === id ? { ...s, enabled: !s.enabled } : s)));
  };

  const toggleStep = (sid: string, stepId: string) => {
    setSeqs(prev => prev.map(s => (s.id === sid ? { ...s, steps: s.steps.map(st => (st.id === stepId ? { ...st, enabled: !st.enabled } : st)) } : s)));
  };

  const save = () => saveNurtureSequences(seqs);

  const addDraftStep = () => {
    const next = draftSteps.length + 1;
    setDraftSteps(prev => ([...prev, { id: `step-${next}`, type: 'email', label: `Email step ${next}`, enabled: true }]));
  };

  const updateDraftStep = (idx: number, patch: Partial<NurtureStep>) => {
    setDraftSteps(prev => prev.map((s, i) => i === idx ? { ...s, ...patch } : s));
  };

  const removeDraftStep = (idx: number) => {
    setDraftSteps(prev => prev.filter((_, i) => i !== idx));
  };

  const createSequence = () => {
    const id = draftName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '') || `seq-${Date.now()}`;
    const newSeq: NurtureSequence = {
      id,
      name: draftName,
      enabled: draftEnabled,
      steps: draftSteps
    };
    const next = [...seqs, newSeq];
    setSeqs(next);
    saveNurtureSequences(next);
    setShowSeqModal(false);
  };

  const openTplEditor = (tpl?: EmailTemplate) => {
    if (tpl) {
      setTplId(tpl.id);
      setTplName(tpl.name);
      setTplSubject(tpl.subject);
      setTplHtml(tpl.html);
    } else {
      setTplId('');
      setTplName('New Template');
      setTplSubject('');
      setTplHtml('');
    }
    setShowTplModal(true);
  };

  const saveTemplate = () => {
    const id = tplId || tplName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '') || `tpl-${Date.now()}`;
    
    // Add public site header banner to the email template
    const headerBanner = `
<div style="background: #3C4630; padding: 20px; text-align: center;">
  <img src="https://agentiq-vfo-frontend.onrender.com/wy-apt-logo.png" alt="Wyoming Asset Protection" style="height: 50px; margin-bottom: 10px;" />
  <div style="color: #F3ECDD; font-size: 18px; font-weight: bold;">Wyoming Asset Protection</div>
  <div style="color: #F3ECDD; font-size: 14px;">by Matt Meuli</div>
</div>
`;
    
    // Wrap the template with the header and proper email HTML structure
    const fullHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; }
    .email-container { max-width: 600px; margin: 0 auto; }
    .email-content { padding: 20px; background: #ffffff; }
  </style>
</head>
<body>
  <div class="email-container">
    ${headerBanner}
    <div class="email-content">
      ${tplHtml}
    </div>
    <div style="background: #F3ECDD; padding: 20px; text-align: center; color: #5C5C5C; font-size: 12px;">
      <p>© ${new Date().getFullYear()} Wyoming Asset Protection Trust. All rights reserved.</p>
      <p>1621 Central Avenue #8866, Cheyenne, WY 82001</p>
    </div>
  </div>
</body>
</html>
`;
    
    const next: EmailTemplate = { id, name: tplName, subject: tplSubject, html: fullHtml };
    upsertEmailTemplate(next);
    setTemplates(getEmailTemplates());
    
    // Also save to site config for public site integration
    const siteConfig = getSiteConfig();
    const emailTemplates = siteConfig.emailTemplates || [];
    const existingIndex = emailTemplates.findIndex(t => t.id === id);
    if (existingIndex >= 0) {
      emailTemplates[existingIndex] = { id, name: tplName, subject: tplSubject, html: fullHtml };
    } else {
      emailTemplates.push({ id, name: tplName, subject: tplSubject, html: fullHtml });
    }
    saveSiteConfig({ ...siteConfig, emailTemplates });
    
    setShowTplModal(false);
  };

  const removeTemplate = (id: string) => {
    deleteEmailTemplate(id);
    setTemplates(getEmailTemplates());
  };

  const linkTemplateToStep = (seqId: string, stepId: string, templateId: string) => {
    const next = seqs.map(s => s.id === seqId ? { ...s, steps: s.steps.map(st => st.id === stepId ? { ...st, templateId } : st) } : s);
    setSeqs(next);
    saveNurtureSequences(next);
  };

  return (
    <ModuleTemplate title="Workflows" description="Configure email/SMS sequences (mock toggles).">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="button-outline" style={{ width: 'auto' }} onClick={() => setShowRules(true)}>Automations</button>
          <button className="button-outline" style={{ width: 'auto' }} onClick={() => openTplEditor()}>Manage Email Templates</button>
        </div>
        <button className="form-button" style={{ width: 'auto' }} onClick={() => setShowSeqModal(true)}>Create New Sequence</button>
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
                <div key={st.id} style={{ display: 'grid', gap: 8 }}>
                  <label className="button-outline" style={{ padding: '8px 12px', display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input type="checkbox" checked={st.enabled} onChange={() => toggleStep(s.id, st.id)} />
                      <span>{st.type.toUpperCase()} — {st.label}</span>
                    </span>
                    {st.type === 'email' && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <select className="form-input" value={st.templateId || ''} onChange={(e) => linkTemplateToStep(s.id, st.id, e.target.value)} style={{ width: 220 }}>
                          <option value="">Select template...</option>
                          {templates.map(t => (
                            <option key={t.id} value={t.id}>{t.name}</option>
                          ))}
                        </select>
                        <button className="button-outline" style={{ width: 'auto' }} onClick={() => openTplEditor(templates.find(t => t.id === st.templateId))}>Edit</button>
                      </span>
                    )}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12 }}>
        <button className="form-button" style={{ width: 'auto' }} onClick={save}>Save Sequences</button>
      </div>

      {showSeqModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div className="module-card" style={{ width: 520, maxWidth: '90%' }}>
            <h3 className="section-title">New Sequence</h3>
            <div style={{ display: 'grid', gap: 12, marginTop: 8 }}>
              <div>
                <label className="form-label">Name</label>
                <input className="form-input" value={draftName} onChange={(e) => setDraftName(e.target.value)} />
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input type="checkbox" checked={draftEnabled} onChange={(e) => setDraftEnabled(e.target.checked)} /> Enabled
              </label>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 className="section-title" style={{ fontSize: 14 }}>Steps</h4>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="button-outline" style={{ width: 'auto' }} onClick={addDraftStep}>Add Step</button>
                    <button className="button-outline" style={{ width: 'auto' }} onClick={() => {
                      const newStep: NurtureStep = {
                        id: `step-${Date.now()}`,
                        type: 'manual_review',
                        label: 'Rule: Check if WYDAPT matter',
                        enabled: true
                      };
                      setDraftSteps([...draftSteps, newStep]);
                    }}>Add Rule</button>
                  </div>
                </div>
                <div style={{ display: 'grid', gap: 8, marginTop: 8 }}>
                  {draftSteps.map((st, idx) => (
                    <div key={st.id} style={{ display: 'grid', gridTemplateColumns: '120px 1fr auto', gap: 8, alignItems: 'center' }}>
                      <select className="form-input" value={st.type} onChange={(e) => updateDraftStep(idx, { type: e.target.value as NurtureStep['type'] })}>
                        <option value="email">Email</option>
                        <option value="sms">SMS</option>
                        <option value="form_send">Form send</option>
                        <option value="esign_request">eSign request</option>
                        <option value="alert_advisor">Alert Advisor</option>
                        <option value="document_send">Document send</option>
                        <option value="manual_review">Manual Review/Edit</option>
                      </select>
                      <input className="form-input" value={st.label} onChange={(e) => updateDraftStep(idx, { label: e.target.value })} />
                      <button className="button-outline" style={{ width: 'auto' }} onClick={() => removeDraftStep(idx)}>Remove</button>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <button className="button-outline" style={{ width: 'auto' }} onClick={() => setShowSeqModal(false)}>Cancel</button>
                <button className="form-button" style={{ width: 'auto' }} onClick={createSequence}>Create</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showTplModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div className="module-card" style={{ width: 760, maxWidth: '95%' }}>
            <h3 className="section-title">{tplId ? 'Edit Template' : 'New Template'}</h3>
            <div style={{ display: 'grid', gap: 12, marginTop: 8 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label className="form-label">Template Name</label>
                  <input className="form-input" value={tplName} onChange={(e) => setTplName(e.target.value)} />
                </div>
                <div>
                  <label className="form-label">Subject</label>
                  <input className="form-input" value={tplSubject} onChange={(e) => setTplSubject(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="form-label">HTML Content</label>
                <textarea className="form-input" style={{ minHeight: 280, fontFamily: 'monospace' }} value={tplHtml} onChange={(e) => setTplHtml(e.target.value)} placeholder="<h1>Welcome</h1>..." />
                <div style={{ marginTop: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
                  Supports full HTML, including inline styles and merge tags. The public site header banner will be automatically added.
                </div>
                <div style={{ marginTop: 8 }}>
                  <strong>Available merge tags:</strong>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
                    {['{{name}}', '{{email}}', '{{phone}}', '{{appointment_date}}', '{{appointment_time}}', '{{advisor_name}}', '{{matter_type}}'].map(tag => (
                      <code key={tag} style={{ 
                        background: 'var(--background)', 
                        padding: '2px 6px', 
                        borderRadius: '4px',
                        fontSize: '11px',
                        cursor: 'pointer'
                      }} onClick={() => setTplHtml(prev => prev + ' ' + tag)}>
                        {tag}
                      </code>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'space-between' }}>
                <div>
                  {tplId && (
                    <button className="button-outline" style={{ width: 'auto' }} onClick={() => { removeTemplate(tplId); setTemplates(getEmailTemplates()); setShowTplModal(false); }}>Delete</button>
                  )}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="button-outline" style={{ width: 'auto' }} onClick={() => setShowTplModal(false)}>Cancel</button>
                  <button className="form-button" style={{ width: 'auto' }} onClick={saveTemplate}>Save Template</button>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 20 }}>
              <h4 className="section-title" style={{ fontSize: 14 }}>Existing Templates</h4>
              <div style={{ display: 'grid', gap: 8, marginTop: 8 }}>
                {templates.length === 0 && (
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>No templates yet.</div>
                )}
                {templates.map(t => (
                  <div key={t.id} className="button-outline" style={{ padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.subject}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="button-outline" style={{ width: 'auto' }} onClick={() => openTplEditor(t)}>Edit</button>
                      <button className="button-outline" style={{ width: 'auto' }} onClick={() => { deleteEmailTemplate(t.id); setTemplates(getEmailTemplates()); }}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {showRules && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div className="module-card" style={{ width: 940, maxWidth: '95%', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 className="section-title">Workflow Automations</h3>
            
            {/* WYDAPT Quick Rules */}
            <div style={{ marginBottom: '20px', padding: '16px', background: 'var(--card-hover)', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>WYDAPT Matter Quick Rules</h4>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button className="button-outline" style={{ width: 'auto' }} onClick={() => {
                  const wydaptRules = [
                    { id: 'wydapt-auto-1', name: 'WYDAPT: Signed → Send Payment Instructions', fromStage: 'Signed', toStage: 'Signed', templateId: 'wydapt-payment' },
                    { id: 'wydapt-auto-2', name: 'WYDAPT: Payment Received → Send Questionnaire', fromStage: 'Paid', toStage: 'questionnaire_received', templateId: 'wydapt-questionnaire' },
                    { id: 'wydapt-auto-3', name: 'WYDAPT: Questionnaire Complete → Generate Documents', fromStage: 'questionnaire_received', toStage: 'matter_in_process', action: 'generate_docs' },
                    { id: 'wydapt-auto-4', name: 'WYDAPT: Documents Signed → Matter Complete', fromStage: 'matter_in_process', toStage: 'matter_fulfilled', templateId: 'wydapt-complete' }
                  ];
                  wydaptRules.forEach(rule => {
                    upsertAutomationRule({
                      id: rule.id,
                      name: rule.name,
                      event: 'stage_change',
                      conditions: { stage_from: rule.fromStage as any, stage_to: rule.toStage as any },
                      actions: rule.templateId ? [{ type: 'send_email_template', templateId: rule.templateId }] : [{ type: 'log', message: 'WYDAPT action triggered' }]
                    } as any);
                  });
                  setRules(getAutomationRules());
                  alert('WYDAPT automation rules added!');
                }}>Add All WYDAPT Rules</button>
                
                <button className="button-outline" style={{ width: 'auto' }} onClick={() => {
                  upsertAutomationRule({
                    id: 'wydapt-payment-check',
                    name: 'WYDAPT: Check Payment Status',
                    event: 'daily_check',
                    conditions: { matter_type: 'WYDAPT', days_since_signed: 3 },
                    actions: [{ type: 'alert_advisor', message: 'Check WYDAPT payment status' }]
                  } as any);
                  setRules(getAutomationRules());
                }}>Add Payment Check Rule</button>
                
                <button className="button-outline" style={{ width: 'auto' }} onClick={() => {
                  upsertAutomationRule({
                    id: 'wydapt-annual-review',
                    name: 'WYDAPT: Schedule Annual Review',
                    event: 'matter_complete',
                    conditions: { matter_type: 'WYDAPT' },
                    actions: [{ type: 'schedule_task', task: 'Annual Review', delay_days: 365 }]
                  } as any);
                  setRules(getAutomationRules());
                }}>Add Annual Review Rule</button>
              </div>
            </div>
            
            <div style={{ display: 'grid', gap: 12, marginTop: 8 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12 }}>
                <div>
                  <label className="form-label">Rule Name</label>
                  <input className="form-input" value={ruleName} onChange={(e) => setRuleName(e.target.value)} />
                </div>
                <div>
                  <label className="form-label">Trigger: From Stage</label>
                  <select className="form-input" value={fromStage} onChange={(e) => setFromStage(e.target.value)}>
                    {['New','Booked','Paid','Signed','engaged','questionnaire_received','matter_in_process','matter_fulfilled'].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="form-label">Action: To Stage</label>
                  <select className="form-input" value={toStage} onChange={(e) => setToStage(e.target.value)}>
                    {['New','Booked','Paid','Signed','engaged','questionnaire_received','matter_in_process','matter_fulfilled'].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="form-label">Action: Send Email</label>
                  <select className="form-input" value={ruleTemplateId} onChange={(e) => setRuleTemplateId(e.target.value)}>
                    <option value="">None</option>
                    {templates.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <button className="button-outline" style={{ width: 'auto' }} onClick={() => setShowRules(false)}>Close</button>
                <button className="form-button" style={{ width: 'auto' }} onClick={() => {
                  const id = `rule-${Date.now()}`;
                  const actions = ruleTemplateId ? [{ type: 'send_email_template', templateId: ruleTemplateId }] : [{ type: 'log', message: 'Stage changed' }];
                  upsertAutomationRule({ id, name: ruleName, event: 'stage_change', conditions: { stage_from: fromStage as any, stage_to: toStage as any }, actions } as any);
                  setRules(getAutomationRules());
                  setShowRules(false);
                }}>Add Rule</button>
              </div>
            </div>
            <div style={{ marginTop: 20 }}>
              <h4 className="section-title" style={{ fontSize: 14 }}>Existing Rules</h4>
              <div style={{ display: 'grid', gap: 8, marginTop: 8 }}>
                {rules.length === 0 && <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>No rules yet.</div>}
                {rules.map(r => (
                  <div key={r.id} className="button-outline" style={{ padding: '8px 12px', display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>{r.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>On {r.event}: {r.conditions.stage_from} → {r.conditions.stage_to}</div>
                    </div>
                    <button className="button-outline" style={{ width: 'auto' }} onClick={() => { deleteAutomationRule(r.id); setRules(getAutomationRules()); }}>Delete</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </ModuleTemplate>
  );
};

export default NurtureAdmin;


