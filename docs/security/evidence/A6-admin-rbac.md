### Evidence A6: Admin endpoints protected by shared header token

Snippets:

```
backend/app/api/admin_tasks.py: expects Header x_admin_token, compares to ADMIN_TASKS_TOKEN
```

Target remediation:
- Remove header token auth
- Require authenticated session with admin role
- Add rate limiting and audit logging

