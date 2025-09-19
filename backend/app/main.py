from fastapi import FastAPI
import os
from fastapi.middleware.cors import CORSMiddleware
from app.db.db_init import init_db
from app.api.api import router as api_router
from app.api.legal import router as legal_router
from app.api.agent import router as agent_router
from app.api.chat import router as chat_router
from app.api.google_auth import router as google_auth_router
from app.api.test_config import router as test_config_router
from app.api.admin_tasks import router as admin_tasks_router
from app.api.superadmin import router as superadmin_router
from starlette.middleware.cors import CORSMiddleware as _
from starlette.middleware.base import BaseHTTPMiddleware
import uuid
import sentry_sdk
from sentry_sdk.integrations.asgi import SentryAsgiMiddleware
from sqlalchemy import text
from starlette.middleware.base import BaseHTTPMiddleware
import uuid

app = FastAPI(title="LIFTed VFO API", version="1.0.0")

# Optional Sentry integration
SENTRY_DSN = os.getenv("SENTRY_DSN")
if SENTRY_DSN:
    sentry_sdk.init(dsn=SENTRY_DSN, traces_sample_rate=0.05)
    app.add_middleware(SentryAsgiMiddleware)

# Configure CORS
allowed_origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:5174",
]
frontend_url = os.getenv("FRONTEND_URL")
if frontend_url:
    allowed_origins.append(frontend_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Request ID middleware for structured logs
class RequestIDMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        request_id = request.headers.get("X-Request-ID", str(uuid.uuid4()))
        response = await call_next(request)
        response.headers["X-Request-ID"] = request_id
        return response

app.add_middleware(RequestIDMiddleware)

# Security headers (basic hardening; CSP report-only suggested at edge)
class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        response = await call_next(request)
        response.headers.setdefault("X-Content-Type-Options", "nosniff")
        response.headers.setdefault("Referrer-Policy", "strict-origin-when-cross-origin")
        response.headers.setdefault("X-Frame-Options", "DENY")
        # HSTS for HTTPS-only environments
        if request.url.scheme == "https":
            response.headers.setdefault("Strict-Transport-Security", "max-age=15552000; includeSubDomains")
        return response

app.add_middleware(SecurityHeadersMiddleware)

@app.on_event("startup")
def on_startup():
    init_db()

app.include_router(api_router, prefix="/api")
app.include_router(legal_router, prefix="/api/legal", tags=["legal"])
app.include_router(agent_router, prefix="/api/agent", tags=["agent"])
app.include_router(chat_router, prefix="/api/chat", tags=["chat"])
app.include_router(google_auth_router, prefix="/api", tags=["google-auth"])
app.include_router(test_config_router, prefix="/api", tags=["test"])
app.include_router(admin_tasks_router, prefix="/api", tags=["admin"])
app.include_router(superadmin_router, prefix="/api", tags=["superadmin"])

@app.get("/")
def read_root():
    return {"message": "Welcome to LIFTed VFO API"} 

@app.get("/healthz")
def healthz():
    return {"status": "ok"}

@app.get("/readyz")
def readyz():
    # DB ping for readiness
    try:
        from app.db.database import engine
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        return {"status": "ready"}
    except Exception:
        return {"status": "degraded"}