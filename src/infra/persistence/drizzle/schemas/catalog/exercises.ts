import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { trainings } from './trainings.ts'

export const exercises = pgTable('exercises', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  description: text(),
  equipment: text(),
  createdAt: timestamp('created_at', { withTimezone: false }).notNull(),
})

export const exercisesRelations = relations(exercises, ({ many }) => ({
  trainingsExercises: many(trainings),
}))
