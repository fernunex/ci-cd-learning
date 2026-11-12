# Stage 1: Build
FROM node:24-bookworm-slim AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --include=dev

COPY src ./src

RUN npm run build


# Stage 2: Run
FROM node:24-bookworm-slim AS runtime

ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /app/dist/server.mjs ./server.mjs

USER node

EXPOSE 3000

CMD ["node", "server.mjs"]
