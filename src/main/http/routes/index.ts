import type { FastifyInstance } from 'fastify'
import { verifyJwt } from '../middlewares/verify-jwt.ts'
import { verifyUserRole } from '../middlewares/verify-user-role.ts'
import {
  loginUserRoutes,
  userAdminRoutes,
  userRoutes,
} from '../user/user-routes.ts'

export function adminRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyUserRole)
  app.register(userAdminRoutes, { prefix: '/user' })
}

export function authRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)
  app.register(userRoutes, { prefix: '/user' })
  app.register(adminRoutes)
}

export function routes(app: FastifyInstance) {
  app.get('/', (_, reply) => reply.send({ message: 'OK' }))
  app.register(loginUserRoutes)
  app.register(authRoutes)
}
