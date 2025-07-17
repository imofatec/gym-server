import type { FastifyReply, FastifyRequest } from 'fastify'
import { tryCatch } from '../../domains/shared/utils/try-catch.ts'

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  const { error } = await tryCatch(request.jwtVerify())

  if (error) {
    return reply.status(401).send({ message: 'Acesso não autorizado' })
  }
}
