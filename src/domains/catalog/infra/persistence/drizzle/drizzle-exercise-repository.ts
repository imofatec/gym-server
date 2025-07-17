import { eq } from 'drizzle-orm'
import { db } from '../../../../../main/config/db/drizzle/connection.ts'
import { withPagination } from '../../../../shared/repository/drizzle/with-pagination.ts'
import type { PaginationParams } from '../../../../shared/repository/pagination-params.js'
import type { Exercise } from '../../../domain/exercise.ts'
import type { ExerciseRepository } from '../../../domain/exercise-repository.ts'
import { DrizzleExerciseMapper } from './mappers/drizzle-exercise-mapper.ts'
import { exercises } from './schema/exercises.ts'

export class DrizzleExerciseRepository implements ExerciseRepository {
  async findAll(pagination?: PaginationParams): Promise<Exercise[]> {
    let query = db
      .select()
      .from(exercises)
      .orderBy(exercises.createdAt)
      .$dynamic()

    if (pagination) {
      const { page, pageSize } = pagination

      query = withPagination(query, page + 1, pageSize)
    }

    const foundExercises = await query

    return foundExercises.map((e) => DrizzleExerciseMapper.toDomain(e))
  }

  async findById(id: Exercise['id']): Promise<Exercise> {
    const [row] = await db
      .select()
      .from(exercises)
      .where(eq(exercises.id, id.toString()))

    return DrizzleExerciseMapper.toDomain(row)
  }

  async save(exercise: Exercise): Promise<Exercise> {
    const raw = DrizzleExerciseMapper.toPersistence(exercise)

    const [row] = await db.insert(exercises).values(raw).returning()

    return DrizzleExerciseMapper.toDomain(row)
  }
}
