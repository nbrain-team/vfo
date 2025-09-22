## LIFTed VFO – Platform Technical Scope, Security Posture, and Statement of Work

### 1) Purpose and Vision
LIFTed VFO is an AI-powered Virtual Family Office platform designed to unify client intake, CRM workflows, document management, trust and legal templates, RAG-backed knowledge retrieval, calendaring and payments integrations, and an advisor/client portal—delivered as a secure, multi-tenant web application.

### 2) High-Level Architecture
- Frontend: React + Vite TypeScript SPA served over CDN/edge (Render static service). Modules include Admin consoles, Client portal, SuperAdmin dashboards, and RAG UI.
- Backend: FastAPI (Python) with structured endpoints for auth, CRM, legal/vault, chat/RAG, superadmin/admin tasks.
- Database: PostgreSQL (Render-managed) for users, advisors/clients linkage, CRM entities, intakes, document metadata, and audit footprints.
- Vector/RAG: Embedding store with retrieval pipeline (vector DB service and local fallback), document processing (PDF/DOCX/TXT) + splitter.
- Integrations: Google OAuth/TOTP 2FA; Google Calendar; LawPay; optional Sentry; CI security scans; Alembic migrations.
- Runtime: Render (backend web service + static frontend), Docker-hardened images, global headers enforced at app layer and CSP at edge.

### 3) Core Functional Domains
3.1 Authentication & Authorization
- Cookie-session auth (HttpOnly, Secure, SameSite=Lax) with credentials included by default on Axios.
- JWT signing server-side; removal of Authorization header injection and localStorage tokens.
- RBAC: Roles include SuperAdmin, Admin/Advisor, Client. Admin endpoints enforce session + role and optional IP allowlist.
- 2FA: TOTP enforcement when enabled; SuperAdmin setup endpoint; frontend OTP flow. WebAuthn planned as next phase.

3.2 SuperAdmin / Admin Modules
- SuperAdmin overview of user counts and advisor management; CRUD for advisors; linkage of clients to advisors; security toggles.
- Admin consoles: CRM admin, Document/Vault admin, Pipelines, Nurture/Automation, Site Builder, and module-level settings.

3.3 Client Portal
- Personalized dashboard, document vault, matters view, questionnaires, advisor linkage, and booking/consult workflows.
- Vault: Metadata stored in DB; files saved via upload endpoints with MIME and size guardrails; RAG-indexed for retrieval.

3.4 Document & RAG
- Upload-and-index endpoint streams files, validates type (PDF/DOCX) and size (≤20MB), extracts text, chunks, and upserts to vector DB.
- RAG chat: Retrieves context, formats with citations, and sends to OpenAI with strict system prompt guardrails (no tool execution by content).
- Document insights across entities with source-citation and controlled prompt behavior.

3.5 CRM & Intake
- Entities, Contacts, Matters, Intakes, and FieldMappings stored in Postgres; client-request endpoints maintain advisor scoping.
- Public intake: lead submission creates contact/matter/intake records (scoped and auditable).

3.6 Calendar & Payments Integrations
- Google Calendar: Admin set-up flow; server-managed auth planned; client portal displays advisor schedule and booking flows.
- LawPay: Frontend integration for payment initiation (no secrets stored in the client); backend references for account keys via environment.

### 4) Security Posture (Implemented)
- XSS Mitigation: Sanitized HTML rendering using DOMPurify via `SafeHtml` component; removal of dangerouslySetInnerHTML for user content.
- Upload Hardening: MIME allowlist (PDF/DOCX), streaming read/write with 20MB cap; 415/413 responses for disallowed/oversize.
- CORS/Secrets: Restricted origins in prod via `FRONTEND_URL`; enumerated methods; app fails fast on missing/default `SECRET_KEY`/`DATABASE_URL`.
- RBAC & Admin Controls: Session auth for admin endpoints, rate-limiting for login, audit logging with request IDs, optional IP allowlist.
- PII/Secrets Redaction: Global logging redaction filter masks emails/tokens; admin audit logs redact sensitive values.
- Observability: `/healthz` (liveness), `/readyz` (DB ping), request ID middleware, optional Sentry integration.
- CI & Images: Bandit, pip-audit, npm audit (prod), Trivy filesystem scans wired; Docker hardened multi-stage builds; backend non-root user.
- Migrations: Alembic framework added; runtime DDL disabled in prod; `alembic upgrade head` runs on service start.

### 5) Security Posture (Environment/Edge Actions)
- Token Encryption Backfill (0.2): Set `APP_DEK` (>=32 bytes), run admin backfill endpoint, verify DB ciphertext/IV, then drop plaintext.
- CSP at Edge (1.4): Add `Content-Security-Policy-Report-Only` header in Render, monitor violations, then enforce `Content-Security-Policy`.
- 2FA WebAuthn (Optional): Extend TOTP with WebAuthn enrollment and verification for hardware-key/MFA diversity.

