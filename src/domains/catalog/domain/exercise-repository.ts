import type { PaginationParams } from '../../shared/repository/pagination-params.js'
import type { Exercise } from './exercise.ts'

export interface ExerciseRepository {
  findAll(pagination?: PaginationParams): Promise<Exercise[]>
  findById(id: Exercise['id']): Promise<Exercise | null>
  findByIds(ids: Exercise['id'][]): Promise<Exercise[]>
  save(exercise: Exercise): Promise<Exercise>
}
