import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeCreateUserUseCase } from '../../../container/user/factory/index.ts'
import type { CreateUserDTO } from '../schemas/create-user-schema.ts'

export const createUserController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const useCase = makeCreateUserUseCase()

  const body = request.body as CreateUserDTO
  const newUser = await useCase.execute(body)

  return reply.status(201).send(newUser)
}
