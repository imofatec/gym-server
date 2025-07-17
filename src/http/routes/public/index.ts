import type { FastifyInstance } from 'fastify'
import { loginUserRoutes } from './user-management-public-routes.ts'

export function publicRoutes(app: FastifyInstance) {
  app.register(loginUserRoutes)
}
