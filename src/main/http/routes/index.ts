import type { FastifyInstance } from 'fastify'
import { verifyJwt } from '../middlewares/verify-jwt.ts'
import { verifyUserRole } from '../middlewares/verify-user-role.ts'
import {
  exerciseAdminRoutes,
  exerciseRoutes,
} from './catalog/exercise-routes.ts'
import {
  trainingAdminRoutes,
  trainingRoutes,
} from './catalog/training-routes.ts'
import {
  loginUserRoutes,
  userAdminRoutes,
  userRoutes,
} from './user-management/user-routes.ts'

export function adminRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyUserRole)
  app.register(userAdminRoutes, { prefix: '/user' })
  app.register(exerciseAdminRoutes, { prefix: '/exercise' })
  app.register(trainingAdminRoutes, { prefix: '/training' })
}

export function authRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)
  app.register(userRoutes, { prefix: '/user' })
  app.register(exerciseRoutes, { prefix: '/exercise' })
  app.register(trainingRoutes, { prefix: '/training' })
  app.register(adminRoutes)
}

export function routes(app: FastifyInstance) {
  app.get('/', (_, reply) => reply.send({ message: 'OK' }))
  app.register(loginUserRoutes)
  app.register(authRoutes)
}
