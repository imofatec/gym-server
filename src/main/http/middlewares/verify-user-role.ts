import type { FastifyReply, FastifyRequest } from 'fastify'

export function verifyUserRole(
  request: FastifyRequest,
  reply: FastifyReply,
  done: () => void
) {
  const { user } = request

  if (user.role !== 'admin') {
    reply
      .status(403)
      .send({ message: 'Acesso só é permitido para administradores' })
  }

  done()
}
