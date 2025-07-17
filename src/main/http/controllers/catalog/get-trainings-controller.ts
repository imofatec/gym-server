import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetTrainingsUseCase } from '../../../container/catalog/factory/training.ts'
import type { PaginationQuerystring } from '../../schema/pagination-schema.ts'

export const getTrainingsController = async (
  request: FastifyRequest<{ Querystring: PaginationQuerystring }>,
  reply: FastifyReply
) => {
  const pagination = request.query

  const useCase = makeGetTrainingsUseCase()

  const trainings = await useCase.execute(pagination)

  return reply.send(trainings)
}
