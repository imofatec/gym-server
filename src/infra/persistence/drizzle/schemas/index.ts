import { exercises } from './catalog/exercises.ts'
import { trainingRelations, trainings } from './catalog/trainings.ts'
import {
  trainingsExercises,
  trainingsExercisesRelations,
} from './catalog/trainings-exercises.ts'
import { schedules, schedulesRelations } from './user-management/schedules.ts'
import { users, usersRelations } from './user-management/user.ts'

export const schemas = {
  users,
  usersRelations,
  schedules,
  schedulesRelations,
  exercises,
  trainings,
  trainingRelations,
  trainingsExercises,
  trainingsExercisesRelations,
}
