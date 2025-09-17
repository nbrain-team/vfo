# syntax=docker/dockerfile:1

FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY ./app /app

CMD ["sh","-lc","exec uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"] 