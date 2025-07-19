import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createScheduleController } from '../../controllers/user-management/create-schedule-controller.ts'
import { createUserController } from '../../controllers/user-management/create-user-controller.ts'
import { getSchedulesController } from '../../controllers/user-management/get-schedules-controller.ts'
import {
  createScheduleSchema,
  createUserSchema,
} from '../../schemas/user-management/create-user-management-schemas.ts'
import { getSchedulesSchema } from '../../schemas/user-management/get-user-management-schemas.ts'

export const userAdminRoutes: FastifyPluginAsyncZod = async (app) => {
  app.post('/', createUserSchema, createUserController)
}

export const scheduleAdminRoutes: FastifyPluginAsyncZod = async (app) => {
  app.post('/', createScheduleSchema, createScheduleController)
  app.get('/', getSchedulesSchema, getSchedulesController)
}
