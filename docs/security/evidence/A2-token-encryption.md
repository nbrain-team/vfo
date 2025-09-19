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

Runbook:
1) Ensure `APP_DEK` (>=32 bytes) in Render backend env.
2) Login as Admin/SuperAdmin; run backfill:
   - POST `/api/admin/migrations/backfill-google-token-encryption`
   - Verify response `{ processed, skipped }`
3) Inspect DB: plaintext NULL; enc/iv populated.
4) Drop plaintext column:
   - POST `/api/admin/migrations/drop-plaintext-google-refresh-token`

