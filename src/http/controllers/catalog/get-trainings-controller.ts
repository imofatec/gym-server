import type { FastifyReply, FastifyRequest } from 'fastify'
import {
  makeGetTrainingsUseCase,
  makeGetTrainingsWithExercisesUseCase,
} from '../../../infra/container/catalog/factory/training.ts'
import type { IncludeExercisesQuerystring } from '../../schemas/catalog/get-catalog-schemas.ts'
import type { PaginationQuerystring } from '../../schemas/pagination-schema.ts'

export const getTrainingsController = async (
  request: FastifyRequest<{
    Querystring: PaginationQuerystring & IncludeExercisesQuerystring
  }>,
  reply: FastifyReply
) => {
  const {
    page,
    page_size: pageSize,
    include_exercises: includeExercises,
  } = request.query

  if (!includeExercises) {
    const useCase = makeGetTrainingsUseCase()

    const trainings = await useCase.execute({ page, pageSize })

    return reply.send(trainings)
  }

  const useCase = makeGetTrainingsWithExercisesUseCase()

  const trainingWithExercises = await useCase.execute({ page, pageSize })

  return reply.send(trainingWithExercises)
}
