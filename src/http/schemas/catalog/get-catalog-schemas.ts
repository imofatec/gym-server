import { z } from 'zod'
import { paginationQuerystring } from '../pagination-schema.ts'
import {
  exercisesResponse,
  trainingsResponse,
  trainingsWithExercises,
} from './catalog-responses.ts'

const includeExercisesQuerystring = z.object({
  include_exercises: z.coerce.boolean().optional(),
})

export type IncludeExercisesQuerystring = z.infer<
  typeof includeExercisesQuerystring
>

export const getTrainingsSchema = {
  schema: {
    querystring: paginationQuerystring.merge(includeExercisesQuerystring),
    response: {
      200: trainingsResponse.or(trainingsWithExercises).nullable(),
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
