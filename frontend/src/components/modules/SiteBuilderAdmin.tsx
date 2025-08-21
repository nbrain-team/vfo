import React, { useState } from 'react';
import ModuleTemplate from './ModuleTemplate';
import { getSiteConfig, saveSiteConfig } from '../../adminData';

const SiteBuilderAdmin: React.FC = () => {
  const initial = getSiteConfig();
  const [previewKey, setPreviewKey] = useState<number>(Date.now());
  const [videoUrl, setVideoUrl] = useState(initial.videoUrl || 'https://drive.google.com/file/d/1otkNyA5S8AaIv_QW0J2sjtIFCqpf9P5K/preview');
  const [logoPath, setLogoPath] = useState(initial.logoPath || '/wy-apt-logo.png');
  const [logoDataUrl, setLogoDataUrl] = useState(initial.logoDataUrl || '');
  const [headline, setHeadline] = useState(initial.headline || 'Wyoming Asset Protection Trusts');
  const [subhead, setSubhead] = useState(initial.subhead || 'Shield your wealth with proven structures under Wyoming law.');
  const [ctaText, setCtaText] = useState(initial.ctaText || 'Book a Call');
  const [ctaHref, setCtaHref] = useState(initial.ctaHref || '/wyoming-apt/select');
  const [primaryColor, setPrimaryColor] = useState(initial.primaryColor || '#3C4630');
  const [goldStart, setGoldStart] = useState(initial.goldStart || '#DCA85E');
  const [goldEnd, setGoldEnd] = useState(initial.goldEnd || '#C07C3D');
  const [images, setImages] = useState<string[]>(initial.images || []);
  const [paywallEnabled, setPaywallEnabled] = useState(!!initial.paywallEnabled);

  return (
    <ModuleTemplate
      title="Site Builder"
      description="Configure your public page theme and blocks (mock)."
    >
      <div className="module-grid">
        <div className="module-card">
          <h3 className="section-title">Brand & Media</h3>
          <div style={{ display: 'grid', gap: 12 }}>
            <div>
              <label className="form-label">Logo path</label>
              <input className="form-input" value={logoPath} onChange={(e) => setLogoPath(e.target.value)} />
            </div>
            <div>
              <label className="form-label">Upload Logo (mock)</label>
              <input type="file" accept="image/*" className="form-input" onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => setLogoDataUrl(String(reader.result || ''));
                reader.readAsDataURL(file);
              }} />
              {logoDataUrl && (
                <div style={{ marginTop: 8 }}>
                  <img src={logoDataUrl} alt="Logo preview" style={{ height: 40 }} />
                </div>
              )}
            </div>
            <div>
              <label className="form-label">Hero Video URL</label>
              <input className="form-input" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              <div>
                <label className="form-label">Primary Color</label>
                <input className="form-input" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} />
              </div>
              <div>
                <label className="form-label">Gradient Start</label>
                <input className="form-input" value={goldStart} onChange={(e) => setGoldStart(e.target.value)} />
              </div>
              <div>
                <label className="form-label">Gradient End</label>
                <input className="form-input" value={goldEnd} onChange={(e) => setGoldEnd(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="form-label">Headline</label>
              <input className="form-input" value={headline} onChange={(e) => setHeadline(e.target.value)} />
            </div>
            <div>
              <label className="form-label">Subhead</label>
              <input className="form-input" value={subhead} onChange={(e) => setSubhead(e.target.value)} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 8 }}>
              <div>
                <label className="form-label">CTA Text</label>
                <input className="form-input" value={ctaText} onChange={(e) => setCtaText(e.target.value)} />
              </div>
              <div>
                <label className="form-label">CTA Href</label>
                <input className="form-input" value={ctaHref} onChange={(e) => setCtaHref(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="form-label">Gallery Images (mock upload)</label>
              <input type="file" accept="image/*" multiple className="form-input" onChange={(e) => {
                const files = Array.from(e.target.files || []);
                if (files.length === 0) return;
                const readers = files.map(f => new Promise<string>((resolve) => {
                  const fr = new FileReader();
                  fr.onload = () => resolve(String(fr.result || ''));
                  fr.readAsDataURL(f);
                }));
                Promise.all(readers).then(urls => setImages(prev => [...prev, ...urls]));
              }} />
              {images.length > 0 && (
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
                  {images.map((src, i) => (
                    <img key={i} src={src} alt={`img-${i}`} style={{ height: 60, borderRadius: 6, border: '1px solid var(--border)' }} />
                  ))}
                </div>
              )}
            </div>
            <div>
              <label className="form-label">Consult Paywall</label>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input type="checkbox" checked={paywallEnabled} onChange={(e) => setPaywallEnabled(e.target.checked)} />
                <span>Require payment before scheduling (placeholder)</span>
              </div>
            </div>
            <button className="form-button" style={{ width: 'auto' }} onClick={() => {
              saveSiteConfig({ videoUrl, logoPath, logoDataUrl, headline, subhead, ctaText, ctaHref, primaryColor, goldStart, goldEnd, images, paywallEnabled });
              setPreviewKey(Date.now());
            }}>Save</button>
          </div>
        </div>

        <div className="module-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 className="section-title">Live Preview</h3>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="button-outline" style={{ width: 'auto' }} onClick={() => setPreviewKey(Date.now())}>Refresh</button>
              <a href="/wyoming-apt" target="_blank" rel="noreferrer" className="button-outline" style={{ textDecoration: 'none', width: 'auto' }}>Open in New Tab</a>
            </div>
          </div>
          <div style={{ border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden', background: 'var(--card-bg)' }}>
            <iframe title="Public Site Preview" key={previewKey} src={`/wyoming-apt?ts=${previewKey}`} style={{ width: '100%', height: '720px', border: 'none' }} />
          </div>
        </div>

        <div className="module-card">
          <h3 className="section-title">Preview Links</h3>
          <div style={{ display: 'grid', gap: 8 }}>
            <a href="/wyoming-apt" target="_blank" rel="noreferrer" className="button-outline" style={{ textDecoration: 'none', width: 'auto' }}>
              Open Public Site
            </a>
            <a href="/wyoming-apt/select" target="_blank" rel="noreferrer" className="button-outline" style={{ textDecoration: 'none', width: 'auto' }}>
              Open Booking (Step 1)
            </a>
            <a href="/wyoming-apt/book" target="_blank" rel="noreferrer" className="button-outline" style={{ textDecoration: 'none', width: 'auto' }}>
              Open Booking (Step 2)
            </a>
          </div>
        </div>
      </div>
    </ModuleTemplate>
  );
};

export default SiteBuilderAdmin;


