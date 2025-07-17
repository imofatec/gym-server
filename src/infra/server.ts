import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { chainOfErrors } from '../http/errors/index.ts'
import { routes } from '../http/routes/index.ts'
import { env } from './config/env.ts'

export async function buildServer() {
  const server = fastify({ logger: true })

  server.register(fastifyCors, {
    origin: env.CLIENT,
  })

  server.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    sign: {
      expiresIn: '2d',
    },
  })

  server.setErrorHandler((error, _, reply) => {
    chainOfErrors.handle({ error, reply })
  })

  server.setSerializerCompiler(serializerCompiler)
  server.setValidatorCompiler(validatorCompiler)
  server.withTypeProvider<ZodTypeProvider>()

  server.register(routes, { prefix: '/api' })

  server.listen({ port: env.PORT })
}
