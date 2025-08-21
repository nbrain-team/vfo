import React, { useState } from 'react';
import ModuleTemplate from './ModuleTemplate';
import { getSiteConfig, saveSiteConfig } from '../../adminData';

const SiteBuilderAdmin: React.FC = () => {
  const initial = getSiteConfig();
  const [videoUrl, setVideoUrl] = useState(initial.videoUrl || 'https://drive.google.com/file/d/1otkNyA5S8AaIv_QW0J2sjtIFCqpf9P5K/preview');
  const [logoPath, setLogoPath] = useState(initial.logoPath || '/wy-apt-logo.png');
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
              <label className="form-label">Hero Video URL</label>
              <input className="form-input" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
            </div>
            <div>
              <label className="form-label">Consult Paywall</label>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input type="checkbox" checked={paywallEnabled} onChange={(e) => setPaywallEnabled(e.target.checked)} />
                <span>Require payment before scheduling (placeholder)</span>
              </div>
            </div>
            <button className="form-button" style={{ width: 'auto' }} onClick={() => saveSiteConfig({ videoUrl, logoPath, paywallEnabled })}>Save</button>
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


