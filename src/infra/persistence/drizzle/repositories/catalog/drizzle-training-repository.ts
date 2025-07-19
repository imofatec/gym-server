import { desc, eq, inArray } from 'drizzle-orm'
import type { Training } from '../../../../../domains/catalog/domain/training.ts'
import type { TrainingRepository } from '../../../../../domains/catalog/domain/training-repository.ts'
import type { PaginationParams } from '../../../../../domains/shared/repository/pagination-params.js'
import { db } from '../../connection.ts'
import { trainings } from '../../schemas/catalog/trainings.ts'
import { trainingsExercises } from '../../schemas/catalog/trainings-exercises.ts'
import { withPagination } from '../utils/with-pagination.ts'
import { DrizzleTrainingMapper } from './mappers/drizzle-training-mapper.ts'
import { DrizzleTrainingExercisesMapper } from './mappers/drizzle-trainings-exercises-mapper.ts'

export class DrizzleTrainingRepository implements TrainingRepository {
  async findByIds(ids: Training['id'][]): Promise<Training[]> {
    const rows = await db
      .select()
      .from(trainings)
      .where(
        inArray(
          trainings.id,
          ids.map((id) => id.toString())
        )
      )
      .leftJoin(
        trainingsExercises,
        eq(trainings.id, trainingsExercises.trainingId)
      )

    return DrizzleTrainingExercisesMapper.toTraining(rows)
  }

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

    return DrizzleTrainingExercisesMapper.toTraining(rows)
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
