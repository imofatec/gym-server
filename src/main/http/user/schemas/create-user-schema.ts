import type { RouteShorthandOptions } from 'fastify'
import { z } from 'zod'
import { userResponse } from '../dtos/user-response.ts'

export const createUserRequest = z.object({
  username: z.string(),
  password: z.string(),
  email: z.email(),
  role: z.enum(['user', 'admin']),
})

export const createUserSchema: RouteShorthandOptions = {
  schema: {
    body: createUserRequest,
    response: {
      201: userResponse,
    },
  },
}

export type CreateUserDTO = z.infer<typeof createUserRequest>
