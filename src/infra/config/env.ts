import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  CLIENT: z.string().default('localhost:5173'),
})

export const env = envSchema.parse(process.env)
