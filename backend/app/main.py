from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.db_init import init_db
from app.api.api import router as api_router
from app.api.legal import router as legal_router
from app.api.agent import router as agent_router

app = FastAPI(title="LIFTed VFO API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "https://agentiq-vfo-frontend.onrender.com"],
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

@app.get("/")
def read_root():
    return {"message": "Welcome to LIFTed VFO API"} 