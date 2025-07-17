import { relations } from 'drizzle-orm'
import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'
import { trainings } from '../catalog/trainings.ts'
import { schedules } from './schedules.ts'

export const schedulesTrainings = pgTable(
  'schedules_trainings',
  {
    scheduleId: uuid('schedule_id')
      .notNull()
      .references(() => schedules.id),
    trainingId: uuid('training_id')
      .notNull()
      .references(() => trainings.id),
  },
  (t) => [primaryKey({ columns: [t.scheduleId, t.trainingId] })]
)

export const schedulesTrainingsRelations = relations(
  schedulesTrainings,
  ({ one }) => ({
    schedule: one(schedules, {
      fields: [schedulesTrainings.scheduleId],
      references: [schedules.id],
    }),
    training: one(trainings, {
      fields: [schedulesTrainings.trainingId],
      references: [trainings.id],
    }),
  })
)
