import { z } from 'zod';
import 'dotenv/config';

const envSchema = z.object({
  APPNAME: z.string(),
  PORT: z.string(),
  NODE_ENV: z.string(),
  LOCALE: z.string(),
  PRODUCTION_URL: z.string(),
  CLIENT_BASE_URL: z.string().url(),
  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.string(),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_NAME: z.string(),
  DATABASE_URL: z.string().startsWith('postgresql://'),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string(),
  REDIS_PASSWORD: z.string(),
  CHAT_API_URL: z.string(),
  CHAT_API_TOKEN: z.string()
});

export const env = envSchema.parse(process.env);
