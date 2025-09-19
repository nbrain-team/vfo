import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

interface GoogleAuthProviderProps {
    children: React.ReactNode;
}

const GoogleAuthProviderWrapper: React.FC<GoogleAuthProviderProps> = ({ children }) => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;

    if (!clientId) {
        console.error('VITE_GOOGLE_CLIENT_ID is not configured');
        return <>{children}</>;
    }

    return (
        <GoogleOAuthProvider clientId={clientId}>
            {children}
        </GoogleOAuthProvider>
    );
};

export default GoogleAuthProviderWrapper;
