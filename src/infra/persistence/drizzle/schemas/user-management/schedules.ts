import { relations } from 'drizzle-orm'
import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'
import { trainings } from '../catalog/trainings.ts'
import { users } from './user.ts'

export const schedules = pgTable('schedules', {
  id: uuid().primaryKey().defaultRandom(),
  studentId: uuid('student_id').references(() => users.id),
  startDate: timestamp('start_date', { withTimezone: false }).notNull(),
  finishDate: timestamp('finish_date', { withTimezone: false }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: false }).notNull(),
})

export const schedulesRelations = relations(schedules, ({ one, many }) => ({
  student: one(users, {
    fields: [schedules.studentId],
    references: [users.id],
  }),
  trainings: many(trainings),
}))
