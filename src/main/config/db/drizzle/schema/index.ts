import { exercises } from '../../../../../domains/catalog/infra/persistence/drizzle/schema/exercises.ts'
import {
  trainingRelations,
  trainings,
} from '../../../../../domains/catalog/infra/persistence/drizzle/schema/trainings.ts'
import {
  trainingsExercises,
  trainingsExercisesRelations,
} from '../../../../../domains/catalog/infra/persistence/drizzle/schema/trainings-exercises.ts'
import {
  schedules,
  schedulesRelations,
} from '../../../../../domains/user-management/infra/persistence/drizzle/schema/schedules.ts'
import {
  users,
  usersRelations,
} from '../../../../../domains/user-management/infra/persistence/drizzle/schema/user.ts'

export { exercises } from '../../../../../domains/catalog/infra/persistence/drizzle/schema/exercises.ts'
export { trainings } from '../../../../../domains/catalog/infra/persistence/drizzle/schema/trainings.ts'
export { trainingsExercises } from '../../../../../domains/catalog/infra/persistence/drizzle/schema/trainings-exercises.ts'
export { schedules } from '../../../../../domains/user-management/infra/persistence/drizzle/schema/schedules.ts'
export { users } from '../../../../../domains/user-management/infra/persistence/drizzle/schema/user.ts'

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
