import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createUserController } from '../../controllers/user-management/create-user-controller.ts'
import { createUserSchema } from '../../schemas/user-management/create-user-management-schemas.ts'

export const userAdminRoutes: FastifyPluginAsyncZod = async (app) => {
  app.post('/', createUserSchema, createUserController)
}
