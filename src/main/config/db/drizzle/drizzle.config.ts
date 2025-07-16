import { defineConfig } from 'drizzle-kit'
import { env } from '../../env.ts'

export default defineConfig({
  out: './drizzle',
  schema: 'src/main/config/db/drizzle/schema/index.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
})
