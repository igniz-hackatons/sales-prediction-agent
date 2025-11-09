ARG REDIS_HOST="${REDIS_HOST}" \
  REDIS_PORT="${REDIS_PORT}" \
  REDIS_PASSWORD="${REDIS_PASSWORD}" \
  CHAT_API_URL="${CHAT_API_URL}" \
  CHAT_API_TOKEN="${CHAT_API_TOKEN}"

FROM node:20.11-alpine AS builder

WORKDIR /var/www

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20.11-alpine AS production

WORKDIR /var/www

COPY package.json package-lock.json* ./
RUN npm install --omit=dev --frozen-lockfile

COPY --from=builder /var/www/dist ./dist

ENV REDIS_HOST=$REDIS_HOST \
    REDIS_PORT=$REDIS_PORT \
    REDIS_PASSWORD=$REDIS_PASSWORD \
    CHAT_API_URL=$CHAT_API_URL \
    CHAT_API_TOKEN=$CHAT_API_TOKEN

CMD ["node", "dist/main.js"]
