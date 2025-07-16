import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { authUserController } from './controllers/auth-user-controller.ts'
import { createUserController } from './controllers/create-user-controller.ts'
import { getUsersController } from './controllers/get-users-controller.ts'
import { authUserSchema } from './schemas/auth-user-schema.ts'
import { createUserSchema } from './schemas/create-user-schema.ts'
import { getUsersSchema } from './schemas/get-users-schema.ts'

export const userAdminRoutes: FastifyPluginAsyncZod = async (app) => {
  app.post('/', createUserSchema, createUserController)
}

export const userRoutes: FastifyPluginAsyncZod = async (app) => {
  app.get('/', getUsersSchema, getUsersController)
}

export const loginUserRoutes: FastifyPluginAsyncZod = async (app) => {
  app.post('/login', authUserSchema, authUserController)
}
