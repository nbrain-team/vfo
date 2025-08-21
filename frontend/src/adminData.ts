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


