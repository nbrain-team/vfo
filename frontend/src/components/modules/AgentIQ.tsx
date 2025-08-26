import React, { useState } from 'react';
import ModuleTemplate from './ModuleTemplate';
import { useNavigate } from 'react-router-dom';

type TabKey = 'overview' | 'blog' | 'services' | 'consult' | 'client-portal' | 'testimonials' | 'contact';

interface ServiceItem {
    id: string;
    title: string;
    subtitle: string;
    bullets: string[];
}

const AgentIQ: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<TabKey>('overview');
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [selectedAction, setSelectedAction] = useState<string | null>(null);
    const [scheduled, setScheduled] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

    const services: ServiceItem[] = [
        {
            id: 'wy-apt',
            title: 'Wyoming Asset Protection Trusts',
            subtitle: 'Shield personal assets from lawsuits and creditor claims under Wyoming law.',
            bullets: [
                'Domestic Asset Protection Trusts (DAPT) with strong legal framework',
                'Maintain access and control through structured provisions',
                'Clear, enforceable documents without offshore complexity'
            ]
        },
        {
            id: 'pftc',
            title: 'Private Family Trust Companies',
            subtitle: 'Greater control, privacy, and continuity by serving as trustee for your trust.',
            bullets: [
                'Form a Wyoming Private Family Trust Company',
                'Enhance privacy and centralize management of family assets',
                'Built to meet state compliance standards'
            ]
        },
        {
            id: 'maintenance',
            title: 'Ongoing Trust Support & Maintenance',
            subtitle: 'Year-one guidance, distributions, minutes, and trustee documentation — plus annual maintenance.',
            bullets: [
                'Distribution processing with documentation',
                'Meeting minutes and trustee records',
                'Annual maintenance to keep operations smooth'
            ]
        }
    ];

    const testimonials = [
        {
            name: 'Jim R',
            quote: 'They were very thorough and most importantly helpful in assisting us getting accounts and assets transferred into our new trust. I HIGHLY recommend these people.'
        },
        {
            name: 'Gordon Middleton',
            quote: 'Liz was wonderful about explaining everything to us in terminology we could understand. We would highly recommend their firm.'
        },
        {
            name: 'Maury Dobbie',
            quote: 'They are wonderful to work with, knowledgeable, and helpful. We would highly recommend their firm.'
        },
        {
            name: 'Betsy Cairo',
            quote: 'On top of things. Thorough and friendly. Explained the process at each step. Highly recommend.'
        }
    ];

    const consultSlots = [
        'Tue 10:00 AM MT',
        'Tue 2:00 PM MT',
        'Wed 11:30 AM MT',
        'Thu 9:00 AM MT',
        'Fri 1:00 PM MT'
    ];

    const clientPortalActions = [
        {
            id: 'contribution',
            title: 'Contribution to Trust',
            description: 'Start a contribution — we will generate the right forms for signatures and minutes.',
            docs: [
                'Questionnaire',
                'Trustee Acceptance of Contribution',
                'State Special Meeting Minutes and Resolutions',
                'Affidavit of Settlor'
            ]
        },
        {
            id: 'distribution',
            title: 'Distributions From Trust (DDC)',
            description: 'Request a discretionary distribution with proper DDC documentation.',
            docs: [
                'DDC Minutes Appointing WAPA',
                'DDC Acceptance of Appointment',
                'Investment Committee Questionnaire',
                'DDC Distribution Request Form',
                'DDC Minutes Approving Distribution',
                'State Distribution Meeting Minutes'
            ]
        },
        {
            id: 'investment',
            title: 'Investment Decisions',
            description: 'Create or update the Investment Committee and record decisions.',
            docs: [
                'Investment Committee Creation and Appointment',
                'Investment Committee Questionnaire',
                'Investment Committee Meeting Minutes'
            ]
        },
        {
            id: 'pftc-docs',
            title: 'Wyoming Private Family Trust Documents',
            description: 'Establish the PFTC with the required organizational documents.',
            docs: [
                'PTC Operating Agreement (single or two grantors)',
                'PTC Organizational Minutes (single or multi-member)'
            ]
        }
    ];

    const renderBlog = () => (
        <div className="module-card">
            <h2 className="section-title">My Blog</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
                Create SEO-optimized articles and blog posts for your site
            </p>
            
            <div style={{ marginBottom: '24px' }}>
                <button className="form-button" style={{ width: 'auto' }}>
                    + Create New Blog Post
                </button>
            </div>

            <div style={{ display: 'grid', gap: '16px' }}>
                <div className="module-card" style={{ background: 'var(--gray-light)' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Understanding Asset Protection Trusts</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '12px' }}>
                        A comprehensive guide to how asset protection trusts work and their benefits...
                    </p>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="button-outline" style={{ width: 'auto' }}>Edit</button>
                        <button className="button-outline" style={{ width: 'auto' }}>View</button>
                        <button className="button-outline" style={{ width: 'auto' }}>Delete</button>
                    </div>
                </div>
                
                <div className="module-card" style={{ background: 'var(--gray-light)' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Wyoming vs Other States: A Comparison</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '12px' }}>
                        Why Wyoming offers the strongest asset protection laws in the United States...
                    </p>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="button-outline" style={{ width: 'auto' }}>Edit</button>
                        <button className="button-outline" style={{ width: 'auto' }}>View</button>
                        <button className="button-outline" style={{ width: 'auto' }}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderOverview = () => (
        <>
            <div className="module-card">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <h2 style={{ margin: 0 }}>Meet Matt Meuli</h2>
                    <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                        Get expert asset protection advice and strategies to help shield your wealth from anything and anyone.
                    </p>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                        <button className="form-button" style={{ width: 'auto' }} onClick={() => setActiveTab('consult')}>Book an Appointment</button>
                        <button className="button-outline" style={{ width: 'auto' }} onClick={() => setActiveTab('contact')}>Call: (307) 463-3600</button>
                    </div>
                </div>
            </div>

            <div className="module-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                {services.map(svc => (
                    <div className="module-card" key={svc.id}>
                        <h3 className="section-title" style={{ marginBottom: '6px' }}>{svc.title}</h3>
                        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{svc.subtitle}</p>
                        <ul style={{ marginTop: '12px', paddingLeft: '18px' }}>
                            {svc.bullets.map((b, i) => (
                                <li key={i} style={{ marginBottom: '6px' }}>{b}</li>
                            ))}
                        </ul>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button className="button-outline" style={{ width: 'auto' }} onClick={() => { setActiveTab('services'); setSelectedService(svc.id); }}>View Details</button>
                            <button className="form-button" style={{ width: 'auto' }} onClick={() => setActiveTab('consult')}>Start Consult</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="module-card">
                <h3 className="section-title">How We Work</h3>
                <div className="module-card-row" style={{ marginTop: '8px' }}>
                    <div style={{ background: 'var(--gray-light)', padding: '16px', borderRadius: '8px' }}>
                        <div style={{ fontWeight: 600, marginBottom: '6px' }}>Step 1: Schedule a Consultation</div>
                        <div style={{ color: 'var(--text-secondary)' }}>Focused call to understand your goals and whether a Wyoming trust is the right fit.</div>
                    </div>
                    <div style={{ background: 'var(--gray-light)', padding: '16px', borderRadius: '8px' }}>
                        <div style={{ fontWeight: 600, marginBottom: '6px' }}>Step 2: Custom Plan Design</div>
                        <div style={{ color: 'var(--text-secondary)' }}>We draft your custom trust and, if needed, a private trust company — all fully compliant with Wyoming law.</div>
                    </div>
                    <div style={{ background: 'var(--gray-light)', padding: '16px', borderRadius: '8px' }}>
                        <div style={{ fontWeight: 600, marginBottom: '6px' }}>Step 3: Implementation & Follow-Up</div>
                        <div style={{ color: 'var(--text-secondary)' }}>We handle filings, deliver all legal docs, and support your first year with documentation, minutes, and distribution guidance.</div>
                    </div>
                </div>
            </div>
        </>
    );

    const renderServices = () => (
        <div className="module-grid">
            <div className="module-card">
                <h3 className="section-title">Our Core Services</h3>
                <div className="module-card-row" style={{ marginTop: '12px' }}>
                    {services.map(svc => (
                        <div key={svc.id} style={{ border: '1px solid var(--border)', borderRadius: 8, padding: 16, background: 'var(--bg)' }}>
                            <div style={{ fontWeight: 600, marginBottom: 6 }}>{svc.title}</div>
                            <div style={{ color: 'var(--text-secondary)', marginBottom: 10 }}>{svc.subtitle}</div>
                            <ul style={{ paddingLeft: 18 }}>
                                {svc.bullets.map((b, i) => <li key={i} style={{ marginBottom: 6 }}>{b}</li>)}
                            </ul>
                            <button className="button-outline" style={{ width: 'auto', marginTop: 10 }} onClick={() => setSelectedService(svc.id)}>View Details</button>
                        </div>
                    ))}
                </div>
            </div>

            {selectedService && (
                <div className="module-card">
                    <h3 className="section-title">{services.find(s => s.id === selectedService)?.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', marginTop: 6 }}>{services.find(s => s.id === selectedService)?.subtitle}</p>
                    <div style={{ marginTop: 12 }}>
                        <div style={{ fontWeight: 600, marginBottom: 8 }}>What this includes</div>
                        <ul style={{ paddingLeft: 18 }}>
                            {services.find(s => s.id === selectedService)?.bullets.map((b, i) => (
                                <li key={i} style={{ marginBottom: 6 }}>{b}</li>
                            ))}
                        </ul>
                    </div>
                    <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                        <button className="form-button" style={{ width: 'auto' }} onClick={() => setActiveTab('consult')}>Proceed to Consult</button>
                        <button className="button-outline" style={{ width: 'auto' }} onClick={() => setSelectedService(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );

    const renderConsult = () => (
        <div className="module-grid">
            <div className="module-card">
                <h3 className="section-title">Schedule a Consultation</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Pick a time below. This is a mock scheduler — no external integrations.</p>
                <div className="module-card-row" style={{ marginTop: 12 }}>
                    {consultSlots.map(slot => (
                        <button
                            key={slot}
                            className={`time-button ${selectedSlot === slot ? 'active' : ''}`}
                            style={{ padding: '10px 16px' }}
                            onClick={() => setSelectedSlot(slot)}
                        >
                            {slot}
                        </button>
                    ))}
                </div>
                <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
                    <button
                        className="form-button"
                        style={{ width: 'auto' }}
                        disabled={!selectedSlot}
                        onClick={() => setScheduled(true)}
                    >
                        Confirm Appointment
                    </button>
                    <button className="button-outline" style={{ width: 'auto' }} onClick={() => setSelectedSlot(null)}>Clear</button>
                </div>
                {scheduled && (
                    <div style={{ marginTop: 16, background: 'var(--success-light)', color: 'var(--success)', padding: 12, borderRadius: 8 }}>
                        Appointment confirmed for {selectedSlot}. A confirmation email would be sent here in production.
                    </div>
                )}
            </div>

            <div className="module-card">
                <h3 className="section-title">Payment Placeholder</h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                    If a consult fee is required, a secure payment block would appear here (Stripe/LawPay test mode). For now, this is a static placeholder.
                </p>
                <div style={{ display: 'flex', gap: 10 }}>
                    <button className="button-outline" style={{ width: 'auto' }}>Pay Consult Fee (Placeholder)</button>
                    <button className="button-outline" style={{ width: 'auto' }}>Apply Promo Code (Placeholder)</button>
                </div>
            </div>
        </div>
    );

    const renderClientPortal = () => (
        <div className="module-grid">
            <div className="module-card">
                <h3 className="section-title">Client Actions</h3>
                <div className="module-card-row" style={{ marginTop: 12 }}>
                    {clientPortalActions.map(action => (
                        <div key={action.id} style={{ border: '1px solid var(--border)', borderRadius: 8, padding: 16, background: 'var(--bg)' }}>
                            <div style={{ fontWeight: 600, marginBottom: 6 }}>{action.title}</div>
                            <div style={{ color: 'var(--text-secondary)', marginBottom: 10 }}>{action.description}</div>
                            <button className="button-outline" style={{ width: 'auto' }} onClick={() => setSelectedAction(action.id)}>Start</button>
                        </div>
                    ))}
                </div>
            </div>

            {selectedAction && (
                <div className="module-card">
                    <h3 className="section-title">{clientPortalActions.find(a => a.id === selectedAction)?.title}</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>Static questionnaire preview and generated documents list:</p>
                    <ul style={{ paddingLeft: 18 }}>
                        {clientPortalActions.find(a => a.id === selectedAction)?.docs.map((d, i) => (
                            <li key={i} style={{ marginBottom: 6 }}>{d}</li>
                        ))}
                    </ul>
                    <div style={{ display: 'flex', gap: 10 }}>
                        <button className="form-button" style={{ width: 'auto' }}>Open Questionnaire (Static)</button>
                        <button className="button-outline" style={{ width: 'auto' }} onClick={() => setSelectedAction(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );

    const renderTestimonials = () => (
        <div className="module-card">
            <h3 className="section-title">What Our Clients Say</h3>
            <div className="module-card-row" style={{ marginTop: 12 }}>
                {testimonials.map((t, i) => (
                    <div key={i} style={{ border: '1px solid var(--border)', borderRadius: 8, padding: 16, background: 'var(--bg)' }}>
                        <div style={{ fontWeight: 600, marginBottom: 6 }}>{t.name}</div>
                        <div style={{ color: 'var(--text-secondary)' }}>“{t.quote}”</div>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: 16, color: 'var(--text-secondary)' }}>45+ five-star reviews</div>
        </div>
    );

    const renderContact = () => (
        <div className="module-grid">
            <div className="module-card">
                <h3 className="section-title">Contact Us</h3>
                <div style={{ display: 'grid', gap: 12 }}>
                    <div><strong>Phone:</strong> (307) 463-3600</div>
                    <div><strong>Email:</strong> hello@wyomingassetprotectiontrust.com</div>
                    <div><strong>Address:</strong> 1621 Central Avenue #8866, Cheyenne, WY 82001</div>
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                    <button className="form-button" style={{ width: 'auto' }} onClick={() => setActiveTab('consult')}>Book an Appointment</button>
                    <button className="button-outline" style={{ width: 'auto' }} onClick={() => navigate('/wyoming-apt')}>Visit Public Page (Mock)</button>
                </div>
            </div>

            <div className="module-card">
                <h3 className="section-title">Why Work With Matt?</h3>
                <ul style={{ paddingLeft: 18 }}>
                    <li>Bulletproof legal protection using Wyoming’s strongest-in-the-nation trust laws</li>
                    <li>Custom strategies — never cookie-cutter solutions</li>
                    <li>30+ years of experience in risk mitigation and trust formation</li>
                    <li>A calm, clear approach to complex legal issues</li>
                </ul>
            </div>
        </div>
    );

    return (
        <ModuleTemplate 
            title="Wyoming Asset Protection Trust (Mock)"
            description="Static, no-API mock experience replacing AgentIQ for the Wyoming APT workflow"
        >
            <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
                {([
                    { key: 'overview', label: '◻︎ My Web Content' },
                    { key: 'blog', label: '◻︎ My Blog' },
                    { key: 'services', label: '◻︎ Services' },
                    { key: 'consult', label: '◻︎ Consult' },
                    { key: 'client-portal', label: '◻︎ Client Portal' },
                    { key: 'testimonials', label: '◻︎ Testimonials' },
                    { key: 'contact', label: '◻︎ Contact' }
                ] as { key: TabKey; label: string }[]).map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`time-button ${activeTab === tab.key ? 'active' : ''}`}
                        style={{ padding: '10px 20px' }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'blog' && renderBlog()}
            {activeTab === 'services' && renderServices()}
            {activeTab === 'consult' && renderConsult()}
            {activeTab === 'client-portal' && renderClientPortal()}
            {activeTab === 'testimonials' && renderTestimonials()}
            {activeTab === 'contact' && renderContact()}
        </ModuleTemplate>
    );
};

export default AgentIQ;