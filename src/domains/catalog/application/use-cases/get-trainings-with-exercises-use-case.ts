import type { PaginationParams } from '../../../shared/repository/pagination-params.js'
import type { TrainingDTO, TrainingWithExercisesDTO } from '../dtos/training.ts'

export interface GetTrainingsWithExercisesUseCase {
  execute(pagination?: PaginationParams, ids?: TrainingDTO['id'][]): Promise<TrainingWithExercisesDTO[]>
}
