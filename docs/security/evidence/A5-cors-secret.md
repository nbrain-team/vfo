### Evidence A5: CORS wide and default secret key present

Snippets:

```
backend/app/main.py: allow_origins includes multiple prod origins; allow_methods=["*"]
backend/app/core/config.py: SECRET_KEY = "your-secret-key-here"
```

Target remediation:
- Restrict prod `allow_origins` to official UI only
- Enumerate only required methods
- Read SECRET_KEY from env; fail fast in prod if missing

