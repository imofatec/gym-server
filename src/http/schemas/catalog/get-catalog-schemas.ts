import { paginationQuerystring } from '../pagination-schema.ts'
import { exercisesResponse, trainingsResponse } from './catalog-responses.ts'

export const getTrainingsSchema = {
  schema: {
    querystring: paginationQuerystring,
    response: {
      200: trainingsResponse,
    },
  },
}

export const getExercisesSchema = {
  schema: {
    querystring: paginationQuerystring,
    response: {
      200: exercisesResponse,
    },
  },
}
