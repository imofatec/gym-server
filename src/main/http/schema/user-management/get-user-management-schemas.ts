import { paginationQuerystring } from '../pagination-schema.ts'
import { userListResponse } from './user-management-responses.ts'

export const getUsersSchema = {
  schema: {
    querystring: paginationQuerystring,
    response: {
      200: userListResponse,
    },
  },
}
