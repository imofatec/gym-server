import type { PaginationParams } from '../../../shared/repository/pagination-params.js'
import type { ExerciseDTO } from '../dtos/exercise.ts'

export interface GetExercisesUseCase {
  execute(pagination?: PaginationParams): Promise<ExerciseDTO[]>
}
