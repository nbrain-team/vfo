import React, { useEffect, useState } from 'react';
import '../public.css';
import { useLocation, useNavigate } from 'react-router-dom';
import LawPayIntegration from '../components/LawPayIntegration';

const LAWPay_HPP_URL = 'https://secure.lawpay.com/pages/meuli-law-office/30-minute-consultation-call-with-attorney';

const PACKAGES = [
  { id: 'consult-30', label: '30-min Initial Consult (Free)' },
  { id: 'consult-60', label: '60-min Deep Dive (Paid Placeholder)' },
  { id: 'wy-apt-assess', label: 'Wyoming APT Fit Assessment' },
];

// Timeslots now selected in step 1

const REFERRAL_OPTIONS = [
  'Google / Search',
  'Referral',
  'YouTube',
  'Podcast',
  'Social Media',
  'Other'
];

const MARITAL_OPTIONS = [
  'Single',
  'Married',
  'Divorced',
  'Widowed',
  'Domestic Partnership',
  'Prefer not to say'
];

const PRIORITY_OPTIONS = [
  'Asset protection',
  'Estate planning',
  'Tax efficiency',
  'Legacy planning'
];

const ASSET_TYPES_OPTIONS = [
  'Real estate',
  'Business interests',
  'Cash or cash equivalents',
  'Bitcoin and Cryptocurrency holdings',
  'Investments (stocks, bonds, funds)',
  'Intellectual Property'
];

const URGENCY_OPTIONS = [
  'Immediately',
  'Within 1–2 weeks',
  'Within 30 days',
  'Exploring options'
];

const VALUE_RANGE_OPTIONS = [
  '< $500k',
  '$500k – $1M',
  '$1M – $5M',
  '$5M – $10M',
  '$10M+'
];

