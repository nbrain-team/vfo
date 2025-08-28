import React, { useEffect, useState } from 'react';

const TestGoogleAuth: React.FC = () => {
    const [status, setStatus] = useState<any>({});
    
    useEffect(() => {
        // Check environment variables
        const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '30007618988-jbj6cjee87sf3c9geshtr0uifs4la8n0.apps.googleusercontent.com';
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';
        
        setStatus({
            clientId: clientId,
            clientIdLength: clientId.length,
            apiBaseUrl: apiBaseUrl || 'Not set (will use relative URLs)',
            googleLibraryLoaded: typeof (window as any).google !== 'undefined',
            tokenStored: !!localStorage.getItem('access_token'),
            userEmail: localStorage.getItem('user_email') || 'Not logged in'
        });
        
        // Test backend config endpoint
        fetch(`${apiBaseUrl}/api/test/config`)
            .then(res => res.json())
            .then(data => {
                setStatus(prev => ({ ...prev, backendConfig: data }));
            })
            .catch(err => {
                setStatus(prev => ({ ...prev, backendConfigError: err.message }));
            });
    }, []);
    
    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Google OAuth Debug Information</h1>
            
            <h2>Frontend Configuration</h2>
            <pre style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
                {JSON.stringify(status, null, 2)}
            </pre>
            
            <h2>Steps to Fix Google Authentication</h2>
            <ol>
                <li>Ensure Google Client ID is correct: {status.clientId?.substring(0, 20)}...</li>
                <li>Check that the OAuth consent screen is configured in Google Cloud Console</li>
                <li>Verify authorized JavaScript origins include:
                    <ul>
                        <li>https://agentiq-vfo-frontend.onrender.com</li>
                        <li>http://localhost:5174 (for local dev)</li>
                    </ul>
                </li>
                <li>Ensure backend has matching Google Client ID</li>
            </ol>
            
            <button onClick={() => window.location.href = '/login'}>
                Back to Login
            </button>
        </div>
    );
};

export default TestGoogleAuth;
