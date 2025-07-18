import type { Schedule } from './schedule.ts'

export interface ScheduleRepository {
  save(schedule: Schedule): Promise<Schedule>
}
