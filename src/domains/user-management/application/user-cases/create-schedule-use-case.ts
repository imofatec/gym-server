import type { ScheduleDTO } from '../dtos/schdeule.ts'

export type CreateScheduleDTO = {
  studentId: string
  trainingsIds: string[]
  startDate: Date
  finishDate: Date
}

export interface CreateSCheduleUseCase {
  execute(schedule: CreateScheduleDTO): Promise<ScheduleDTO>
}
