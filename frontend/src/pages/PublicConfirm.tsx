import React, { useEffect } from 'react';
import '../public.css';
import { useLocation, Link } from 'react-router-dom';
import { addBooking } from '../adminData';

const PublicConfirm: React.FC = () => {
  const location = useLocation() as any;
  const {
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
    price
  } = (location.state || {});

  useEffect(() => {
    if (name && email && slot) {
      addBooking({
        id: String(Date.now()),
        createdAt: new Date().toISOString(),
        name,
        email,
        guests: Array.isArray(guests) ? guests : [],
        pkg: pkg || 'consult-30',
        slot,
        referralSource,
        referralOther,
        stateOfResidence,
        citizenship,
        citizenshipOther,
        maritalStatus,
        priority: Array.isArray(priority) ? priority : [],
        priorityOther,
        assetTypes: Array.isArray(assetTypes) ? assetTypes : [],
        assetTypesOther,
        urgency,
        assetValueRange,
        phone,
        price,
        stage: 'Booked'
      });
    }
  }, [name, email, slot]);

  return (
    <div className="public-site">
      <div className="public-container">
        <header className="public-header">
          <div className="public-logo">
            <img src="/wy-apt-logo.png" alt="Firm Logo" />
            <div>
              <div style={{ fontWeight: 700, color: 'var(--brand-forest)' }}>Wyoming Asset Protection</div>
              <div style={{ fontSize: 12, color: 'var(--brand-slate)' }}>Confirmation</div>
            </div>
          </div>
        </header>

        <section className="public-section" style={{ maxWidth: 640, margin: '0 auto' }}>
          <h2 style={{ marginTop: 0 }}>You're Booked</h2>
          <p>Thanks{ name ? `, ${name}` : '' }! We received your request.</p>
          {email && <p><strong>Email:</strong> {email}</p>}
          {pkg && <p><strong>Package:</strong> {pkg}</p>}
          {slot && <p><strong>Timeslot:</strong> {slot}</p>}
          {Array.isArray(guests) && guests.length > 0 && (
            <p><strong>Guests:</strong> {guests.join(', ')}</p>
          )}
          <hr/>
          <h3>Intake Summary</h3>
          {referralSource && (
            <p><strong>Referral Source:</strong> {referralSource}{referralSource === 'Other' && referralOther ? ` — ${referralOther}` : ''}</p>
          )}
          {stateOfResidence && (
            <p><strong>State of Residence:</strong> {stateOfResidence}</p>
          )}
          {citizenship && (
            <p><strong>Citizenship/Residency:</strong> {citizenship}{citizenship === 'other' && citizenshipOther ? ` — ${citizenshipOther}` : ''}</p>
          )}
          {maritalStatus && (
            <p><strong>Marital Status:</strong> {maritalStatus}</p>
          )}
          {Array.isArray(priority) && priority.length > 0 && (
            <p><strong>Top Priority:</strong> {priority.join(', ')}{priorityOther ? `, Other: ${priorityOther}` : ''}</p>
          )}
          {Array.isArray(assetTypes) && assetTypes.length > 0 && (
            <p><strong>Assets to Protect:</strong> {assetTypes.join(', ')}{assetTypesOther ? `, Other: ${assetTypesOther}` : ''}</p>
          )}
          {urgency && (
            <p><strong>Urgency:</strong> {urgency}</p>
          )}
          {assetValueRange && (
            <p><strong>Asset Value Range:</strong> {assetValueRange}</p>
          )}
          {phone && (
            <p><strong>SMS Number:</strong> {phone}</p>
          )}
          {price && (
            <p><strong>Price:</strong> ${price.amount} {price.currency} (placeholder)</p>
          )}
          <p style={{ color: 'var(--brand-slate)' }}>In production, you would receive a calendar invite and confirmation email. A record has been added to your admin dashboard.</p>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link to="/wyoming-apt" className="btn-outline" style={{ textDecoration: 'none' }}>Back to Site</Link>
            <Link to="/wyoming-apt/book" className="btn-primary" style={{ textDecoration: 'none' }}>Book Another</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PublicConfirm;


