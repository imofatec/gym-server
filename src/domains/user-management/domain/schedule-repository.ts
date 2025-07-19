import type { PaginationParams } from '../../shared/repository/pagination-params.js'
import type { Schedule } from './schedule.ts'

export interface ScheduleRepository {
  findAll(pagination?: PaginationParams): Promise<Schedule[]>
  findByStudentId(
    studentId: Schedule['studentId'],
    pagination?: PaginationParams
  ): Promise<Schedule[]>
  save(schedule: Schedule): Promise<Schedule>
}
