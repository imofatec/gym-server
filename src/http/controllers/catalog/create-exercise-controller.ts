import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeCreateExerciseUseCase } from '../../../infra/container/catalog/factory/exercise.ts'
import type { CreateExerciseBody } from '../../schemas/catalog/create-catalog-schemas.ts'

export const createExerciseController = async (
  request: FastifyRequest<{ Body: CreateExerciseBody }>,
  reply: FastifyReply
) => {
  const { body } = request

  const useCase = makeCreateExerciseUseCase()

  const newExercise = await useCase.execute(body)

  return reply.status(201).send(newExercise)
}
