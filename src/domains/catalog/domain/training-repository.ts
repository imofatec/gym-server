import type { PaginationParams } from '../../shared/repository/pagination-params.js'
import type { Training } from './training.ts'

export interface TrainingRepository {
  findAll(pagination?: PaginationParams): Promise<Training[]>
  findByIds(ids: Training['id'][]): Promise<Training[]>
  save(training: Training): Promise<Training>
}
