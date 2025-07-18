import type { Schedule } from '../../domain/schedule.ts'

export type ScheduleDTO = {
  id: string
  studentId: string
  trainingsIds: string[]
  startDate: string
  finishDate: string
  createdAt: string
}

export const ScheduleMapper = {
  toDTO(schedule: Schedule): ScheduleDTO {
    const { id, studentId, trainingsIds, startDate, finishDate, createdAt } = schedule

    return {
        id: id.toString(),
        studentId,
        trainingsIds,
        startDate: startDate.toISOString(),
        finishDate: finishDate.toISOString(),
        createdAt: createdAt.toISOString()
    }
  },
}
