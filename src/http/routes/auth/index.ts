import type { FastifyInstance } from 'fastify'
import { verifyJwt } from '../../middlewares/verify-jwt.ts'
import { adminRoutes } from '../admin/index.ts'
import { exerciseRoutes, trainingRoutes } from './catalog-auth-routes.ts'
import { scheduleRoutes, userRoutes } from './user-management-auth-routes.ts'

export function authRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)
  app.register(userRoutes, { prefix: '/user' })
  app.register(exerciseRoutes, { prefix: '/exercise' })
  app.register(trainingRoutes, { prefix: '/training' })
  app.register(scheduleRoutes, { prefix: '/schedule' })

  app.register(adminRoutes)
}
