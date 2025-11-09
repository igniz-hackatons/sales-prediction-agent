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
    crm: {
      token: env.token,
      baseUrl: env.baseUrl,
    },
  },
} as const;
