import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { authUserController } from '../../controllers/user-management/auth-user-controller.ts'
import { authUserSchema } from '../../schemas/user-management/auth-user-schema.ts'

export const loginUserRoutes: FastifyPluginAsyncZod = async (app) => {
  app.post('/login', authUserSchema, authUserController)
}
