### Evidence A8: Hardcoded Google OAuth client ID fallback

Occurrences:

```
frontend/src/providers/GoogleAuthProvider.tsx: import.meta.env.VITE_GOOGLE_CLIENT_ID || '<literal client id>'
frontend/src/pages/TestGoogleAuth.tsx: import.meta.env.VITE_GOOGLE_CLIENT_ID || '<literal client id>'
```

Target remediation:
- Remove literals; require env var at build time

