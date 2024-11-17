#Frontend
FROM node:20.10.0 AS frontend-build

RUN npm install -g pnpm@9
WORKDIR /app

COPY frontend/package.json frontend/pnpm-lock.yaml ./
RUN pnpm install

COPY frontend .
RUN pnpm run build

#Server
FROM alpine:3.20.3

RUN apk add --no-cache nodejs npm && \
   npm install -g pnpm@9 && \
   apk del npm

WORKDIR /app

COPY backend/package.json backend/pnpm-lock.yaml ./

# Copy the frontend build to the server
COPY --from=frontend-build /app/dist ./frontend/dist

WORKDIR /app/backend
COPY backend .
RUN pnpm install

CMD ["pnpm", "start"]