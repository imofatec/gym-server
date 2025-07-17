import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeAuthUserUseCase } from '../../../infra/container/user-management/factory/index.ts'
import type { AuthUserRequestBody } from '../../schemas/user-management/auth-user-schema.ts'

export async function authUserController(
  request: FastifyRequest<{ Body: AuthUserRequestBody }>,
  reply: FastifyReply
) {
  const useCase = makeAuthUserUseCase()
  const { body } = request

  const authUser = await useCase.execute(body)

  const { id, username, email, role } = authUser

  const token = await reply.jwtSign(
    {
      id,
      username,
      email,
      role,
    },
    {
      sign: {
        sub: id,
      },
    }
  )

  return reply.send({ token, user: authUser })
}
