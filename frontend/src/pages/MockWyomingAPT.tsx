import React from 'react';
import '../public.css';

const MockWyomingAPT: React.FC = () => {
    return (
        <div className="public-site">
            <div className="public-container">
                <header className="public-header">
                    <div className="public-logo">
                        <img src="/wy-apt-logo.png" alt="Firm Logo" />
                        <div>
                            <div style={{ fontWeight: 700, color: 'var(--brand-forest)' }}>Wyoming Asset Protection</div>
                            <div style={{ fontSize: 12, color: 'var(--brand-slate)' }}>by Matt Meuli</div>
                        </div>
                    </div>
                    <div className="public-cta">
                        <a className="btn-primary" href="tel:+13074633600" style={{ textDecoration: 'none' }}>Call: (307) 463-3600</a>
                        <a className="btn-gradient" href="/wyoming-apt/select" style={{ textDecoration: 'none' }}>Book an Appointment</a>
                    </div>
                </header>

                <section className="public-hero">
                    <h1>Get Expert Asset Protection Advice</h1>
                    <p>
                        During your consult, we’ll review your risk exposure, recommend the right trust structure or entity setup, and outline next steps to secure your wealth.
                    </p>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                        <a className="btn-gradient" href="/wyoming-apt/select" style={{ textDecoration: 'none' }}>Book a Call</a>
                        <a className="btn-outline" href="#testimonials" style={{ textDecoration: 'none' }}>See Client Stories</a>
                    </div>
                </section>

                <section className="public-section" style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', background: '#000' }}>
                        <iframe
                            src="https://drive.google.com/file/d/1otkNyA5S8AaIv_QW0J2sjtIFCqpf9P5K/preview"
                            title="Intro Video"
                            allow="autoplay; fullscreen"
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                        />
                    </div>
                </section>

                <section className="public-section">
                    <h2>Why Work With Matt Meuli?</h2>
                    <div className="public-grid">
                        <div className="public-card">
                            <h3>Bulletproof Legal Protection</h3>
                            <p>Use Wyoming’s strongest-in-the-nation trust laws to shield what matters most.</p>
                        </div>
                        <div className="public-card">
                            <h3>Custom Strategies</h3>
                            <p>Every plan is built for your unique assets, risks, and goals.</p>
                        </div>
                        <div className="public-card">
                            <h3>30+ Years Experience</h3>
                            <p>Deep experience in trust formation and high-liability scenarios.</p>
                        </div>
                    </div>
                </section>

                <section className="public-section">
                    <h2>Our Core Services</h2>
                    <div className="public-grid">
                        <div className="public-card">
                            <h3>Wyoming Asset Protection Trusts</h3>
                            <p>DAPTs designed for real protection while maintaining access and control.</p>
                        </div>
                        <div className="public-card">
                            <h3>Private Family Trust Companies</h3>
                            <p>Serve as trustee, enhance privacy, and centralize family asset management.</p>
                        </div>
                        <div className="public-card">
                            <h3>Trust Support & Maintenance</h3>
                            <p>Year-one guidance, distributions, minutes, and ongoing annual maintenance.</p>
                        </div>
                    </div>
                </section>

                {/* Featured Posts section pulled from site config if present */}
                <section className="public-section">
                    <h2>Featured Posts</h2>
                    <div className="public-grid">
                        {/* This is a placeholder; the actual featured list is rendered on /blog */}
                        <div className="public-card">
                            <h3>Visit our Blog</h3>
                            <p>Read featured insights and recent updates.</p>
                            <a className="btn-outline" href="/blog" style={{ textDecoration: 'none' }}>Go to Blog</a>
                        </div>
                    </div>
                </section>

                <section className="public-section" id="testimonials">
                    <h2>What Clients Say</h2>
                    <div className="public-grid">
                        <div className="public-card">
                            <strong>Jim R</strong>
                            <p>“Very thorough and helpful in transferring assets into our new trust.”</p>
                        </div>
                        <div className="public-card">
                            <strong>Gordon Middleton</strong>
                            <p>“Explained everything clearly in terms we could understand.”</p>
                        </div>
                        <div className="public-card">
                            <strong>Maury Dobbie</strong>
                            <p>“Wonderful to work with, knowledgeable, and helpful.”</p>
                        </div>
                    </div>
                </section>

                <section className="public-section">
                    <h2>Contact</h2>
                    <p><strong>Phone:</strong> (307) 463-3600</p>
                    <p><strong>Email:</strong> hello@wyomingassetprotectiontrust.com</p>
                    <p><strong>Address:</strong> 1621 Central Avenue #8866, Cheyenne, WY 82001</p>
                </section>

                <footer className="public-footer">
                    ©2025 Wyoming Asset Protection Attorney - by Matt Meuli. All rights reserved.
                </footer>
            </div>
        </div>
    );
};

export default MockWyomingAPT;


