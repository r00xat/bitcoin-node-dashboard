FROM node:20.10.0-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm@9
RUN pnpm install

COPY . .

CMD [ "pnpm", "start" ]