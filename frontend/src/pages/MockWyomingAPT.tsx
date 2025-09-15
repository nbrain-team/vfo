import React from 'react';
import { getSiteConfig } from '../adminData';
import '../public.css';

const MockWyomingAPT: React.FC = () => {
    const cfg = getSiteConfig();
    const logoSrc = (cfg as any).logoDataUrl || (cfg as any).logoPath || '/wy-apt-logo.png';
    const phone = (cfg as any).contactPhone || '(307) 463-3600';
    const ctaText = (cfg as any).ctaText || 'Book a Call';
    const ctaHref = (cfg as any).ctaHref || '/wyoming-apt/select';
    const headline = (cfg as any).headline || 'Wyoming Asset Protection Trusts';
    const subhead = (cfg as any).subhead || 'Shield your wealth with proven structures under Wyoming law.';
    const videoUrl = (cfg as any).videoUrl || 'https://drive.google.com/file/d/1otkNyA5S8AaIv_QW0J2sjtIFCqpf9P5K/preview';

    const services: { title: string; subtitle: string }[] = ((cfg as any).services || []).map((s: any) => ({ title: s.title, subtitle: s.subtitle }));
    return (
        <div className="public-site">
            <div className="public-container">
                <header className="public-header">
                    <div className="public-logo">
                        <img src={logoSrc} alt="Firm Logo" />
                        <div>
                            <div style={{ fontWeight: 700, color: 'var(--brand-forest)' }}>{(cfg as any).advisorName || 'Advisor'}</div>
                            <div style={{ fontSize: 12, color: 'var(--brand-slate)' }}>by {(cfg as any).advisorName || 'Advisor'}</div>
                        </div>
                    </div>
                    <nav className="public-nav" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <a className="btn-link" href="#top" style={{ textDecoration: 'none' }}>Home</a>
                        <a className="btn-link" href="#services" style={{ textDecoration: 'none' }}>Services</a>
                        <a className="btn-link" href="/blog" style={{ textDecoration: 'none' }}>Blog</a>
                        <a className="btn-link" href="#contact" style={{ textDecoration: 'none' }}>Contact</a>
                        <div className="public-cta" style={{ display: 'flex', gap: 8 }}>
                            <a className="btn-primary" href={`tel:${phone.replace(/[^\d+]/g, '')}`} style={{ textDecoration: 'none' }}>Call: {phone}</a>
                            <a className="btn-gradient" href={ctaHref} style={{ textDecoration: 'none' }}>{ctaText}</a>
                        </div>
                    </nav>
                </header>

                <section className="public-hero">
                    <h1>{headline}</h1>
                    <p>{subhead}</p>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                        <a className="btn-gradient" href={ctaHref} style={{ textDecoration: 'none' }}>{ctaText}</a>
                        <a className="btn-outline" href="#testimonials" style={{ textDecoration: 'none' }}>See Client Stories</a>
                    </div>
                </section>

                <section className="public-section" style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', background: '#000' }}>
                        <iframe
                            src={videoUrl}
                            title="Intro Video"
                            allow="autoplay; fullscreen"
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                        />
                    </div>
                </section>

                <section className="public-section" id="services">
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
                        {(services.length > 0 ? services : [
                            { title: 'Wyoming Asset Protection Trusts', subtitle: 'DAPTs designed for real protection while maintaining access and control.' },
                            { title: 'Private Family Trust Companies', subtitle: 'Serve as trustee, enhance privacy, and centralize family asset management.' },
                            { title: 'Trust Support & Maintenance', subtitle: 'Year-one guidance, distributions, minutes, and ongoing annual maintenance.' }
                        ]).map((svc, i) => (
                            <div className="public-card" key={i}>
                                <h3>{svc.title}</h3>
                                <p>{svc.subtitle}</p>
                            </div>
                        ))}
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

                <section className="public-section" id="contact">
                    <h2>Contact</h2>
                    <p><strong>Phone:</strong> {phone}</p>
                    <p><strong>Email:</strong> {(cfg as any).contactEmail || 'hello@example.com'}</p>
                    <p><strong>Address:</strong> {(cfg as any).contactAddress || '1621 Central Avenue #8866, Cheyenne, WY 82001'}</p>
                </section>

                <footer className="public-footer">
                    ©2025 Wyoming Asset Protection Attorney - by Matt Meuli. All rights reserved.
                </footer>
            </div>
        </div>
    );
};

export default MockWyomingAPT;


