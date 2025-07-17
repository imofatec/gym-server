import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getUsersController } from '../../controllers/user-management/get-users-controller.ts'
import { getUsersSchema } from '../../schemas/user-management/get-user-management-schemas.ts'

export const userRoutes: FastifyPluginAsyncZod = async (app) => {
  app.get('/', getUsersSchema, getUsersController)
}
