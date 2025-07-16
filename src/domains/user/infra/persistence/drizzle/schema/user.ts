import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  username: text().notNull(),
  password: text().notNull(),
  email: text().notNull().unique(),
  role: text().notNull(),
  createdAt: timestamp('created_at', { withTimezone: false }).notNull(),
})
