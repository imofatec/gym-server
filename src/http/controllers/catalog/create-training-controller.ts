import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeCreateTrainingUseCase } from '../../../infra/container/catalog/factory/training.ts'
import type { CreateTrainingBody } from '../../schemas/catalog/create-catalog-schemas.ts'

export const createTrainingController = async (
  request: FastifyRequest<{ Body: CreateTrainingBody }>,
  reply: FastifyReply
) => {
  const { body } = request
  const instructorId = request.user.id

  const useCase = makeCreateTrainingUseCase()

  const newTraining = await useCase.execute({ ...body, instructorId })

  return reply.status(201).send(newTraining)
}
