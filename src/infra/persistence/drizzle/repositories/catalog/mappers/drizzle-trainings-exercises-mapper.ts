import type { Training } from '../../../../../../domains/catalog/domain/training.ts'
import type { trainingsExercises } from '../../../schemas/catalog/trainings-exercises.ts'

export const DrizzleTrainingExercisesMapper = {
  toDomain(
    raw: (typeof trainingsExercises.$inferSelect)[]
  ): Training['exercisesIds'] {
    return raw.map((r) => r.exerciseId)
  },
}
