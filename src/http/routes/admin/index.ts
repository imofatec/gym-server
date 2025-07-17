import type { FastifyInstance } from 'fastify'
import { verifyUserRole } from '../../middlewares/verify-user-role.ts'
import { userAdminRoutes } from '../auth/user-management-auth-routes.ts'
import {
  exerciseAdminRoutes,
  trainingAdminRoutes,
} from './catalog-admin-routes.ts'

export function adminRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyUserRole)
  app.register(userAdminRoutes, { prefix: '/user' })
  app.register(exerciseAdminRoutes, { prefix: '/exercise' })
  app.register(trainingAdminRoutes, { prefix: '/training' })
}
