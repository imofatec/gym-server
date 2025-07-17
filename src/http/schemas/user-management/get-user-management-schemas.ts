import { paginationQuerystring } from '../pagination-schema.ts'
import { usersResponse } from './user-management-responses.ts'

export const getUsersSchema = {
  schema: {
    querystring: paginationQuerystring,
    response: {
      200: usersResponse,
    },
  },
}
