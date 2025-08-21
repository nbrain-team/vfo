export type Booking = {
  id: string;
  createdAt: string;
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
  paywallEnabled?: boolean;
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
export type NurtureStep = { id: string; type: 'email' | 'sms'; label: string; enabled: boolean };
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


