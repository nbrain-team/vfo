import React, { useState } from 'react';
import ModuleTemplate from './ModuleTemplate';
import { getNurtureSequences, saveNurtureSequences, NurtureSequence, NurtureStep, getEmailTemplates, upsertEmailTemplate, deleteEmailTemplate, EmailTemplate, getAutomationRules, upsertAutomationRule, deleteAutomationRule, AutomationRule, getSiteConfig, saveSiteConfig } from '../../adminData';

const NurtureAdmin: React.FC = () => {
  const initializeWYDAPTTemplates = () => {
    const templates = getEmailTemplates();
    const wydaptTemplates = [
      {
        id: 'wydapt-booking-confirmation',
        name: 'WYDAPT Booking Confirmation',
        subject: 'Your WYDAPT Consultation is Confirmed',
        html: `Hi {{name}},<br><br>
Thank you for booking your 30-minute Wyoming Domestic Asset Protection Trust (WYDAPT) consultation with me.<br><br>
<strong>Here are the details:</strong><br>
Date/Time: {{appointment_date}} at {{appointment_time}}<br>
Location: {{meeting_link}}<br><br>
This is your first step toward protecting your assets and ensuring your family's legacy is safe for generations.<br><br>
<strong>To make the most of our time together:</strong><br>
- Bring clarity on your goals and any questions you'd like answered.<br>
- I'll walk you through exactly how the WYDAPT structure works — and why it is the strongest available under U.S. law.<br><br>
I look forward to speaking with you.<br><br>
Warm regards,<br>
Matt Meuli<br>
Wyoming Asset Protection Trust Attorney, LLC`
      },
      {
        id: 'wydapt-no-show',
        name: 'WYDAPT No-Show Follow-Up',
        subject: 'We Missed You — Let\'s Reschedule',
        html: `Hi {{name}},<br><br>
I noticed we weren't able to connect for your scheduled WYDAPT consultation. I understand — life happens.<br><br>
Your consultation fee is non-refundable, but I want to make sure you get the full value you've already invested.<br><br>
👉 Simply reply to this email with a time that works for you, and we'll reschedule.<br><br>
This conversation could be the difference between leaving your wealth exposed or securing it for future generations.<br><br>
Best,<br>
Matt`
      },
      {
        id: 'wydapt-engagement-letter',
        name: 'WYDAPT Engagement Letter',
        subject: 'Your WYDAPT Engagement Letter & Next Steps',
        html: `Hi {{name}},<br><br>
Thank you for your time today. As discussed, I've prepared your Engagement Letter to officially begin building your Wyoming Domestic Asset Protection Trust.<br><br>
Attached, you'll also find a WYDAPT Diagram to visualize how the trust protects your assets.<br><br>
👉 Please review and sign the Engagement Letter here: {{esign_link}}<br><br>
Once signed, we'll proceed immediately with the next step: securing payment and beginning the setup of your complete WYDAPT.<br><br>
Your legacy deserves nothing less.<br><br>
Gratefully,<br>
Matt`
      },
      {
        id: 'wydapt-payment-instructions',
        name: 'WYDAPT Payment Instructions',
        subject: 'Begin Your WYDAPT Setup — Payment Instructions',
        html: `Hi {{name}},<br><br>
Now that your Engagement Letter is in place, the next step is to secure your trust by completing payment of $18,500.<br><br>
This covers all legal drafting, customization, and compliance for your WYDAPT.<br><br>
👉 Click here to pay securely via LawPay: {{payment_link}}<br><br>
Please complete payment within the next 48 hours so we can begin setup immediately.<br><br>
This is the moment your protection moves from "planned" to "real."<br><br>
To your legacy,<br>
Matt`
      },
      {
        id: 'wydapt-questionnaire',
        name: 'WYDAPT Questionnaire Send',
        subject: 'Complete Your Asset Protection Questionnaire',
        html: `Hi {{name}},<br><br>
Congratulations — your WYDAPT setup is officially underway.<br><br>
The next step is to complete your Asset Protection Trust Questionnaire. This gives me the details I need to tailor your trust precisely to your assets, goals, and family needs.<br><br>
👉 Complete your questionnaire here: {{questionnaire_link}}<br><br>
It should take 20–30 minutes. Please complete it right away so we can keep your project on schedule.<br><br>
The sooner we have your answers, the sooner your assets are fully protected.<br><br>
Warmly,<br>
Matt`
      },
      {
        id: 'wydapt-matter-complete',
        name: 'WYDAPT Matter Complete',
        subject: 'Congratulations — Your WYDAPT is Complete',
        html: `Hi {{name}},<br><br>
Congratulations — your Wyoming Domestic Asset Protection Trust is complete.<br><br>
<strong>This means:</strong><br>
- Your assets are now shielded under one of the strongest legal frameworks available in the U.S.<br>
- You've secured a personalized structure aligned with your family's goals.<br>
- You've joined a select group of individuals who have taken a serious step toward multi-generational protection.<br><br>
Attached are your final trust documents. They are also securely stored in your Client Vault for safekeeping.<br><br>
<strong>👉 Next Steps:</strong><br>
- Save these documents in both physical and digital form.<br>
- Schedule a walkthrough with me if you'd like a guided review.<br>
- Share only with your most trusted advisors.<br><br>
Thank you for trusting me with this critical part of your family's future. It's been an honor to serve you.<br><br>
Warm regards,<br>
Matt Meuli<br>
Wyoming Asset Protection Trust Attorney, LLC`
      }
    ];
    
    // Add rescue sequence templates
    const rescueTemplates = [
      // Didn't Sign Engagement Letter
      {
        id: 'wydapt-rescue-sign-day2',
        name: 'Rescue: Still Need Your Signature',
        subject: 'Still Need Your Signature to Begin Your WYDAPT',
        html: `Hi {{name}},<br><br>I noticed your WYDAPT Engagement Letter is still unsigned.<br><br>Your trust setup cannot begin until this critical document is signed. Every day of delay is another day your assets remain unprotected.<br><br>👉 Sign your Engagement Letter now: {{esign_link}}<br><br>If you have questions or concerns, simply reply to this email. I'm here to help.<br><br>Best,<br>Matt`
      },
      {
        id: 'wydapt-rescue-sign-day5',
        name: 'Rescue: WYDAPT on Hold - Signature',
        subject: 'Your WYDAPT Is on Hold — Action Required',
        html: `Hi {{name}},<br><br>Your Wyoming Domestic Asset Protection Trust is currently on hold because your Engagement Letter remains unsigned.<br><br>We've reserved time on our calendar specifically for your matter, but we cannot proceed without your signature.<br><br>👉 Sign now to move forward: {{esign_link}}<br><br>Remember: asset protection only works if it's in place before you need it.<br><br>Sincerely,<br>Matt`
      },
      {
        id: 'wydapt-rescue-sign-day7',
        name: 'Rescue: Final Reminder - Signature',
        subject: 'Final Reminder: Sign Your WYDAPT Engagement Letter',
        html: `Hi {{name}},<br><br>This is your final reminder.<br><br>Your WYDAPT file will be closed if your Engagement Letter is not signed by {{deadline_date}}.<br><br>Don't let this opportunity to protect your family's wealth slip away.<br><br>👉 Sign here before it's too late: {{esign_link}}<br><br>Matt`
      },
      // Didn't Pay Invoice
      {
        id: 'wydapt-rescue-pay-day2',
        name: 'Rescue: Payment Needed to Start',
        subject: 'Your WYDAPT Setup Can\'t Start Until Payment Is Received',
        html: `Hi {{name}},<br><br>Your signed Engagement Letter shows you're serious about protecting your assets. Now we need to complete payment so we can begin the actual work.<br><br>Your investment of $18,500 covers all legal drafting, customization, and compliance for your WYDAPT.<br><br>👉 Complete payment now: {{payment_link}}<br><br>The sooner you pay, the sooner your assets are protected.<br><br>Best,<br>Matt`
      },
      {
        id: 'wydapt-rescue-pay-day4',
        name: 'Rescue: WYDAPT Stuck at Payment',
        subject: 'Your WYDAPT Is Stuck at Payment — Let\'s Fix That',
        html: `Hi {{name}},<br><br>I see you've signed your Engagement Letter (great!), but your WYDAPT setup is stuck because payment hasn't been received.<br><br>Every day without protection is a day of unnecessary risk.<br><br>👉 Secure your trust now: {{payment_link}}<br><br>If you're experiencing any issues with payment or have questions, please reply immediately so we can help.<br><br>To your protection,<br>Matt`
      },
      {
        id: 'wydapt-rescue-pay-day7',
        name: 'Rescue: Final Notice - Payment',
        subject: 'Final Notice: Secure Your WYDAPT Setup Today',
        html: `Hi {{name}},<br><br>This is your final notice regarding payment for your WYDAPT setup.<br><br>Your file will be closed if payment is not received by {{deadline_date}}.<br><br>Don't let bureaucratic delays put your wealth at risk.<br><br>👉 Pay now to protect your legacy: {{payment_link}}<br><br>Matt`
      },
      // Didn't Submit Questionnaire
      {
        id: 'wydapt-rescue-quest-day3',
        name: 'Rescue: Questionnaire Needed',
        subject: 'WYDAPT Questionnaire — Please Complete Today',
        html: `Hi {{name}},<br><br>Great news — your payment has been processed! Now I need your completed questionnaire to customize your trust documents.<br><br>This questionnaire ensures your WYDAPT is tailored precisely to your family's unique situation.<br><br>👉 Complete it here (takes ~20 min): {{questionnaire_link}}<br><br>The sooner you complete this, the sooner your documents will be ready.<br><br>Best,<br>Matt`
      },
      {
        id: 'wydapt-rescue-quest-day5',
        name: 'Rescue: WYDAPT on Hold - Questionnaire',
        subject: 'Your WYDAPT Is on Hold — Questionnaire Needed',
        html: `Hi {{name}},<br><br>Your WYDAPT document preparation is on hold because we haven't received your completed questionnaire.<br><br>Our legal team is ready to draft your documents, but we need your specific information first.<br><br>👉 Complete your questionnaire now: {{questionnaire_link}}<br><br>If you're stuck on any questions, simply reply and I'll help clarify.<br><br>Looking forward to moving forward,<br>Matt`
      },
      {
        id: 'wydapt-rescue-quest-day7',
        name: 'Rescue: Final Reminder - Questionnaire',
        subject: 'Final Reminder: Complete WYDAPT Questionnaire',
        html: `Hi {{name}},<br><br>This is your final reminder to complete your WYDAPT questionnaire.<br><br>Your file will be closed if not received by {{deadline_date}}.<br><br>You've already invested $18,500 — don't let it go to waste.<br><br>👉 Complete now: {{questionnaire_link}}<br><br>Matt`
      }
    ];
    
    // Add templates if they don't exist
    [...wydaptTemplates, ...rescueTemplates].forEach(tpl => {
      if (!templates.find(t => t.id === tpl.id)) {
        upsertEmailTemplate(tpl);
      }
    });
  };

  const [seqs, setSeqs] = useState<NurtureSequence[]>(() => {
    const existing = getNurtureSequences();
    initializeWYDAPTTemplates();
    
    // Remove old WYDAPT workflow and add the updated one
    const filtered = existing.filter(s => s.id !== 'wydapt-workflow');
    
    const wydaptWorkflow: NurtureSequence = {
      id: 'wydapt-workflow',
      name: 'WYDAPT Full Matter Workflow',
      enabled: true,
      steps: [
        { id: 'wydapt-1', type: 'email', label: 'Booking Confirmation (T+0)', enabled: true, templateId: 'wydapt-booking-confirmation' },
        { id: 'wydapt-1a', type: 'sms', label: 'SMS: Booking Confirmation (T+5min)', enabled: true, smsContent: 'Hi {{name}}, it\'s Matt Meuli. Your WYDAPT consult is confirmed for {{appointment_date}} at {{appointment_time}}. Add this to your calendar — this step protects your legacy.' },
        { id: 'wydapt-2', type: 'email', label: 'No-Show Follow-Up (If missed)', enabled: true, templateId: 'wydapt-no-show' },
        { id: 'wydapt-2a', type: 'sms', label: 'SMS: No-Show Follow-Up (T+30min)', enabled: true, smsContent: 'Hi {{name}}, looks like we missed each other for your WYDAPT consult. Your fee is already applied — just reply here or email me to reschedule.' },
        { id: 'wydapt-3', type: 'email', label: 'Engagement Letter & Diagram (T+15min)', enabled: true, templateId: 'wydapt-engagement-letter' },
        { id: 'wydapt-3a', type: 'sms', label: 'SMS: Engagement Letter Sent (T+1hr)', enabled: true, smsContent: 'Hi {{name}}, thanks for today\'s call. I\'ve sent your WYDAPT Engagement Letter + diagram. Please review & sign here: {{esign_link}}' },
        { id: 'wydapt-4', type: 'email', label: 'Payment Instructions - $18,500 (T+1day)', enabled: true, templateId: 'wydapt-payment-instructions' },
        { id: 'wydapt-4a', type: 'sms', label: 'SMS: Payment Reminder (Same morning)', enabled: true, smsContent: 'Hi {{name}}, this is Matt. Your WYDAPT payment link is here: {{payment_link}}. Once paid, we\'ll start drafting your trust docs.' },
        { id: 'wydapt-5', type: 'email', label: 'Questionnaire Send (After payment)', enabled: true, templateId: 'wydapt-questionnaire' },
        { id: 'wydapt-5a', type: 'sms', label: 'SMS: Questionnaire Reminder (T+5min)', enabled: true, smsContent: 'Hi {{name}}, thanks for your payment. Next step: complete your WYDAPT Questionnaire here: {{questionnaire_link}}. Takes ~20 min.' },
        { id: 'wydapt-6', type: 'alert_advisor', label: 'Advisor Alert: Questionnaire Received', enabled: true },
        { id: 'wydapt-7', type: 'document_send', label: 'Generate Trust Documents (T+14days)', enabled: true },
        { id: 'wydapt-8', type: 'manual_review', label: 'Advisor Manual Review (T+15days)', enabled: true },
        { id: 'wydapt-9', type: 'email', label: 'Matter Complete Email (T+21days)', enabled: true, templateId: 'wydapt-matter-complete' },
        { id: 'wydapt-9a', type: 'sms', label: 'SMS: Matter Complete (Same day)', enabled: true, smsContent: 'Hi {{name}}, congrats — your WYDAPT is complete 🎉. Docs are in your Client Vault & attached via email. Book walkthrough here: {{walkthrough_link}}' }
      ]
    };
    
    // Add rescue sequences
    const rescueSequences = [
      {
        id: 'wydapt-rescue-signature',
        name: 'WYDAPT Rescue: Didn\'t Sign Engagement Letter',
        enabled: true,
        steps: [
          { id: 'rescue-sign-1', type: 'email', label: 'Day 2: Still Need Your Signature', enabled: true, templateId: 'wydapt-rescue-sign-day2' },
          { id: 'rescue-sign-1a', type: 'sms', label: 'Day 2 SMS: Sign reminder', enabled: true, smsContent: 'Hi {{name}}, your WYDAPT setup can\'t start until your Engagement Letter is signed. Here\'s your link: {{esign_link}}' },
          { id: 'rescue-sign-2', type: 'email', label: 'Day 5: WYDAPT on Hold', enabled: true, templateId: 'wydapt-rescue-sign-day5' },
          { id: 'rescue-sign-2a', type: 'sms', label: 'Day 5 SMS: WYDAPT paused', enabled: true, smsContent: 'Hi {{name}}, your WYDAPT is paused. Sign your Engagement Letter now to protect your assets: {{esign_link}}' },
          { id: 'rescue-sign-3', type: 'email', label: 'Day 7: Final Reminder', enabled: true, templateId: 'wydapt-rescue-sign-day7' },
          { id: 'rescue-sign-3a', type: 'sms', label: 'Day 7 SMS: Final reminder', enabled: true, smsContent: 'Final reminder: sign your WYDAPT Engagement Letter by {{deadline_date}} or your file closes. {{esign_link}}' }
        ]
      },
      {
        id: 'wydapt-rescue-payment',
        name: 'WYDAPT Rescue: Didn\'t Pay Invoice',
        enabled: true,
        steps: [
          { id: 'rescue-pay-1', type: 'email', label: 'Day 2: Payment Needed', enabled: true, templateId: 'wydapt-rescue-pay-day2' },
          { id: 'rescue-pay-1a', type: 'sms', label: 'Day 2 SMS: Payment reminder', enabled: true, smsContent: 'Hi {{name}}, payment of $18,500 is due to start your WYDAPT. Secure link: {{payment_link}}' },
          { id: 'rescue-pay-2', type: 'email', label: 'Day 4: WYDAPT Stuck at Payment', enabled: true, templateId: 'wydapt-rescue-pay-day4' },
          { id: 'rescue-pay-2a', type: 'sms', label: 'Day 4 SMS: Payment waiting', enabled: true, smsContent: 'Reminder: your WYDAPT is waiting on payment. Protect your legacy now: {{payment_link}}' },
          { id: 'rescue-pay-3', type: 'email', label: 'Day 7: Final Notice', enabled: true, templateId: 'wydapt-rescue-pay-day7' },
          { id: 'rescue-pay-3a', type: 'sms', label: 'Day 7 SMS: Final notice', enabled: true, smsContent: 'Final notice — pay by {{deadline_date}} to keep your WYDAPT active. Link: {{payment_link}}' }
        ]
      },
      {
        id: 'wydapt-rescue-questionnaire',
        name: 'WYDAPT Rescue: Didn\'t Submit Questionnaire',
        enabled: true,
        steps: [
          { id: 'rescue-quest-1', type: 'email', label: 'Day 3: Questionnaire Needed', enabled: true, templateId: 'wydapt-rescue-quest-day3' },
          { id: 'rescue-quest-1a', type: 'sms', label: 'Day 3 SMS: Complete questionnaire', enabled: true, smsContent: 'Hi {{name}}, complete your WYDAPT Questionnaire here: {{questionnaire_link}}. It only takes ~20 min.' },
          { id: 'rescue-quest-2', type: 'email', label: 'Day 5: WYDAPT on Hold', enabled: true, templateId: 'wydapt-rescue-quest-day5' },
          { id: 'rescue-quest-2a', type: 'sms', label: 'Day 5 SMS: Questionnaire waiting', enabled: true, smsContent: 'Your WYDAPT is on hold. Please finish your Questionnaire so we can draft your trust docs: {{questionnaire_link}}' },
          { id: 'rescue-quest-3', type: 'email', label: 'Day 7: Final Reminder', enabled: true, templateId: 'wydapt-rescue-quest-day7' },
          { id: 'rescue-quest-3a', type: 'sms', label: 'Day 7 SMS: Final reminder', enabled: true, smsContent: 'Final reminder: complete your WYDAPT Questionnaire by {{deadline_date}} or your file closes. {{questionnaire_link}}' }
        ]
      }
    ];
    
    filtered.push(wydaptWorkflow);
    rescueSequences.forEach(seq => {
      if (!filtered.find(s => s.id === seq.id)) {
        filtered.push(seq);
      }
    });
    
    saveNurtureSequences(filtered);
    return filtered;
  });
  const [showSeqModal, setShowSeqModal] = useState(false);
  const [editingSeqId, setEditingSeqId] = useState<string | null>(null);
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

  const saveSequence = () => {
    if (editingSeqId) {
      // Update existing sequence
      const next = seqs.map(s => 
        s.id === editingSeqId 
          ? { ...s, name: draftName, enabled: draftEnabled, steps: draftSteps }
          : s
      );
      setSeqs(next);
      saveNurtureSequences(next);
    } else {
      // Create new sequence
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
    }
    setShowSeqModal(false);
    setEditingSeqId(null);
  };

  const editSequence = (seq: NurtureSequence) => {
    setEditingSeqId(seq.id);
    setDraftName(seq.name);
    setDraftEnabled(seq.enabled);
    setDraftSteps([...seq.steps]);
    setShowSeqModal(true);
  };

  const deleteSequence = (id: string) => {
    const next = seqs.filter(s => s.id !== id);
    setSeqs(next);
    saveNurtureSequences(next);
  };

  const duplicateStep = (idx: number) => {
    const step = draftSteps[idx];
    const newStep = { ...step, id: `${step.id}-copy-${Date.now()}`, label: `${step.label} (Copy)` };
    const newSteps = [...draftSteps];
    newSteps.splice(idx + 1, 0, newStep);
    setDraftSteps(newSteps);
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
        <button className="form-button" style={{ width: 'auto' }} onClick={() => {
          setEditingSeqId(null);
          setDraftName('New Sequence');
          setDraftEnabled(true);
          setDraftSteps([{ id: 'step-1', type: 'email', label: 'Welcome email (T+0)', enabled: true }]);
          setShowSeqModal(true);
        }}>Create New Sequence</button>
      </div>
      <div className="module-grid">
        {seqs.map(s => (
          <div key={s.id} className="module-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="section-title">{s.name}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button className="button-outline" style={{ width: 'auto', padding: '4px 8px', fontSize: '12px' }} onClick={() => editSequence(s)}>Edit</button>
                <button className="button-outline" style={{ width: 'auto', padding: '4px 8px', fontSize: '12px' }} onClick={() => deleteSequence(s.id)}>Delete</button>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input type="checkbox" checked={s.enabled} onChange={() => toggleSeq(s.id)} /> Enabled
                </label>
              </div>
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
                    {st.type === 'sms' && st.smsContent && (
                      <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontStyle: 'italic', maxWidth: '300px' }}>
                        "{st.smsContent.substring(0, 50)}..."
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
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }} onClick={() => { setShowSeqModal(false); setEditingSeqId(null); }}>
          <div className="module-card" style={{ width: 520, maxWidth: '90%' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="section-title">{editingSeqId ? 'Edit Sequence' : 'New Sequence'}</h3>
              <button 
                onClick={() => { setShowSeqModal(false); setEditingSeqId(null); }}
                style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: 'var(--text-secondary)' }}
              >
                ×
              </button>
            </div>
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
                    <div key={st.id} style={{ display: 'grid', gap: 8 }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr auto', gap: 8, alignItems: 'center' }}>
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
                        <div style={{ display: 'flex', gap: 4 }}>
                          <button className="button-outline" style={{ width: 'auto', padding: '4px 8px', fontSize: '12px' }} onClick={() => duplicateStep(idx)}>Copy</button>
                          <button className="button-outline" style={{ width: 'auto' }} onClick={() => removeDraftStep(idx)}>Remove</button>
                        </div>
                      </div>
                      {st.type === 'sms' && (
                        <div style={{ marginLeft: '128px', marginRight: '100px' }}>
                          <textarea 
                            className="form-input" 
                            value={st.smsContent || ''} 
                            onChange={(e) => updateDraftStep(idx, { smsContent: e.target.value })}
                            placeholder="SMS message content (160 chars max)"
                            rows={2}
                            style={{ fontSize: '13px' }}
                          />
                          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                            {(st.smsContent || '').length}/160 characters
                          </div>
                        </div>
                      )}
                      {st.type === 'email' && (
                        <div style={{ marginLeft: '128px', marginRight: '100px' }}>
                          <select 
                            className="form-input" 
                            value={st.templateId || ''} 
                            onChange={(e) => updateDraftStep(idx, { templateId: e.target.value })}
                          >
                            <option value="">Select email template...</option>
                            {templates.map(t => (
                              <option key={t.id} value={t.id}>{t.name}</option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <button className="button-outline" style={{ width: 'auto' }} onClick={() => setShowSeqModal(false)}>Cancel</button>
                <button className="form-button" style={{ width: 'auto' }} onClick={saveSequence}>{editingSeqId ? 'Save' : 'Create'}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showTplModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }} onClick={() => setShowTplModal(false)}>
          <div className="module-card" style={{ width: 760, maxWidth: '95%' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="section-title">{tplId ? 'Edit Template' : 'New Template'}</h3>
              <button 
                onClick={() => setShowTplModal(false)}
                style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: 'var(--text-secondary)' }}
              >
                ×
              </button>
            </div>
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
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }} onClick={() => setShowRules(false)}>
          <div className="module-card" style={{ width: 940, maxWidth: '95%', maxHeight: '90vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="section-title">Workflow Automations</h3>
              <button 
                onClick={() => setShowRules(false)}
                style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: 'var(--text-secondary)' }}
              >
                ×
              </button>
            </div>
            
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


