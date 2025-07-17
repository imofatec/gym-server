import { desc, eq } from 'drizzle-orm'
import { db } from '../../../../../main/config/db/drizzle/connection.ts'
import { withPagination } from '../../../../shared/repository/drizzle/with-pagination.ts'
import type { PaginationParams } from '../../../../shared/repository/pagination-params.js'
import type { Training } from '../../../domain/training.ts'
import type { TrainingRepository } from '../../../domain/training-repository.ts'
import { DrizzleTrainingMapper } from './mappers/drizzle-training-mapper.ts'
import { trainings } from './schema/trainings.ts'
import { trainingsExercises } from './schema/trainings-exercises.ts'

export class DrizzleTrainingRepository implements TrainingRepository {
  async findAll(pagination?: PaginationParams): Promise<Training[]> {
    let query = db
      .select()
      .from(trainings)
      .leftJoin(
        trainingsExercises,
        eq(trainings.id, trainingsExercises.trainingId)
      )
      .orderBy(desc(trainings.createdAt))
      .$dynamic()

    if (pagination) {
      const { page, pageSize } = pagination
      query = withPagination(query, page + 1, pageSize)
    }

    const rows = await query

    const exercisesByTraining: Record<string, string[]> = {}

    for (const row of rows) {
      const trainingId = row.trainings.id
      const exerciseId = row.trainings_exercises?.exerciseId

      if (!exerciseId) {
        continue
      }

      if (!exercisesByTraining[trainingId]) {
        exercisesByTraining[trainingId] = []
      }

      exercisesByTraining[trainingId].push(exerciseId)
    }

    return rows.map((r) => {
      const training = r.trainings
      const exerciseIds = exercisesByTraining[training.id] ?? []

      return DrizzleTrainingMapper.toDomain(training, exerciseIds)
    })
  }

  async save(training: Training): Promise<Training> {
    const raw = DrizzleTrainingMapper.toPersistence(training)

    const [row] = await db.insert(trainings).values(raw).returning()

    const newTraining = row

    await Promise.all(
      training.exercisesIds.map((eId) =>
        this._saveTrainingExercise(newTraining.id, eId)
      )
    )

    return DrizzleTrainingMapper.toDomain(row, training.exercisesIds)
  }

  private async _saveTrainingExercise(
    trainingId: string,
    exerciseId: string
  ): Promise<{ trainingId: string; exerciseId: string }> {
    const [row] = await db
      .insert(trainingsExercises)
      .values({ trainingId, exerciseId })
      .returning()

    return row
  }
}
