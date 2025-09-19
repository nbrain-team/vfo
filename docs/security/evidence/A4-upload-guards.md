### Evidence A4: Upload endpoints lack size/type guardrails

Endpoints:

```
backend/app/api/chat.py: /upload-and-index
backend/app/api/legal.py: /entities/{entity_id}/documents/
```

Target remediation:
- ALLOW list: application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document
- MAX_BYTES = 20 * 1024 * 1024
- Stream to disk; return 413/415 appropriately

