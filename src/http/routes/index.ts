import type { FastifyInstance } from 'fastify'
import { authRoutes } from './auth/index.ts'
import { publicRoutes } from './public/index.ts'

export function routes(app: FastifyInstance) {
  app.get('/', (_, reply) => reply.send({ message: 'OK' }))
  app.register(publicRoutes)
  app.register(authRoutes)
}
