import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { env } from './config/env.ts'
import { chainOfErrors } from './container/shared/errors.ts'
import { routes } from './http/routes/index.ts'

export function buildServer() {
  const app = fastify({ logger: true })

  app.register(fastifyCors, {
    origin: env.CLIENT,
  })

  app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    sign: {
      expiresIn: '2d',
    },
  })

  app.setErrorHandler((error, _, reply) => {
    chainOfErrors.handle({ error, reply })
  })

  app.setSerializerCompiler(serializerCompiler)
  app.setValidatorCompiler(validatorCompiler)
  app.withTypeProvider<ZodTypeProvider>()

  app.register(routes, { prefix: '/api' })

  app.listen({ port: env.PORT })
}
