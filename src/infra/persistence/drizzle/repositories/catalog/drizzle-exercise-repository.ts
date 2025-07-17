import { eq } from 'drizzle-orm'
import type { Exercise } from '../../../../../domains/catalog/domain/exercise.ts'
import type { ExerciseRepository } from '../../../../../domains/catalog/domain/exercise-repository.ts'
import type { PaginationParams } from '../../../../../domains/shared/repository/pagination-params.js'
import { db } from '../../connection.ts'
import { exercises } from '../../schemas/catalog/exercises.ts'
import { withPagination } from '../utils/with-pagination.ts'
import { DrizzleExerciseMapper } from './mappers/drizzle-exercise-mapper.ts'

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
