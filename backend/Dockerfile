# syntax=docker/dockerfile:1

FROM python:3.11-slim AS base

WORKDIR /app

FROM base AS builder
COPY requirements.txt requirements.txt
RUN pip install --prefix=/install --no-warn-script-location --no-cache-dir -r requirements.txt

FROM base AS runtime
ENV PATH=/install/bin:$PATH
COPY --from=builder /install /install
COPY ./app /app
RUN adduser --disabled-password --gecos "app" app && chown -R app:app /app
USER app
CMD ["sh","-lc","exec uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"]