import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

interface GoogleAuthProviderProps {
    children: React.ReactNode;
}

const GoogleAuthProviderWrapper: React.FC<GoogleAuthProviderProps> = ({ children }) => {
    // Temporarily hardcoded - should be moved to environment variable
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '30007618988-jbj6cjee87sf3c9geshtr0uifs4la8n0.apps.googleusercontent.com';

    if (!clientId) {
        console.error('Google Client ID is not configured');
    }

    return (
        <GoogleOAuthProvider clientId={clientId}>
            {children}
        </GoogleOAuthProvider>
    );
};

export default GoogleAuthProviderWrapper;
