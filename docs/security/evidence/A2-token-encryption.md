### Evidence A2: Plaintext provider tokens at rest

Confirmed columns in `backend/app/models/user.py`:

```
google_access_token = Column(String, nullable=True)
google_refresh_token = Column(String, nullable=True)
```

Target remediation:
- Add `google_refresh_token_enc` and `google_refresh_token_iv`
- Backfill and null plaintext columns
- Drop plaintext columns after verification

