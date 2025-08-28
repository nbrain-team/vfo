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
  
  const publicKey = import.meta.env.VITE_LAWPAY_PUBLIC_KEY || 'DDpdqQzzTjyUDeVO28NdDg0eajQxAR1hpMdZEKmJhKR4RMcWmsCLrB9CwKav7JCW';

  useEffect(() => {
    // Load LawPay script
    const script = document.createElement('script');
    script.src = 'https://cdn.lawpay.com/checkout/v2/checkout.js';
    script.async = true;
    script.onload = () => {
      setIsLoading(false);
      initializeLawPay();
    };
    script.onerror = () => {
      setError('Failed to load LawPay');
      setIsLoading(false);
      onError('Failed to load LawPay');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initializeLawPay = () => {
    if (!window.LawPay) {
      setError('LawPay not available');
      return;
    }

    try {
      const checkout = window.LawPay.checkout({
        publicKey: publicKey,
        amount: amount * 100, // Convert to cents
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
          setError(error.message || 'Payment failed');
          onError(error.message || 'Payment failed');
        },
        onCancel: () => {
          console.log('LawPay payment cancelled');
          if (onCancel) onCancel();
        }
      });

      // Mount the checkout form
      checkout.mount('#lawpay-container');
    } catch (err) {
      console.error('LawPay initialization error:', err);
      setError('Failed to initialize payment form');
      onError('Failed to initialize payment form');
    }
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

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <div style={{ color: 'var(--error)', marginBottom: '16px' }}>
          {error}
        </div>
        <button className="button-outline" onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div id="lawpay-container" style={{ marginTop: '20px' }} />
      
      {/* Fallback form for demo purposes */}
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
