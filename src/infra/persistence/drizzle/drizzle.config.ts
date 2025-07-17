import { defineConfig } from 'drizzle-kit'
import { env } from '../../config/env.ts'

export default defineConfig({
  out: './drizzle',
  schema: 'src/infra/persistence/drizzle/schemas/**',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
})
