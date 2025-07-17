import { reset } from 'drizzle-seed'
import { db } from './connection.ts'
import { schemas } from './schemas/index.ts'

await reset(db, schemas)

// biome-ignore lint/suspicious/noConsole: seeded database info
console.log('Database seeded')
