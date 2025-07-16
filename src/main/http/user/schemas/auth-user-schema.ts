import { z } from 'zod'
import { userResponse } from '../dtos/user-response.ts'

export const authUserRequest = z.object({
  email: z.email(),
  password: z.string(),
})

export const authUserSchema = {
  schema: {
    body: authUserRequest,
    response: {
      200: z.object({
        token: z.string().jwt(),
        user: userResponse,
      }),
      403: z.object({ message: z.string() }),
    },
  },
}

export type AuthUserDTO = z.infer<typeof authUserRequest>
