from fastapi import FastAPI
from app.db.db_init import init_db
from app.api.api import router as api_router
from app.api.legal import router as legal_router

app = FastAPI(title="AGENTIQ VFO")

@app.on_event("startup")
def on_startup():
    init_db()

app.include_router(api_router, prefix="/api")
app.include_router(legal_router, prefix="/api/legal", tags=["legal"])

@app.get("/")
def read_root():
    return {"message": "Welcome to AGENTIQ VFO"} 