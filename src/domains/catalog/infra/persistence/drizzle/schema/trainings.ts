import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { users } from '../../../../../user-management/infra/persistence/drizzle/schema/user.ts'
import { exercises } from './exercises.ts'

export const trainings = pgTable('trainings', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  dayOfWeek: text('day_of_week').notNull(),
  instructorId: uuid('instructor_id').references(() => users.id),
  createdAt: timestamp('created_at', { withTimezone: false }).notNull(),
})

export const trainingRelations = relations(trainings, ({ one, many }) => ({
  instructor: one(users, {
    fields: [trainings.instructorId],
    references: [users.id],
  }),
  trainingsExercises: many(exercises),
}))
