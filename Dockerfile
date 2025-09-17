# syntax=docker/dockerfile:1

# Unified image for both frontend (Vite) and backend (FastAPI)
FROM node:20-bullseye

ENV PYTHONUNBUFFERED=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    HOST=0.0.0.0

# Install Python and pip
RUN apt-get update \
    && apt-get install -y --no-install-recommends python3 python3-pip \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Backend deps
COPY backend/requirements.txt backend/requirements.txt
RUN pip3 install --no-cache-dir -r backend/requirements.txt

# Frontend deps (install only, build at runtime not required when using Vite dev server)
COPY frontend/package*.json frontend/
RUN cd frontend && npm ci

# Copy source
COPY . .

# Default to frontend; override per-service via env var SERVICE=backend|frontend
ENV SERVICE=frontend

# Render provides PORT; fall back for local runs
ENV PORT=3000

CMD ["/bin/sh","-lc","if [ \"$SERVICE\" = \"backend\" ]; then cd backend && exec uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}; else cd frontend && exec npm start -- --host 0.0.0.0 --port ${PORT:-3000}; fi"]


