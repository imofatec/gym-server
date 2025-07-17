import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeCreateUserUseCase } from '../../../infra/container/user-management/factory/index.ts'
import type { RegisterUserRequestBody } from '../../schemas/user-management/create-user-management-schemas.ts'

export const registerUserController = async (
  request: FastifyRequest<{ Body: RegisterUserRequestBody }>,
  reply: FastifyReply
) => {
  const useCase = makeCreateUserUseCase()

  const { body } = request
  const newUser = await useCase.execute(body)

  return reply.status(201).send(newUser)
}
