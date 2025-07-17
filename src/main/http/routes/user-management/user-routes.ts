import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { authUserController } from '../../controllers/user/auth-user-controller.ts'
import { createUserController } from '../../controllers/user/create-user-controller.ts'
import { getUsersController } from '../../controllers/user/get-users-controller.ts'
import { authUserSchema } from '../../schema/user-management/auth-user-schema.ts'
import { createUserSchema } from '../../schema/user-management/create-user-management-schemas.ts'
import { getUsersSchema } from '../../schema/user-management/get-user-management-schemas.ts'

export const userAdminRoutes: FastifyPluginAsyncZod = async (app) => {
  app.post('/', createUserSchema, createUserController)
}

export const userRoutes: FastifyPluginAsyncZod = async (app) => {
  app.get('/', getUsersSchema, getUsersController)
}

export const loginUserRoutes: FastifyPluginAsyncZod = async (app) => {
  app.post('/login', authUserSchema, authUserController)
}
