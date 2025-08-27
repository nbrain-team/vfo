import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import apiClient from '../apiClient';
import googleCalendarService from '../services/googleCalendarService';

const CalendarCallback: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    useEffect(() => {
        const handleCallback = async () => {
            const code = searchParams.get('code');
            const state = searchParams.get('state'); // User email
            const error = searchParams.get('error');
            
            if (error) {
                console.error('OAuth error:', error);
                navigate('/admin/calendar?error=auth_failed');
                return;
            }
            
            if (code && state) {
                try {
                    // Exchange code for tokens
                    const response = await apiClient.post('/api/auth/google/calendar-callback', {
                        code,
                        state
                    });
                    
                    if (response.data.google_access_token) {
                        // Store the calendar access token
                        googleCalendarService.setAccessToken(response.data.google_access_token);
                        navigate('/admin/calendar?success=true');
                    } else {
                        navigate('/admin/calendar?error=no_token');
                    }
                } catch (error) {
                    console.error('Callback error:', error);
                    navigate('/admin/calendar?error=callback_failed');
                }
            } else {
                navigate('/admin/calendar?error=invalid_callback');
            }
        };
        
        handleCallback();
    }, [navigate, searchParams]);
    
    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh',
            background: 'var(--background-primary)'
        }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Connecting Google Calendar...</h2>
                <p style={{ color: 'var(--text-secondary)', marginTop: '12px' }}>
                    Please wait while we complete the authorization
                </p>
            </div>
        </div>
    );
};

export default CalendarCallback;
