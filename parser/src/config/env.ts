import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
    REDIS_HOST: z.string(),
    REDIS_PORT: z.string(),
    REDIS_PASSWORD: z.string(),
    AMOCRM_TOKEN: z.string(),
    AMOCRM_URL: z.string(),
});

export const env = envSchema.parse(process.env);
