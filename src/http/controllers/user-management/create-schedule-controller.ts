import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeCreateScheduleUseCase } from '../../../infra/container/user-management/factory/schedule.ts'
import type { CreateScheduleRequestBody } from '../../schemas/user-management/create-user-management-schemas.ts'

export const createScheduleController = async (
  request: FastifyRequest<{ Body: CreateScheduleRequestBody }>,
  reply: FastifyReply
) => {
  const { body } = request

  const useCase = makeCreateScheduleUseCase()

  const newSchedule = await useCase.execute(body)

  return reply.send(newSchedule)
}
