import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { schedules } from './schedules.ts'

export const users = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  username: text().notNull(),
  password: text().notNull(),
  email: text().notNull().unique(),
  role: text().notNull(),
  createdAt: timestamp('created_at', { withTimezone: false }).notNull(),
})

export const usersRelations = relations(users, ({ many }) => ({
  schedules: many(schedules),
}))
