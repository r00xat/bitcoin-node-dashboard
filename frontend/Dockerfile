FROM node:20.10.0-slim as frontend-build

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm@9
RUN pnpm install

COPY . .

RUN pnpm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY --from=frontend-build /app/dist .