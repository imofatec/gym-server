import fastifyCors from '@fastify/cors'
import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { env } from './config/env.ts'

export function buildServer() {
  const app = fastify().withTypeProvider<ZodTypeProvider>()

  app.register(fastifyCors, {
    origin: env.CLIENT,
  })

  app.setSerializerCompiler(serializerCompiler)
  app.setValidatorCompiler(validatorCompiler)

  app.get('/health', () => {
    return { message: 'OK' }
  })

  app.listen({ port: env.PORT })
}