const PublicBookCall: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation() as any;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pkg, setPkg] = useState(PACKAGES[0].id);
  const [slot] = useState<string | null>(location.state?.slot || null);
  const [guests, setGuests] = useState<string[]>([]);
  const [guestInput, setGuestInput] = useState('');

  const [referralSource, setReferralSource] = useState(REFERRAL_OPTIONS[0]);
  const [referralOther, setReferralOther] = useState('');
  const [stateOfResidence, setStateOfResidence] = useState('');
  const [citizenship, setCitizenship] = useState<'yes' | 'no' | 'other' | ''>('');
  const [citizenshipOther, setCitizenshipOther] = useState('');
  const [maritalStatus, setMaritalStatus] = useState(MARITAL_OPTIONS[0]);
  const [priority, setPriority] = useState<string[]>([]);
  const [priorityOther, setPriorityOther] = useState('');
  const [assetTypes, setAssetTypes] = useState<string[]>([]);
  const [assetTypesOther, setAssetTypesOther] = useState('');
  const [urgency, setUrgency] = useState(URGENCY_OPTIONS[0]);
  const [assetValueRange, setAssetValueRange] = useState(VALUE_RANGE_OPTIONS[0]);
  const [phone, setPhone] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [hppOpened, setHppOpened] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Show payment step for paid consultations
    setShowPayment(true);
  };

  const handlePaymentSuccess = (paymentId: string) => {
    // Navigate to confirmation page after successful payment
    navigate('/wyoming-apt/confirmed', { state: {
      name,
      email,
      guests,
      pkg,
      slot,
      referralSource,
      referralOther,
      stateOfResidence,
      citizenship,
      citizenshipOther,
      maritalStatus,
      priority,
      priorityOther,
      assetTypes,
      assetTypesOther,
      urgency,
      assetValueRange,
      phone,
      price: { amount: 375, currency: 'USD' },
      paymentId: paymentId
    } });
  };

  const handlePaymentError = (error: string) => {
    setPaymentError(error);
    // Keep the payment modal open so the user can retry or use fallback
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
    setHppOpened(false);
  };

  // Automatically open hosted payment page in a new tab when the modal is shown
  useEffect(() => {
    if (showPayment && !hppOpened) {
      window.open(LAWPay_HPP_URL, '_blank', 'noopener,noreferrer');
      setHppOpened(true);
    }
  }, [showPayment, hppOpened]);

  return (
    <div className="public-site">
      <div className="public-container">
        <header className="public-header">
          <div className="public-logo">
            <img src="/wy-apt-logo.png" alt="Firm Logo" />
            <div>
              <div style={{ fontWeight: 700, color: 'var(--brand-forest)' }}>Wyoming Asset Protection</div>
              <div style={{ fontSize: 12, color: 'var(--brand-slate)' }}>Book a Call</div>
            </div>
          </div>
        </header>

        <section className="public-section" style={{ maxWidth: 640, margin: '0 auto' }}>
          <h2 style={{ marginTop: 0 }}>Book Your Consultation</h2>
          <div style={{ color: 'var(--brand-slate)', marginBottom: 12 }}>
            Asset Protection Trusts • 30 min • Web conferencing • $375 USD
          </div>
          {slot && (
            <div className="public-card" style={{ marginBottom: 12 }}>
              <strong>Selected timeslot:</strong> {slot}
            </div>
          )}
          <form onSubmit={onSubmit}>
            <div style={{ display: 'grid', gap: 12 }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Full Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd' }}
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd' }}
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Add Guests (optional)</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    type="email"
                    value={guestInput}
                    onChange={(e) => setGuestInput(e.target.value)}
                    placeholder="guest@example.com"
                    style={{ flex: 1, padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd' }}
                  />
                  <button
                    type="button"
                    className="btn-outline"
                    onClick={() => {
                      if (guestInput.trim()) {
                        setGuests(prev => [...prev, guestInput.trim()]);
                        setGuestInput('');
                      }
                    }}
                  >
                    Add
                  </button>
                </div>
                {guests.length > 0 && (
                  <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {guests.map((g, idx) => (
                      <span key={idx} className="btn-outline" style={{ padding: '6px 10px' }}>
                        {g}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Package</label>
                <select
                  value={pkg}
                  onChange={(e) => setPkg(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd' }}
                >
                  {PACKAGES.map((p) => (
                    <option key={p.id} value={p.id}>{p.label}</option>
                  ))}
                </select>
              </div>
              {/* Intake Questions */}
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>
                  To help personalize and get you the most value for your initial consultation please complete the following short list of intake questions. Let's start with how you heard about me and my services.
                </label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <select
                    value={referralSource}
                    onChange={(e) => setReferralSource(e.target.value)}
                    style={{ flex: 1, padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd' }}
                    required
                  >
                    {REFERRAL_OPTIONS.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  {referralSource === 'Other' && (
                    <input
                      value={referralOther}
                      onChange={(e) => setReferralOther(e.target.value)}
                      placeholder="Other..."
                      style={{ flex: 1, padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd' }}
                    />
                  )}
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>What is your current state of Residence</label>
                <input
                  value={stateOfResidence}
                  onChange={(e) => setStateOfResidence(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd' }}
                  placeholder="e.g., Wyoming"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Are you a U.S. Citizen or Permanent Resident?</label>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                  <label className="btn-outline" style={{ padding: '6px 10px' }}>
                    <input type="radio" name="cit" checked={citizenship === 'yes'} onChange={() => setCitizenship('yes')} /> yes
                  </label>
                  <label className="btn-outline" style={{ padding: '6px 10px' }}>
                    <input type="radio" name="cit" checked={citizenship === 'no'} onChange={() => setCitizenship('no')} /> no
                  </label>
                  <label className="btn-outline" style={{ padding: '6px 10px' }}>
                    <input type="radio" name="cit" checked={citizenship === 'other'} onChange={() => setCitizenship('other')} /> other
                  </label>
                  {citizenship === 'other' && (
                    <input
                      value={citizenshipOther}
                      onChange={(e) => setCitizenshipOther(e.target.value)}
                      placeholder="Please specify"
                      style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd' }}
                    />
                  )}
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>What is your current marital status?</label>
                <select
                  value={maritalStatus}
                  onChange={(e) => setMaritalStatus(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd' }}
                  required
                >
                  {MARITAL_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>What is your top priority for this consultation?</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {PRIORITY_OPTIONS.map(opt => (
                    <label key={opt} className="btn-outline" style={{ padding: '6px 10px' }}>
                      <input
                        type="checkbox"
                        checked={priority.includes(opt)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setPriority(prev => checked ? [...prev, opt] : prev.filter(x => x !== opt));
                        }}
                      /> {opt}
                    </label>
                  ))}
                  <label className="btn-outline" style={{ padding: '6px 10px' }}>
                    <input
                      type="checkbox"
                      checked={!!priorityOther}
                      onChange={(e) => { if (!e.target.checked) setPriorityOther(''); }}
                    /> Other
                  </label>
                  {priorityOther !== '' && (
                    <input
                      value={priorityOther}
                      onChange={(e) => setPriorityOther(e.target.value)}
                      placeholder="Other..."
                      style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd' }}
                    />
                  )}
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>What type of assets are you looking to protect permanently? (select all that apply)</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {ASSET_TYPES_OPTIONS.map(opt => (
                    <label key={opt} className="btn-outline" style={{ padding: '6px 10px' }}>
                      <input
                        type="checkbox"
                        checked={assetTypes.includes(opt)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setAssetTypes(prev => checked ? [...prev, opt] : prev.filter(x => x !== opt));
                        }}
                      /> {opt}
                    </label>
                  ))}
                  <label className="btn-outline" style={{ padding: '6px 10px' }}>
                    <input
                      type="checkbox"
                      checked={!!assetTypesOther}
                      onChange={(e) => { if (!e.target.checked) setAssetTypesOther(''); }}
                    /> Other
                  </label>
                  {assetTypesOther !== '' && (
                    <input
                      value={assetTypesOther}
                      onChange={(e) => setAssetTypesOther(e.target.value)}
                      placeholder="Other..."
                      style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd' }}
                    />
                  )}
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>What is your sense of urgency to begin?</label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd' }}
                  required
                >
                  {URGENCY_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Approximate total value of the assets you are looking to permanently protect</label>
                <select
                  value={assetValueRange}
                  onChange={(e) => setAssetValueRange(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd' }}
                  required
                >
                  {VALUE_RANGE_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Send text messages to (optional)</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd' }}
                />
                <div style={{ color: 'var(--brand-slate)', fontSize: 12, marginTop: 6 }}>
                  By entering your phone number, you consent to receive messages for this event via SMS. Message and data rates may apply. Reply STOP to opt out.
                </div>
              </div>
              {!slot && (
                <div className="public-card" style={{ color: 'var(--brand-slate)' }}>
                  Please select a time first.
                </div>
              )}

              <button
                className="btn-gradient"
                type="submit"
                style={{ width: '100%', marginTop: 8, opacity: slot ? 1 : 0.7, cursor: slot ? 'pointer' : 'not-allowed' }}
                disabled={!slot}
              >
                Continue to Payment
              </button>
            </div>
          </form>
          
          {paymentError && (
            <div className="public-card" style={{ marginTop: '16px', background: 'var(--danger-light)', border: '1px solid var(--danger)' }}>
              <strong style={{ color: 'var(--danger)' }}>Payment Error</strong>
              <p style={{ margin: '8px 0 0', color: 'var(--danger)' }}>{paymentError}</p>
            </div>
          )}
        </section>
      </div>
      
      {/* Payment Modal */}
      {showPayment && (
        <div className="modal-overlay" onClick={handlePaymentCancel}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 className="section-title">Complete Payment</h3>
              <button 
                onClick={handlePaymentCancel}
                style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: 'var(--text-secondary)' }}
              >
                ×
              </button>
            </div>
            {paymentError && (
              <div className="public-card" style={{ marginBottom: '12px', background: 'var(--danger-light)', border: '1px solid var(--danger)' }}>
                <strong style={{ color: 'var(--danger)' }}>Payment Error</strong>
                <p style={{ margin: '8px 0 0', color: 'var(--danger)' }}>{paymentError}</p>
              </div>
            )}
            
            <div style={{ marginBottom: '20px' }}>
              <p style={{ marginBottom: '16px' }}>
                Complete your payment to confirm your consultation booking.
              </p>
              <div className="public-card" style={{ background: 'var(--primary-light)', border: '1px solid var(--primary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong>30-Minute Consultation</strong>
                    <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      {slot}
                    </div>
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--primary)' }}>
                    $375
                  </div>
                </div>
              </div>
            </div>
            
            {/* Hosted Payment Page opens in a new tab due to frame restrictions */}
            <div className="public-card" style={{ background: 'var(--background-secondary)' }}>
              <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
                We opened the secure payment page in a new tab. Complete payment there, then click
                <strong> “I Completed Payment”</strong> below to continue.
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8, justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                If the form doesn’t appear, open the secure payment page in a new tab and return here after completing payment.
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <a className="button-outline" href={LAWPay_HPP_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>Open Secure Payment</a>
                <button
                  className="form-button"
                  onClick={() => handlePaymentSuccess('hpp-' + Date.now())}
                >
                  I Completed Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicBookCall;


