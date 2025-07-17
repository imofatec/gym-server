import type { Training } from '../../../../domain/training.ts'
import type { trainingsExercises } from '../schema/trainings-exercises.ts'

export const DrizzleTrainingExercisesMapper = {
  toDomain(
    raw: (typeof trainingsExercises.$inferSelect)[]
  ): Training['exercisesIds'] {
    return raw.map((r) => r.exerciseId)
  },
}
