import type { PaginationParams } from '../../../shared/repository/pagination-params.js'
import type { TrainingWithExercisesDTO } from '../dtos/training.ts'

export interface GetTrainingsWithExercisesUseCase {
  execute(pagination?: PaginationParams): Promise<TrainingWithExercisesDTO[]>
}
