import React, { useState, useEffect } from 'react';

interface LawPayIntegrationProps {
  amount: number;
  description: string;
  clientName: string;
  clientEmail: string;
  onSuccess: (paymentId: string) => void;
  onError: (error: string) => void;
  onCancel?: () => void;
}

declare global {
  interface Window {
    LawPay: any;
  }
}

const LawPayIntegration: React.FC<LawPayIntegrationProps> = ({
  amount,
  description,
  clientName,
  clientEmail,
  onSuccess,
  onError,
  onCancel
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<any>(null);
  
  const publicKey = import.meta.env.VITE_LAWPAY_PUBLIC_KEY || 'DDpdqQzzTjyUDeVO28NdDg0eajQxAR1hpMdZEKmJhKR4RMcWmsCLrB9CwKav7JCW';

  useEffect(() => {
    let cancelled = false;

    const loadScriptWithRetry = (attempt: number) => {
      if (cancelled) return;
      // prevent double load
      const existing = document.querySelector('script[data-lawpay="1"]') as HTMLScriptElement | null;
      if (existing) {
        if (!isLoading) return;
        // if already present, wait a moment and initialize
        setTimeout(() => {
          if (!cancelled) {
            setIsLoading(false);
            initializeLawPay();
          }
        }, 100);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdn.lawpay.com/checkout/v2/checkout.js';
      script.async = true;
      script.defer = true;
      script.setAttribute('data-lawpay', '1');

      const timeoutId = window.setTimeout(() => {
        script.onerror?.(new Event('error'));
      }, 8000);

      script.onload = () => {
        window.clearTimeout(timeoutId);
        if (cancelled) return;
        try { console.log('[LawPay] Script loaded. Using key:', (publicKey || '').slice(0,6) + '...'); } catch {}
        setIsLoading(false);
        initializeLawPay();
      };
      script.onerror = () => {
        window.clearTimeout(timeoutId);
        if (cancelled) return;
        if (attempt < 2) {
          // retry after a brief backoff
          setTimeout(() => loadScriptWithRetry(attempt + 1), 600);
        } else {
          setError('Failed to load LawPay');
          setErrorDetails({ reason: 'script_load_failed' });
          setIsLoading(false);
          onError('Failed to load LawPay');
        }
      };
      document.body.appendChild(script);
    };

    // try to initialize if LawPay is already present
    if ((window as any).LawPay) {
      setIsLoading(false);
      initializeLawPay();
    } else {
      loadScriptWithRetry(0);
    }

    return () => {
      cancelled = true;
    };
  }, []);

  const initializeLawPay = () => {
    let attempts = 0;
    const poll = () => {
      if (window.LawPay) {
        try {
          const checkout = window.LawPay.checkout({
            publicKey: publicKey,
            amount: amount * 100, // Convert to cents
            currency: 'USD',
            description: description,
            customer: {
              name: clientName,
              email: clientEmail
            },
            appearance: {
              theme: 'minimal',
              variables: {
                colorPrimary: '#3C4630',
                colorBackground: '#ffffff',
                colorText: '#1E1E1E',
                colorDanger: '#dc3545',
                borderRadius: '8px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif'
              }
            },
            onSuccess: (result: any) => {
              console.log('LawPay payment successful:', result);
              onSuccess(result.paymentId || result.id);
            },
            onError: (error: any) => {
              console.error('LawPay payment error:', error);
              setError(error?.message || 'Payment failed');
              setErrorDetails(error);
              onError(error.message || 'Payment failed');
            },
            onCancel: () => {
              console.log('LawPay payment cancelled');
              if (onCancel) onCancel();
            }
          });
          checkout.mount('#lawpay-container');
          return;
        } catch (err) {
          console.error('LawPay initialization error:', err);
          setError('Failed to initialize payment form');
          setErrorDetails(String(err));
          onError('Failed to initialize payment form');
          return;
        }
      }
      if (attempts < 10) {
        attempts += 1;
        setTimeout(poll, 200);
      } else {
        setError('LawPay not available');
        setErrorDetails({ reason: 'global_missing' });
        onError('LawPay not available');
      }
    };
    poll();
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <div className="spinner" />
        <p style={{ marginTop: '16px', color: 'var(--text-secondary)' }}>
          Loading payment form...
        </p>
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div style={{ textAlign: 'center', padding: '12px', marginTop: '8px' }}>
          <div style={{ color: 'var(--danger)', marginBottom: '12px', fontWeight: 600 }}>
            {error}
          </div>
          {errorDetails && (
            <pre style={{ 
              textAlign: 'left',
              padding: '8px',
              background: '#fff4f4',
              border: '1px solid var(--danger)',
              borderRadius: '6px',
              fontSize: '12px',
              maxHeight: 180,
              overflow: 'auto'
            }}>
{typeof errorDetails === 'string' ? errorDetails : JSON.stringify(errorDetails, null, 2)}
            </pre>
          )}
          <button className="button-outline" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      )}

      <div id="lawpay-container" style={{ marginTop: '20px' }} />
      
      {/* Fallback form for demo purposes (works even if LawPay fails) */}
      <div style={{ 
        marginTop: '20px', 
        padding: '20px', 
        background: 'var(--background-secondary)', 
        borderRadius: '8px',
        border: '1px solid var(--border)'
      }}>
        <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Test Payment Information</h4>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          This is a test environment. Use the following test card details:
        </p>
        <div style={{ fontSize: '13px', fontFamily: 'monospace', background: 'var(--background)', padding: '12px', borderRadius: '4px' }}>
          Card Number: 4242 4242 4242 4242<br/>
          Expiry: Any future date<br/>
          CVC: Any 3 digits<br/>
          ZIP: Any 5 digits
        </div>
        
        <div style={{ marginTop: '20px', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          {onCancel && (
            <button className="button-outline" onClick={onCancel}>
              Cancel
            </button>
          )}
          <button 
            className="form-button" 
            onClick={() => {
              // Simulate successful payment for demo
              setTimeout(() => {
                onSuccess('test-payment-' + Date.now());
              }, 1500);
            }}
          >
            Complete Test Payment (${amount})
          </button>
        </div>
      </div>
    </div>
  );
};

export default LawPayIntegration;
