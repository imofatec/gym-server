import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  CLIENT: z.string().default('localhost:5173'),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
})

export const env = envSchema.parse(process.env)
