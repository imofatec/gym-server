import { z } from 'zod/v4'
import { trainingsWithExercises } from '../catalog/catalog-responses.ts'

export const userResponse = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  role: z.enum(['user', 'admin']),
  createdAt: z.string(),
})

export const scheduleResponse = z.object({
  id: z.string(),
  studentId: z.string(),
  trainingsIds: z.string().array(),
  startDate: z.string(),
  finishDate: z.string(),
  createdAt: z.string(),
})

export const fullScheduleResponse = z.object({
  schedule: scheduleResponse.omit({ studentId: true, trainingsIds: true }),
  student: userResponse,
  trainings: trainingsWithExercises,
})

export const fullSchedulesResponse = fullScheduleResponse.array()
export const usersResponse = z.array(userResponse)
export const schedulesResponse = z.array(scheduleResponse)

export type UserResponseDTO = z.infer<typeof userResponse>
export type ScheduleResponseDTO = z.infer<typeof scheduleResponse>
export type FullScheduleResponseDTO = z.infer<typeof fullScheduleResponse>
