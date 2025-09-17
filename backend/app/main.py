from fastapi import FastAPI
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

app = FastAPI(title="LIFTed VFO API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:5174",
        "https://agentiq-vfo-frontend.onrender.com",
        "https://liftedvfo-frontend.onrender.com",
        "https://app.liftedvfo.io",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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