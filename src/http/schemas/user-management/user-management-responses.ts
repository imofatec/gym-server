import { z } from 'zod/v4'

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
  createdAt: z.string()
})

export const usersResponse = z.array(userResponse)
export const schedulesResponse = z.array(scheduleResponse)

export type UserResponseDTO = z.infer<typeof userResponse>

export type ScheduleResponseDTO = z.infer<typeof scheduleResponse>
