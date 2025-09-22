#!/usr/bin/env bash
set -euo pipefail

echo "[deploy] Running Alembic migrations..."
alembic upgrade head
echo "[deploy] Migrations complete."



