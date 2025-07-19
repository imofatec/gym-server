import type { FastifyInstance } from 'fastify'
import { verifyUserRole } from '../../middlewares/verify-user-role.ts'
import {
  exerciseAdminRoutes,
  trainingAdminRoutes,
} from './catalog-admin-routes.ts'
import {
  scheduleAdminRoutes,
  userAdminRoutes,
} from './user-management-admin-routes.ts'

export function adminRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyUserRole)
  app.register(userAdminRoutes, { prefix: '/user' })
  app.register(scheduleAdminRoutes, { prefix: '/schedule' })
  app.register(exerciseAdminRoutes, { prefix: '/exercise' })
  app.register(trainingAdminRoutes, { prefix: '/training' })
}
