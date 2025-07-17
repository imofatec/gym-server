import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeAuthUserUseCase } from '../../../container/user/factory/index.ts'
import type { AuthUserDTO } from '../../schema/user/auth-user-schema.ts'

export async function authUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const useCase = makeAuthUserUseCase()
  const body = request.body as AuthUserDTO

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
