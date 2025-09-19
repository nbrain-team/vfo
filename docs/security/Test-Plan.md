## Security Remediation Test Plan

Run these tests in staging first; verify against acceptance criteria from the client’s document.

### P0 Tests
1) Cookie sessions
- Login: confirm `Set-Cookie` has HttpOnly, Secure, SameSite
- API call without cookie fails; with cookie succeeds
- localStorage has no tokens
- Logout clears cookie

2) Token encryption at rest
- Inspect DB row for user; confirm encrypted columns present and plaintext columns null/absent
- Rotation dry-run works; no raw tokens in logs

3) HTML sanitization
- Render payloads with `<script>` and `onerror` to confirm stripping

4) Upload limits
- Upload 25MB file -> 413
- Upload disallowed type -> 415
- Upload allowed type under 20MB -> 200

5) CORS/secret
- From non-allowed origin: preflight or request blocked
- Missing SECRET_KEY in prod -> app exits at startup

6) Admin RBAC
- Call admin route without session -> 401
- Call with non-admin role -> 403
- With admin role -> 200; audit log present

### P1 Tests
- Rate-limits on /token; 11th attempt in 15m -> blocked
- Admin 2FA enrollment and verification
- RAG prompt-injection tests fail to exfiltrate secrets
- Health endpoints respond <50ms; structured logs include request IDs

### P2 Tests
- Logs redact PII fields
- CI fails on high CVEs; SBOM generated
- Docker containers run as non-root; Trivy shows no high CVEs

