import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string(),
  REDIS_PASSWORD: z.string(),
  token: z.string(),
  baseUrl: z.string(),
});

export const env = envSchema.parse(process.env);
