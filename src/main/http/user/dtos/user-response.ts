import { z } from 'zod/v4'

export const userResponse = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  role: z.enum(['user', 'admin']),
  createdAt: z.string(),
})

export const userListResponse = z.array(userResponse)

export type UserResponseDTO = z.infer<typeof userResponse>
