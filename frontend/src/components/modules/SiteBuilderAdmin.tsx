import React, { useState, useEffect } from 'react';
import ModuleTemplate from './ModuleTemplate';
import { getSiteConfig, saveSiteConfig } from '../../adminData';
import apiClient from '../../apiClient';

interface SiteBuilderProps { embedded?: boolean }

const SiteBuilderAdmin: React.FC<SiteBuilderProps> = ({ embedded = false }) => {
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
  
  // Username selection
  const [username, setUsername] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isAdvisor, setIsAdvisor] = useState(false);
  
  // Fetch current user info
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await apiClient.get('/users/me');
        setCurrentUser(response.data);
        setIsAdvisor(response.data.role === 'Advisor' || response.data.role === 'Admin');
        if (response.data.username) {
          setUsername(response.data.username);
        }
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };
    fetchUserInfo();
  }, []);
  
  // Check username availability
  useEffect(() => {
    if (username.length > 2 && username !== currentUser?.username) {
      const timer = setTimeout(() => {
        setCheckingUsername(true);
        apiClient.get(`/advisors/check-username/${username}`)
          .then(response => {
            setUsernameAvailable(response.data.available);
            setCheckingUsername(false);
          })
          .catch(() => {
            setCheckingUsername(false);
          });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [username, currentUser]);

  const content = (
      <div className="module-grid">
        <div className="module-card">
          <h3 className="section-title">Site Configuration</h3>
          <div style={{ display: 'grid', gap: 12 }}>
            {isAdvisor && (
              <>
                <div>
                  <label className="form-label">Username (for your public URL)</label>
                  <input 
                    className="form-input" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                    placeholder="e.g., john-smith"
                    style={{
                      borderColor: username.length > 2 && username !== currentUser?.username ? (
                        checkingUsername ? 'var(--warning)' : 
                        usernameAvailable === false ? 'var(--danger)' : 
                        usernameAvailable === true ? 'var(--success)' : 'var(--border)'
                      ) : 'var(--border)'
                    }}
                  />
                  <small style={{ 
                    display: 'block', 
                    marginTop: '4px', 
                    color: 'var(--text-secondary)',
                    fontSize: '12px'
                  }}>
                    Your public URL will be: https://liftedadvisors.com/{username || 'username'}
                  </small>
                  {username.length > 2 && username !== currentUser?.username && (
                    <small style={{ 
                      display: 'block', 
                      marginTop: '4px', 
                      color: checkingUsername ? 'var(--warning)' : 
                             usernameAvailable === false ? 'var(--danger)' : 
                             usernameAvailable === true ? 'var(--success)' : 'var(--text-secondary)',
                      fontSize: '12px'
                    }}>
                      {checkingUsername ? 'Checking availability...' :
                       usernameAvailable === false ? 'Username already taken' :
                       usernameAvailable === true ? 'Username available!' : ''}
                    </small>
                  )}
                </div>
                <div>
                  <label className="form-label">Custom Domain (optional)</label>
                  <input 
                    className="form-input" 
                    value={customUrl} 
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="e.g., https://wyomingassetprotectiontrust.com"
                  />
                  <small style={{ 
                    display: 'block', 
                    marginTop: '4px', 
                    color: 'var(--text-secondary)',
                    fontSize: '12px'
                  }}>
                    You can connect your own domain to redirect to your LIFTed Advisors page
                  </small>
                </div>
                <hr style={{ margin: '8px 0', border: '0', borderTop: '1px solid var(--border-light)' }} />
              </>
            )}
            <h4 style={{ fontSize: '16px', marginBottom: '4px' }}>Brand & Media</h4>
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
              <label className="form-label">Payment Settings</label>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: '12px' }}>
                <input 
                  type="checkbox" 
                  id="paywall-toggle"
                  checked={paywallEnabled} 
                  onChange={(e) => {
                    setPaywallEnabled(e.target.checked);
                    saveSiteConfig({ 
                      videoUrl, logoPath, logoDataUrl, headline, subhead, ctaText, ctaHref, 
                      primaryColor, goldStart, goldEnd, images, paywallEnabled: e.target.checked
                    });
                  }} 
                />
                <label htmlFor="paywall-toggle">Enable payments for booked consults</label>
              </div>
              
              {paywallEnabled && (
                <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                  <p>✓ LawPay integration is configured via backend environment variables</p>
                </div>
              )}
            </div>
            <button 
              className="form-button" 
              style={{ width: 'auto' }} 
              onClick={async () => {
                // Save site config
                saveSiteConfig({ 
                  videoUrl, logoPath, logoDataUrl, headline, subhead, ctaText, ctaHref, 
                  primaryColor, goldStart, goldEnd, images, paywallEnabled
                });
                
                // Update username if advisor
                if (isAdvisor && username && username !== currentUser?.username && usernameAvailable) {
                  try {
                    await apiClient.patch(`/users/${currentUser.id}`, { username });
                    alert('Settings and username saved successfully!');
                  } catch (error) {
                    alert('Settings saved but failed to update username');
                  }
                } else {
                  alert('Settings saved successfully!');
                }
                
                setPreviewKey(Date.now());
              }}
              disabled={isAdvisor && username.length > 2 && username !== currentUser?.username && usernameAvailable === false}
            >
              Save All Settings
            </button>
          </div>
        </div>

        <div className="module-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 className="section-title">Live Preview</h3>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="button-outline" style={{ width: 'auto' }} onClick={() => setPreviewKey(Date.now())}>Refresh</button>
              <button 
                className="button-outline" 
                style={{ width: 'auto' }} 
                onClick={() => window.open(username ? `/${username}` : '/wyoming-apt', '_blank')}
              >
                Preview Live Site
              </button>
            </div>
          </div>
          <div style={{ border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden', background: 'var(--card-bg)' }}>
            <iframe 
              title="Public Site Preview" 
              key={previewKey} 
              src={`/wyoming-apt?ts=${previewKey}`} 
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              style={{ width: '100%', height: '720px', border: 'none' }} 
            />
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
  );

  if (embedded) {
    return content;
  }

  return (
    <ModuleTemplate
      title="Site Builder"
      description="Configure your public page theme and blocks (mock)."
    >
      {content}
    </ModuleTemplate>
  );
};

export default SiteBuilderAdmin;


