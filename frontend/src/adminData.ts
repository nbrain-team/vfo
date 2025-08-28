export type Booking = {
  id: string;
  createdAt: string;
  appointmentAt?: string;
  name: string;
  email: string;
  guests: string[];
  pkg: string;
  slot: string;
  referralSource?: string;
  referralOther?: string;
  stateOfResidence?: string;
  citizenship?: 'yes' | 'no' | 'other' | '';
  citizenshipOther?: string;
  maritalStatus?: string;
  priority?: string[];
  priorityOther?: string;
  assetTypes?: string[];
  assetTypesOther?: string;
  urgency?: string;
  assetValueRange?: string;
  phone?: string;
  price?: { amount: number; currency: string };
  stage: 'New' | 'Booked' | 'Paid' | 'Signed' | 'Onboarding' | 'Completed';
  notes?: string[];
  docs?: { id: string; title: string; type: string; createdAt: string; url?: string }[];
};

const BOOKINGS_KEY = 'wyAPT_bookings';
const SITE_KEY = 'wyAPT_siteConfig';

export function getBookings(): Booking[] {
  try {
    const raw = localStorage.getItem(BOOKINGS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveBookings(bookings: Booking[]) {
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
}

export function addBooking(booking: Booking) {
  const all = getBookings();
  all.push(booking);
  saveBookings(all);
}

export function updateBooking(id: string, patch: Partial<Booking>) {
  const all = getBookings().map(b => (b.id === id ? { ...b, ...patch } : b));
  saveBookings(all);
}

export function getBookingById(id: string): Booking | undefined {
  return getBookings().find(b => b.id === id);
}

export type SiteConfig = {
  videoUrl?: string;
  primaryColor?: string;
  goldStart?: string;
  goldEnd?: string;
  logoPath?: string;
  logoDataUrl?: string;
  headline?: string;
  subhead?: string;
  ctaText?: string;
  ctaHref?: string;
  images?: string[];
  paywallEnabled?: boolean;
  emailTemplates?: EmailTemplate[];
  advisorName?: string;
  advisorDescription?: string;
  advisorPhone?: string;
  contactPhone?: string;
  contactEmail?: string;
  contactAddress?: string;
  testimonials?: string;
  blogPosts?: any[];
};

export function getSiteConfig(): SiteConfig {
  try {
    const raw = localStorage.getItem(SITE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveSiteConfig(patch: Partial<SiteConfig>) {
  const current = getSiteConfig();
  localStorage.setItem(SITE_KEY, JSON.stringify({ ...current, ...patch }));
}

// Nurture sequences (mock)
export type NurtureStep = { 
  id: string; 
  type: 'email' | 'sms' | 'form_send' | 'esign_request' | 'alert_advisor' | 'document_send' | 'manual_review'; 
  label: string; 
  enabled: boolean; 
  templateId?: string;
  smsContent?: string;
};
export type NurtureSequence = { id: string; name: string; enabled: boolean; steps: NurtureStep[] };

const NURTURE_KEY = 'wyAPT_nurture';

export function getNurtureSequences(): NurtureSequence[] {
  try {
    const raw = localStorage.getItem(NURTURE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  // defaults
  const defaults: NurtureSequence[] = [
    {
      id: 'lead-paid-consult',
      name: 'Lead → Paid Consult',
      enabled: true,
      steps: [
        { id: 'email-welcome', type: 'email', label: 'Welcome email (T+0)', enabled: true },
        { id: 'email-reminder', type: 'email', label: 'Reminder email (T+2d)', enabled: true },
        { id: 'sms-nudge', type: 'sms', label: 'SMS nudge (T+3d)', enabled: false }
      ]
    }
  ];
  localStorage.setItem(NURTURE_KEY, JSON.stringify(defaults));
  return defaults;
}

export function saveNurtureSequences(seqs: NurtureSequence[]) {
  localStorage.setItem(NURTURE_KEY, JSON.stringify(seqs));
}

export function updateNurtureSequence(id: string, patch: Partial<NurtureSequence>) {
  const seqs = getNurtureSequences().map(s => (s.id === id ? { ...s, ...patch } : s));
  saveNurtureSequences(seqs);
}

// Email Templates (mock)
export type EmailTemplate = { id: string; name: string; subject: string; html: string };

const EMAIL_TEMPLATES_KEY = 'wyAPT_email_templates';

export function getEmailTemplates(): EmailTemplate[] {
  try {
    const raw = localStorage.getItem(EMAIL_TEMPLATES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveEmailTemplates(templates: EmailTemplate[]) {
  localStorage.setItem(EMAIL_TEMPLATES_KEY, JSON.stringify(templates));
}

export function upsertEmailTemplate(t: EmailTemplate) {
  const all = getEmailTemplates();
  const idx = all.findIndex(x => x.id === t.id);
  if (idx >= 0) all[idx] = t; else all.push(t);
  saveEmailTemplates(all);
}

export function deleteEmailTemplate(id: string) {
  const all = getEmailTemplates().filter(t => t.id !== id);
  saveEmailTemplates(all);
}

// Workflows (Pipelines)
export type WorkflowStage = {
  stage_key: string;
  name: string;
  sla?: string;
  owner_role?: string;
};

export type WorkflowDefinition = {
  workflow_key: string;
  name: string;
  pipeline: string;
  stages: WorkflowStage[];
};

const WORKFLOWS_KEY = 'wyAPT_workflows';

export function getWorkflows(): WorkflowDefinition[] {
  try {
    const raw = localStorage.getItem(WORKFLOWS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveWorkflows(workflows: WorkflowDefinition[]) {
  localStorage.setItem(WORKFLOWS_KEY, JSON.stringify(workflows));
}

export function upsertWorkflow(wf: WorkflowDefinition) {
  const all = getWorkflows();
  const idx = all.findIndex(w => w.workflow_key === wf.workflow_key);
  if (idx >= 0) all[idx] = wf; else all.push(wf);
  saveWorkflows(all);
}

export function deleteWorkflow(workflow_key: string) {
  const all = getWorkflows().filter(w => w.workflow_key !== workflow_key);
  saveWorkflows(all);
}

// Product Catalog (mock)
export type CatalogAddOn = { key: string; label: string; price: number; enabled: boolean };
export type ProductCatalog = { base_offering_key: string; base_label: string; base_price: number; add_ons: CatalogAddOn[] };

const CATALOG_KEY = 'wyAPT_catalog';

export function getProductCatalog(): ProductCatalog {
  try {
    const raw = localStorage.getItem(CATALOG_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  const def: ProductCatalog = {
    base_offering_key: 'life_legacy_base',
    base_label: 'Life & Legacy Base',
    base_price: 950,
    add_ons: [
      { key: 'advanced_healthcare_directives', label: 'Advanced Healthcare Directives', price: 250, enabled: true },
      { key: 'kids_protection_plan', label: 'Kids Protection Plan', price: 300, enabled: false }
    ]
  };
  localStorage.setItem(CATALOG_KEY, JSON.stringify(def));
  return def;
}

export function saveProductCatalog(c: ProductCatalog) {
  localStorage.setItem(CATALOG_KEY, JSON.stringify(c));
}

// Drafting Queue (mock)
export type DraftTask = { id: string; bookingId: string; label: string; status: 'Queued' | 'In Progress' | 'Done'; due?: string };

const DRAFTING_KEY = 'wyAPT_drafting_queue';

export function getDraftingQueue(): DraftTask[] {
  try {
    const raw = localStorage.getItem(DRAFTING_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function saveDraftingQueue(tasks: DraftTask[]) {
  localStorage.setItem(DRAFTING_KEY, JSON.stringify(tasks));
}

export function spawnDraftingTasksForSigned() {
  const tasks = getDraftingQueue();
  const signed = getBookings().filter(b => b.stage === 'Signed');
  const hasTasks = new Set(tasks.map(t => t.bookingId));
  const now = Date.now();
  const fmt = (ms: number) => new Date(ms).toISOString();
  signed.forEach(b => {
    if (hasTasks.has(b.id)) return;
    const pack = [
      { label: 'Assemble facts', days: 1 },
      { label: 'Generate core docs', days: 3 },
      { label: 'Attach add-ons', days: 4 },
      { label: 'QA review', days: 5 }
    ];
    pack.forEach((p, idx) => {
      tasks.push({ id: `dt-${b.id}-${idx}`, bookingId: b.id, label: p.label, status: 'Queued', due: fmt(now + p.days * 24*60*60*1000) });
    });
  });
  saveDraftingQueue(tasks);
}

// Document Assembly (mock)
export type DocumentVersion = { id: string; bookingId: string; name: string; content: string; status: 'Draft'|'Redlined'|'Approved'; createdAt: string };
const DOC_VERSIONS_KEY = 'wyAPT_doc_versions';

export function getDocVersions(bookingId: string): DocumentVersion[] {
  try {
    const raw = localStorage.getItem(DOC_VERSIONS_KEY);
    const all: DocumentVersion[] = raw ? JSON.parse(raw) : [];
    return all.filter(v => v.bookingId === bookingId);
  } catch { return []; }
}

export function addDocVersion(v: DocumentVersion) {
  const raw = localStorage.getItem(DOC_VERSIONS_KEY);
  const all: DocumentVersion[] = raw ? JSON.parse(raw) : [];
  all.push(v);
  localStorage.setItem(DOC_VERSIONS_KEY, JSON.stringify(all));
}

export function updateDocVersion(id: string, patch: Partial<DocumentVersion>) {
  const raw = localStorage.getItem(DOC_VERSIONS_KEY);
  const all: DocumentVersion[] = raw ? JSON.parse(raw) : [];
  const next = all.map(v => v.id === id ? { ...v, ...patch } : v);
  localStorage.setItem(DOC_VERSIONS_KEY, JSON.stringify(next));
}

// Funding & Titling (mock)
export type FundingItem = { id: string; bookingId: string; label: string; status: 'Pending'|'Submitted'|'Verified'; proof?: string };
const FUNDING_KEY = 'wyAPT_funding_items';

export function getFundingItems(bookingId: string): FundingItem[] {
  try {
    const raw = localStorage.getItem(FUNDING_KEY);
    const all: FundingItem[] = raw ? JSON.parse(raw) : [];
    return all.filter(i => i.bookingId === bookingId);
  } catch { return []; }
}

export function seedFundingItemsIfMissing(bookingId: string) {
  const existing = getFundingItems(bookingId);
  if (existing.length > 0) return;
  const defaults: FundingItem[] = [
    { id: `fi-${bookingId}-1`, bookingId, label: 'Retitle Bank Accounts', status: 'Pending' },
    { id: `fi-${bookingId}-2`, bookingId, label: 'Brokerage Beneficiary Updates', status: 'Pending' },
    { id: `fi-${bookingId}-3`, bookingId, label: 'Real Estate Deed Transfer', status: 'Pending' }
  ];
  const raw = localStorage.getItem(FUNDING_KEY);
  const all: FundingItem[] = raw ? JSON.parse(raw) : [];
  localStorage.setItem(FUNDING_KEY, JSON.stringify([...all, ...defaults]));
}

export function updateFundingItem(id: string, patch: Partial<FundingItem>) {
  const raw = localStorage.getItem(FUNDING_KEY);
  const all: FundingItem[] = raw ? JSON.parse(raw) : [];
  const next = all.map(i => i.id === id ? { ...i, ...patch } : i);
  localStorage.setItem(FUNDING_KEY, JSON.stringify(next));
}

// Maintenance Enrollment (mock)
type MaintenanceEnrollment = { bookingId: string; enrolledAt: string };
const MAINT_KEY = 'wyAPT_maintenance';

export function enrollMaintenance(bookingId: string) {
  const raw = localStorage.getItem(MAINT_KEY);
  const all: MaintenanceEnrollment[] = raw ? JSON.parse(raw) : [];
  if (all.some(x => x.bookingId === bookingId)) return;
  all.push({ bookingId, enrolledAt: new Date().toISOString() });
  localStorage.setItem(MAINT_KEY, JSON.stringify(all));
  createAnnualReviewFor(bookingId);
}

export function getMaintenance(): MaintenanceEnrollment[] {
  try {
    const raw = localStorage.getItem(MAINT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

// Automations Log (mock)
type AutomationLog = { id: string; time: string; event: string; detail?: string };
const AUTO_LOG_KEY = 'wyAPT_automation_logs';
export function logAutomation(event: string, detail?: string) {
  const raw = localStorage.getItem(AUTO_LOG_KEY);
  const all: AutomationLog[] = raw ? JSON.parse(raw) : [];
  all.push({ id: `al-${Date.now()}`, time: new Date().toISOString(), event, detail });
  localStorage.setItem(AUTO_LOG_KEY, JSON.stringify(all));
}
export function getAutomationLogs(): AutomationLog[] {
  try { const raw = localStorage.getItem(AUTO_LOG_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}

// Annual Review (mock)
export type AnnualReview = { id: string; bookingId: string; stage: 'Open'|'Scheduled'|'Completed'; nextAt?: string };
const ANNUAL_REVIEW_KEY = 'wyAPT_annual_reviews';
export function getAnnualReviews(): AnnualReview[] {
  try { const raw = localStorage.getItem(ANNUAL_REVIEW_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}
export function saveAnnualReviews(items: AnnualReview[]) { localStorage.setItem(ANNUAL_REVIEW_KEY, JSON.stringify(items)); }
export function createAnnualReviewFor(bookingId: string) {
  const all = getAnnualReviews();
  if (all.some(a => a.bookingId === bookingId && a.stage !== 'Completed')) return;
  all.push({ id: `ar-${Date.now()}`, bookingId, stage: 'Open' });
  saveAnnualReviews(all);
}
export function updateAnnualReview(id: string, patch: Partial<AnnualReview>) {
  const all = getAnnualReviews().map(a => a.id === id ? { ...a, ...patch } : a);
  saveAnnualReviews(all);
}

// Outbox (mock emails)
export type OutboxEmail = { id: string; bookingId: string; templateId: string; subject: string; html: string; createdAt: string };
const OUTBOX_KEY = 'wyAPT_outbox';
export function getOutbox(): OutboxEmail[] {
  try { const raw = localStorage.getItem(OUTBOX_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}
export function addOutboxEmail(e: OutboxEmail) {
  const all = getOutbox();
  all.push(e);
  localStorage.setItem(OUTBOX_KEY, JSON.stringify(all));
}

// Automations Rules (mock)
export type AutomationEvent = 'stage_change';
export type AutomationAction =
  | { type: 'move_stage'; stage: Booking['stage'] }
  | { type: 'send_email_template'; templateId: string }
  | { type: 'log'; message: string };
export type AutomationRule = {
  id: string;
  name: string;
  event: AutomationEvent;
  conditions: { stage_from?: Booking['stage']; stage_to?: Booking['stage']; pkg?: string };
  actions: AutomationAction[];
};
const AUTO_RULES_KEY = 'wyAPT_automation_rules';
export function getAutomationRules(): AutomationRule[] {
  try { const raw = localStorage.getItem(AUTO_RULES_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}
export function saveAutomationRules(rules: AutomationRule[]) { localStorage.setItem(AUTO_RULES_KEY, JSON.stringify(rules)); }
export function upsertAutomationRule(rule: AutomationRule) {
  const all = getAutomationRules();
  const idx = all.findIndex(r => r.id === rule.id);
  if (idx >= 0) all[idx] = rule; else all.push(rule);
  saveAutomationRules(all);
}
export function deleteAutomationRule(id: string) { saveAutomationRules(getAutomationRules().filter(r => r.id !== id)); }

export function evaluateAutomations(event: AutomationEvent, payload: { bookingId: string; fromStage?: Booking['stage']; toStage?: Booking['stage'] }): AutomationAction[] {
  const all = getAutomationRules();
  const b = getBookings().find(x => x.id === payload.bookingId);
  return all.filter(r => r.event === event).filter(r => {
    if (r.conditions.stage_from && r.conditions.stage_from !== payload.fromStage) return false;
    if (r.conditions.stage_to && r.conditions.stage_to !== payload.toStage) return false;
    if (r.conditions.pkg && r.conditions.pkg !== (b?.pkg || '')) return false;
    return true;
  }).flatMap(r => r.actions);
}

// Seed mock data for a complete admin experience
export function seedMockDataIfEmpty() {
  const existing = getBookings();
  if (existing.length > 0) return;
  const now = Date.now();
  const fmt = (ms: number) => new Date(ms).toISOString();
  const seed: Booking[] = [
    {
      id: 'seed-1',
      createdAt: fmt(now - 2 * 24 * 60 * 60 * 1000),
      appointmentAt: fmt(now + 6 * 60 * 60 * 1000),
      name: 'Jane Smith',
      email: 'jane@example.com',
      guests: ['paul@example.com'],
      pkg: 'consult-30',
      slot: 'Wed 11:30 AM MT',
      referralSource: 'Google / Search',
      stateOfResidence: 'Colorado',
      citizenship: 'yes',
      maritalStatus: 'Married',
      priority: ['Asset protection'],
      assetTypes: ['Real estate', 'Investments (stocks, bonds, funds)'],
      urgency: 'Within 1–2 weeks',
      assetValueRange: '$1M – $5M',
      phone: '+1 (555) 234-5678',
      price: { amount: 375, currency: 'USD' },
      stage: 'Booked',
      docs: []
    },
    {
      id: 'seed-2',
      createdAt: fmt(now - 5 * 24 * 60 * 60 * 1000),
      appointmentAt: fmt(now + 20 * 60 * 60 * 1000),
      name: 'Michael Johnson',
      email: 'michael@example.com',
      guests: [],
      pkg: 'wy-apt-assess',
      slot: 'Thu 9:00 AM MT',
      referralSource: 'Referral',
      stateOfResidence: 'Wyoming',
      citizenship: 'yes',
      maritalStatus: 'Single',
      priority: ['Tax efficiency', 'Legacy planning'],
      assetTypes: ['Business interests', 'Cash or cash equivalents'],
      urgency: 'Immediately',
      assetValueRange: '$5M – $10M',
      phone: '+1 (555) 345-6789',
      price: { amount: 375, currency: 'USD' },
      stage: 'Signed',
      docs: [
        { id: 'doc-1', title: 'Engagement Letter (Signed).pdf', type: 'pdf', createdAt: fmt(now - 3 * 24 * 60 * 60 * 1000), url: '#' }
      ]
    },
    {
      id: 'seed-3',
      createdAt: fmt(now - 9 * 24 * 60 * 60 * 1000),
      appointmentAt: fmt(now + 50 * 60 * 60 * 1000),
      name: 'Ava Martinez',
      email: 'ava@example.com',
      guests: [],
      pkg: 'consult-60',
      slot: 'Fri 1:00 PM MT',
      referralSource: 'YouTube',
      stateOfResidence: 'California',
      citizenship: 'other',
      citizenshipOther: 'Green card holder',
      maritalStatus: 'Divorced',
      priority: ['Asset protection'],
      assetTypes: ['Bitcoin and Cryptocurrency holdings', 'Intellectual Property'],
      urgency: 'Exploring options',
      assetValueRange: '$500k – $1M',
      phone: '+1 (555) 987-6543',
      price: { amount: 375, currency: 'USD' },
      stage: 'New',
      docs: []
    }
  ];
  saveBookings(seed);
  // Also ensure nurture defaults present
  getNurtureSequences();
  // Ensure site config has defaults
  saveSiteConfig({ logoPath: '/wy-apt-logo.png', videoUrl: 'https://drive.google.com/file/d/1otkNyA5S8AaIv_QW0J2sjtIFCqpf9P5K/preview' });
}


