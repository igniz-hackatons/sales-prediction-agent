ARG REDIS_HOST="${REDIS_HOST}" \
  REDIS_PORT="${REDIS_PORT}" \
  REDIS_PASSWORD="${REDIS_PASSWORD}" \
  AMOCRM_TOKEN="${AMOCRM_TOKEN}" \
  AMOCRM_URL="${AMOCRM_URL}"

FROM node:20.11-alpine AS builder

WORKDIR /var/www

COPY package.json ./

RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

FROM node:20.11-alpine AS production

WORKDIR /var/www

COPY --from=builder /var/www/dist ./dist

RUN apk add --no-cache jq
RUN apk del jq

ENV REDIS_HOST="${REDIS_HOST}" \
  REDIS_PORT="${REDIS_PORT}" \
  REDIS_PASSWORD="${REDIS_PASSWORD}" \
  AMOCRM_TOKEN="${AMOCRM_TOKEN}" \
  AMOCRM_URL="${AMOCRM_URL}"

RUN node dist/main.js
