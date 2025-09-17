# syntax=docker/dockerfile:1

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

ENV HOST=0.0.0.0
# Render Docker services expect the app to listen on port 10000 inside the container
EXPOSE 10000
CMD ["sh","-lc","exec npm run serve -- --host ${HOST} --port ${PORT:-10000}"]