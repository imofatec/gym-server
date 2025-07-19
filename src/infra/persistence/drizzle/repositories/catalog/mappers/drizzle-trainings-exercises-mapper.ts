import type { Training } from '../../../../../../domains/catalog/domain/training.ts'
import type { trainings } from '../../../schemas/catalog/trainings.ts'
import type { trainingsExercises } from '../../../schemas/catalog/trainings-exercises.ts'
import { groupByLeftJoin } from '../../utils/joins.ts'
import { DrizzleTrainingMapper } from './drizzle-training-mapper.ts'

export const DrizzleTrainingExercisesMapper = {
  toTraining(
    rows: {
      trainings: typeof trainings.$inferSelect
      trainings_exercises: typeof trainingsExercises.$inferSelect | null
    }[]
  ): Training[] {
    return groupByLeftJoin(
      rows.map((row) => ({
        left: row.trainings,
        right: row.trainings_exercises,
      })),
      (row) => {
        if (!row.right) {
          return null
        }
        return { id: row.left.id, value: row.right.exerciseId }
      },
      (training, exerciseIds) =>
        DrizzleTrainingMapper.toDomain(training, exerciseIds)
    )
  },
}