### 6) Data Model & Persistence (Summary)
- Users: role, email, hashed_password (nullable for provider-only), Google IDs, 2FA flags/secrets (encrypted), advisor links.
- CRM: Contacts, Matters, Intakes (JSON blobs for flexible payloads), FieldMapping.
- Legal/Vault: Document metadata; file paths for uploads; chunked vector records for RAG source retrieval.
- RAG store: Vector DB + metadata references; top-K retrieval with context formatting and source-citation.

### 7) Deployment & Ops
- Render: Backend (FastAPI/uvicorn) and static frontend service; `render.yaml` wired to run Alembic before app start.
- Environment: `FRONTEND_URL`, `DATABASE_URL`, `SECRET_KEY`, OpenAI, LawPay, Google client credentials, `APP_DEK`.
- Logs & Metrics: Structured JSON-like audit events, request IDs; Sentry configurable via DSN.

### 8) Validation & Evidence Artifacts
- Report: `docs/security/Client-Remediation-Report.md` (PDF in `docs/security/out/Client-Remediation-Report.pdf`).
- Tracker: `docs/security/Remediation-Tracker.csv` (XLSX in `docs/security/out/Remediation-Tracker.xlsx`).
- Evidence: `docs/security/evidence/*` with excerpts and implementation notes.
- Test Plan: `docs/security/Test-Plan.md`.

### 9) Statement of Work (SOW) – Build-Out and Hardening
The estimates below assume a small senior team with support from mid-level engineers. Hours are conservative and include planning, implementation, tests, and basic documentation.

9.1 Backend Services (FastAPI) – 140–180 hours
- Auth & Sessions (JWT/cookie, RBAC, 2FA TOTP, optional WebAuthn): 30–40
- Admin/SuperAdmin (RBAC, audit logging, IP allowlist, tools): 20–30
- CRM & Intake (CRUD, advisor scoping, public intake, JSON handling): 25–35
- Legal/Vault (uploads, metadata, streaming, RAG indexing hooks): 25–35
- RAG Service (retrieval, formatting, prompt guardrails, insights): 20–25
- Observability (health/readiness, structured logging, Sentry): 10–15
- Alembic Migrations (framework, baseline, runbook): 10–15

9.2 Frontend (React/Vite) – 120–160 hours
- Auth flows (login, OTP, session handling, logout): 20–25
- Admin Consoles (SuperAdmin/Advisor UIs, forms, tables): 35–50
- Client Portal (dashboard, vault, matters, questionnaires): 35–50
- RAG UX (chat, citation display, retrieval UI): 20–25
- Validation & Accessibility (sanitization, consistent theme): 10–15

9.3 Security Engineering – 80–110 hours
- Threat modeling & policy (PII redaction, secrets, data retention): 15–20
- Edge security (CSP rollout/reporting/enforcement): 15–20
- Token encryption at rest (APP_DEK, backfill, rotation runbook): 20–30
- CI/CD Scanning & SBOM (Bandit, pip-audit, npm audit, Trivy, image scans): 15–20
- Pen test coordination & remediation: 15–20

9.4 DevOps & Platform – 70–100 hours
- Render configuration (multi-env, secrets, hooks): 15–20
- Docker hardening & image size optimization: 10–15
- Migrations in deploy flow & rollback runbook: 15–20
- Monitoring/log shipping (Sentry, dashboards): 10–15
- Backup/restore & DR drills: 20–30

9.5 Project/QA/Docs – 60–90 hours
- PM & stakeholder reviews: 20–30
- QA and UAT coordination: 20–30
- Documentation (operator runbooks, user guides, security reports): 20–30

Total Estimated Hours (range): 470–640 hours
Team composition (typical)
- Tech Lead / Architect (backend/security-leaning)
- Backend Engineer(s) (FastAPI, security)
- Frontend Engineer(s) (React/TypeScript)
- DevOps Engineer (Render/Docker/Alembic/CI)
- Security Engineer (PII, CSP, encryption, scans)
- QA Engineer & Project Manager

Notes on estimation
- Ranges reflect variance in integrations (calendar/payments), AI guardrails, and data migration complexity.
- Parallelization can compress timeline with larger team; hours stay similar.

### 10) Roadmap Considerations (Post-Launch)
- WebAuthn MFA; session management UI (device/session revocation).
- RAG alignment tests (prompt injection suites) and content provenance.
- Data lifecycle (auto-expiration, PII minimization, data subject requests).
- Advanced audit trails and anomaly detection.
- Multi-tenant isolation model (schema or row-level security), if/when needed.

---
For further details, please see the source-linked artifacts:
- Remediation Report: `docs/security/Client-Remediation-Report.md`
- Tracker: `docs/security/Remediation-Tracker.csv`
- Evidence pack: `docs/security/evidence/`
- Test Plan: `docs/security/Test-Plan.md`

