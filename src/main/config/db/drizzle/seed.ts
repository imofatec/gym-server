import { reset, seed } from 'drizzle-seed'
import { db } from './connection.ts'
import { schemas } from './schema/index.ts'

await reset(db, schemas)

await seed(db, schemas)
// biome-ignore lint/suspicious/noConsole: seeded database info
console.log('Database seeded')
