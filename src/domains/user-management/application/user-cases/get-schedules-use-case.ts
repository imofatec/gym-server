import type { PaginationParams } from '../../../shared/repository/pagination-params.js'
import type { FullScheduleDTO, ScheduleDTO } from '../dtos/schedule.ts'

export interface GetSchedulesUseCase {
  execute(
    pagination?: PaginationParams,
    studentId?: ScheduleDTO['studentId'],
    fullSchedule?: boolean
  ): Promise<ScheduleDTO[] | FullScheduleDTO[]>
}
