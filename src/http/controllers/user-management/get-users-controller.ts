import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetUsersUseCase } from '../../../infra/container/user-management/factory/index.ts'
import type { PaginationQuerystring } from '../../schemas/pagination-schema.ts'

export const getUsersController = async (
  request: FastifyRequest<{ Querystring: PaginationQuerystring }>,
  reply: FastifyReply
) => {
  const pagination = request.query
  const useCase = makeGetUsersUseCase()
  const users = await useCase.execute(pagination)

  return reply.send(users)
}
