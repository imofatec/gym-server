import type { FastifyReply, FastifyRequest } from 'fastify'
import type { PaginationParams } from '../../../../domains/shared/repository/pagination-params.js'
import { makeGetUsersUseCase } from '../../../container/user/factory/index.ts'

export const getUsersController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const pagination = request.query as PaginationParams
  const useCase = makeGetUsersUseCase()
  const users = await useCase.execute(pagination)

  return reply.send(users)
}
