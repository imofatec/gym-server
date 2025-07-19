import { z } from 'zod'
import { paginationQuerystring } from '../pagination-schema.ts'
import {
  fullSchedulesResponse,
  schedulesResponse,
  usersResponse,
} from './user-management-responses.ts'

export const getUsersSchema = {
  schema: {
    querystring: paginationQuerystring,
    response: {
      200: usersResponse,
    },
  },
}

const fullScheduleQuerystring = z.object({
  full_schedule: z.coerce.boolean().optional(),
})

const studentIdParams = z.object({
  studentId: z.string(),
})

export const getSchedulesSchema = {
  schema: {
    querystring: paginationQuerystring.merge(fullScheduleQuerystring),
    response: {
      200: schedulesResponse.or(fullSchedulesResponse),
    },
  },
}

export const getSchedulesByStudentIdSchema = {
  schema: {
    params: studentIdParams,
    querystring: paginationQuerystring.merge(fullScheduleQuerystring),
    response: {
      200: schedulesResponse.or(fullSchedulesResponse),
    },
  },
}

export type FullScheduleQuerystring = z.infer<typeof fullScheduleQuerystring>
export type StudentIdParams = z.infer<typeof studentIdParams>
