import type { TrainingWithExercisesDTO } from '../../../catalog/application/dtos/training.ts'
import type { Schedule } from '../../domain/schedule.ts'
import type { UserDTO } from './user.ts'

export type ScheduleDTO = {
  id: string
  studentId: string
  trainingsIds: string[]
  startDate: string
  finishDate: string
  createdAt: string
}

export type FullScheduleDTO = {
  schedule: Omit<ScheduleDTO, 'studentId' | 'trainingsIds'>
  student: UserDTO
  trainings: TrainingWithExercisesDTO[]
}

export const ScheduleMapper = {
  toDTO(schedule: Schedule): ScheduleDTO {
    const { id, studentId, trainingsIds, startDate, finishDate, createdAt } =
      schedule

    return {
      id: id.toString(),
      studentId,
      trainingsIds,
      startDate: startDate.toISOString(),
      finishDate: finishDate.toISOString(),
      createdAt: createdAt.toISOString(),
    }
  },
  toFullDTO(
    schedule: ScheduleDTO,
    student: UserDTO,
    training: TrainingWithExercisesDTO[]
  ): FullScheduleDTO {
    return {
      schedule,
      student,
      trainings: training.map((t) => ({
        training: t.training,
        exercises: t.exercises,
      })),
    }
  },
}
