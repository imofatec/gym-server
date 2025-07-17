import { z } from 'zod'
import type { CreateExerciseDTO } from '../../../domains/catalog/application/use-cases/create-exercise-use-case.ts'
import type { CreateTrainingDTO } from '../../../domains/catalog/application/use-cases/create-training-use-case.ts'
import {
  dayOfWeek,
  exerciseResponse,
  trainingResponse,
} from './catalog-responses.ts'

const createExerciseBody = z.object({
  name: z.string().nonempty(),
  description: z.string().optional(),
  equipment: z.string().optional(),
}) satisfies z.ZodType<CreateExerciseDTO>

export const createExerciseSchema = {
  schema: {
    body: createExerciseBody,
    response: {
      201: exerciseResponse,
    },
  },
}

export const createTrainingBody = z.object({
  name: z.string(),
  dayOfWeek,
  exercisesIds: z.string().array(),
}) satisfies z.ZodType<Omit<CreateTrainingDTO, 'instructorId'>>

export const createTrainingSchema = {
  schema: {
    body: createTrainingBody,
    response: {
      201: trainingResponse,
    },
  },
}

export type CreateExerciseBody = z.infer<typeof createExerciseBody>
export type CreateTrainingBody = z.infer<typeof createTrainingBody>
