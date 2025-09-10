import axios from 'axios';

interface CalendarEvent {
  id: string;
  summary: string;
  description?: string;
  start: {
    dateTime?: string;
    date?: string;
  };
  end: {
    dateTime?: string;
    date?: string;
  };
  attendees?: Array<{
    email: string;
    displayName?: string;
    responseStatus?: string;
  }>;
  location?: string;
  status?: string;
}

class GoogleCalendarService {
  private accessToken: string | null = null;
  private calendarId: string = 'primary';

  constructor() {
    // Check for token on initialization and periodically
    this.refreshAccessToken();
    // Refresh token from storage every 5 seconds to catch login updates
    setInterval(() => this.refreshAccessToken(), 5000);
  }
  
  private refreshAccessToken() {
    const token = localStorage.getItem('google_access_token');
    if (token && token !== this.accessToken) {
      this.accessToken = token;
    }
  }

  setAccessToken(token: string) {
    this.accessToken = token;
    localStorage.setItem('google_access_token', token);
  }

  async getEvents(timeMin?: string, timeMax?: string): Promise<CalendarEvent[]> {
    if (!this.accessToken) {
      throw new Error('No Google access token available');
    }

    try {
      const params = new URLSearchParams({
        timeMin: timeMin || new Date().toISOString(),
        timeMax: timeMax || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        singleEvents: 'true',
        orderBy: 'startTime',
      });

      const response = await axios.get(
        `https://www.googleapis.com/calendar/v3/calendars/${this.calendarId}/events?${params}`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      );

      return response.data.items || [];
    } catch (error) {
      console.error('Error fetching calendar events:', error);
      throw error;
    }
  }

  async createEvent(event: Partial<CalendarEvent>): Promise<CalendarEvent> {
    if (!this.accessToken) {
      throw new Error('No Google access token available');
    }

    try {
      const response = await axios.post(
        `https://www.googleapis.com/calendar/v3/calendars/${this.calendarId}/events`,
        event,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error creating calendar event:', error);
      throw error;
    }
  }

  async updateEvent(eventId: string, event: Partial<CalendarEvent>): Promise<CalendarEvent> {
    if (!this.accessToken) {
      throw new Error('No Google access token available');
    }

    try {
      const response = await axios.patch(
        `https://www.googleapis.com/calendar/v3/calendars/${this.calendarId}/events/${eventId}`,
        event,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error updating calendar event:', error);
      throw error;
    }
  }

  async deleteEvent(eventId: string): Promise<void> {
    if (!this.accessToken) {
      throw new Error('No Google access token available');
    }

    try {
      await axios.delete(
        `https://www.googleapis.com/calendar/v3/calendars/${this.calendarId}/events/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      );
    } catch (error) {
      console.error('Error deleting calendar event:', error);
      throw error;
    }
  }

  // Convert Google Calendar event to our booking format
  convertToBooking(event: CalendarEvent): any {
    const startTime = event.start.dateTime || event.start.date || '';
    const attendee = event.attendees?.[0];
    
    return {
      id: event.id,
      slot: new Date(startTime).toLocaleString(),
      name: attendee?.displayName || event.summary || 'Unknown',
      email: attendee?.email || '',
      pkg: event.location || 'Consultation',
      stage: event.status === 'confirmed' ? 'Confirmed' : 'Pending',
      googleEventId: event.id,
      description: event.description,
    };
  }

  // Check if we have valid calendar access
  hasCalendarAccess(): boolean {
    return !!this.accessToken;
  }

  // Request calendar access (redirect to Google OAuth)
  async requestCalendarAccess(): Promise<void> {
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
    
    try {
      const response = await axios.post(`${backendUrl}/api/auth/google/calendar-access`, {
        user_email: localStorage.getItem('user_email'),
      });
      
      if (response.data.auth_url) {
        window.location.href = response.data.auth_url;
      }
    } catch (error) {
      console.error('Error requesting calendar access:', error);
      throw error;
    }
  }
}

export default new GoogleCalendarService();
