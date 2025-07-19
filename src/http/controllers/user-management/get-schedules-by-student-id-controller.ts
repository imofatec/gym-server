import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetScheduleUseCase } from '../../../infra/container/user-management/factory/schedule.ts'
import type { PaginationQuerystring } from '../../schemas/pagination-schema.ts'
import type {
  FullScheduleQuerystring,
  StudentIdParams,
} from '../../schemas/user-management/get-user-management-schemas.ts'

export const getSchedulesByStudentIdController = async (
  request: FastifyRequest<{
    Params: StudentIdParams
    Querystring: PaginationQuerystring & FullScheduleQuerystring
  }>,
  reply: FastifyReply
) => {
  const {
    page,
    page_size: pageSize,
    full_schedule: fullSchedule,
  } = request.query

  const { studentId } = request.params

  const useCase = makeGetScheduleUseCase()

  const schedules = await useCase.execute(
    { page, pageSize },
    studentId,
    fullSchedule
  )

  return reply.send(schedules)
}
