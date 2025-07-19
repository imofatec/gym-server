import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getSchedulesByStudentIdController } from '../../controllers/user-management/get-schedules-by-student-id-controller.ts'
import { getUsersController } from '../../controllers/user-management/get-users-controller.ts'
import {
  getSchedulesByStudentIdSchema,
  getUsersSchema,
} from '../../schemas/user-management/get-user-management-schemas.ts'

export const userRoutes: FastifyPluginAsyncZod = async (app) => {
  app.get('/', getUsersSchema, getUsersController)
}

export const scheduleRoutes: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/:studentId',
    getSchedulesByStudentIdSchema,
    getSchedulesByStudentIdController
  )
}
