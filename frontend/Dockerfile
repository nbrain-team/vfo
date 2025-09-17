# syntax=docker/dockerfile:1

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

ENV HOST=0.0.0.0
ENV PORT=8080
CMD ["sh","-lc","exec npm run serve -- --host ${HOST} --port ${PORT}"]