import { relations } from 'drizzle-orm'
import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'
import { exercises } from './exercises.ts'
import { trainings } from './trainings.ts'

export const trainingsExercises = pgTable(
  'trainings_exercises',
  {
    trainingId: uuid('training_id')
      .notNull()
      .references(() => trainings.id),
    exerciseId: uuid('exercise_id')
      .notNull()
      .references(() => exercises.id),
  },
  (t) => [primaryKey({ columns: [t.trainingId, t.exerciseId] })]
)

export const trainingsExercisesRelations = relations(
  trainingsExercises,
  ({ one }) => ({
    training: one(trainings, {
      fields: [trainingsExercises.trainingId],
      references: [trainings.id],
    }),
    exercise: one(exercises, {
      fields: [trainingsExercises.exerciseId],
      references: [exercises.id],
    }),
  })
)
