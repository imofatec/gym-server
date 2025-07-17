import type { PaginationParams } from '../../../shared/repository/pagination-params.js'
import type { TrainingDTO } from '../dtos/training.ts'

export interface GetTrainingsUseCase {
  execute(pagination?: PaginationParams): Promise<TrainingDTO[]>
}
