import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetExercisesUseCase } from '../../../infra/container/catalog/factory/exercise.ts'
import type { PaginationQuerystring } from '../../schemas/pagination-schema.ts'

export const getExercisesController = async (
  request: FastifyRequest<{ Querystring: PaginationQuerystring }>,
  reply: FastifyReply
) => {
  const pagination = request.query

  const useCase = makeGetExercisesUseCase()

  const exercises = await useCase.execute(pagination)

  return reply.send(exercises)
}
