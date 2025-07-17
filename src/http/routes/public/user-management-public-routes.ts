import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { authUserController } from '../../controllers/user-management/auth-user-controller.ts'
import { registerUserController } from '../../controllers/user-management/register-user-controller.ts'
import { authUserSchema } from '../../schemas/user-management/auth-user-schema.ts'
import { registerUserSchema } from '../../schemas/user-management/create-user-management-schemas.ts'

export const loginUserRoutes: FastifyPluginAsyncZod = async (app) => {
  app.post('/login', authUserSchema, authUserController)
  app.post('/register', registerUserSchema, registerUserController)
}
