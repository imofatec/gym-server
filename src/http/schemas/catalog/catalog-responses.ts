import { z } from 'zod'
import type { ExerciseDTO } from '../../../domains/catalog/application/dtos/exercise.ts'
import type {
  TrainingDTO,
  TrainingWithExercisesDTO,
} from '../../../domains/catalog/application/dtos/training.ts'

export const dayOfWeek = z.enum([
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
])

export const exerciseResponse = z.object({
  id: z.string(),
  name: z.string().nonempty(),
  description: z.string().optional(),
  equipment: z.string().optional(),
  createdAt: z.string(),
}) satisfies z.ZodType<ExerciseDTO>

export const exercisesResponse = exerciseResponse.array()

export const trainingResponse = z.object({
  id: z.string(),
  name: z.string(),
  dayOfWeek,
  instructorId: z.string(),
  exercisesIds: z.string().array(),
  createdAt: z.string(),
}) satisfies z.ZodType<TrainingDTO>

export const trainingsResponse = trainingResponse.array()

export const trainingWithExerciseResponse = z.object({
  training: trainingResponse.omit({ exercisesIds: true }),
  exercises: exercisesResponse,
}) satisfies z.ZodType<TrainingWithExercisesDTO>

export const trainingsWithExercises = trainingWithExerciseResponse.array()
