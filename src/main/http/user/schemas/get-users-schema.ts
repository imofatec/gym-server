import type { RouteShorthandOptions } from 'fastify'
import { paginationSchema } from '../../schema/pagination-schema.ts'
import { userListResponse } from '../dtos/user-response.ts'

export const getUsersSchema: RouteShorthandOptions = {
  schema: {
    querystring: paginationSchema,
    response: {
      200: userListResponse,
    },
  },
}
