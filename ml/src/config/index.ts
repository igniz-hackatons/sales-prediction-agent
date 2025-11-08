import { env } from "./env";

export default {
  database: {
    redis: {
      host: env.REDIS_HOST,
      port: env.REDIS_PORT,
      password: env.REDIS_PASSWORD,
    },
  },
  external: {
    chat: {
      token: env.CHAT_API_TOKEN,
      url: env.CHAT_API_URL,
    },
  },
} as const;
