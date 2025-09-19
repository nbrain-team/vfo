### Evidence A1: Browser-stored tokens

Findings confirmed via grep:

```
frontend/src/apiClient.ts: localStorage.getItem('access_token') -> Authorization header
frontend/src/pages/Login.tsx: localStorage.setItem('access_token')
frontend/src/services/googleCalendarService.ts: localStorage.getItem('google_access_token')
```

Acceptance (target):
- No localStorage token usage
- HttpOnly cookie set on login
- withCredentials configured in Axios

