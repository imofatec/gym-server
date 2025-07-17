import { z } from 'zod'
import type { CreateUserUseCaseDTO } from '../../../domains/user-management/application/user-cases/create-user-use-case.ts'
import { userResponse } from './user-management-responses.ts'

export const createUserRequest = z.object({
  username: z.string(),
  password: z.string(),
  email: z.email(),
  role: z.enum(['user', 'admin']),
}) satisfies z.ZodType<CreateUserUseCaseDTO>

export const createUserSchema = {
  schema: {
    body: createUserRequest,
    response: {
      201: userResponse,
    },
  },
}

export const registerUserRequestBody = z.object({
  username: z.string(),
  password: z.string(),
  email: z.email(),
  role: z.enum(['user']),
}) satisfies z.ZodType<CreateUserUseCaseDTO>

export const registerUserSchema = {
  schema: {
    body: registerUserRequestBody,
    response: {
      201: userResponse,
    },
  },
}

export type CreateUserRequestBody = z.infer<typeof createUserRequest>
export type RegisterUserRequestBody = z.infer<typeof registerUserRequestBody>
