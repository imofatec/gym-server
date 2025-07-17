import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { createExerciseController } from '../../controllers/catalog/create-exercise-controller.ts'
import { createTrainingController } from '../../controllers/catalog/create-training-controller.ts'
import {
  createExerciseSchema,
  createTrainingSchema,
} from '../../schemas/catalog/create-catalog-schemas.ts'

export const exerciseAdminRoutes: FastifyPluginCallbackZod = async (app) => {
  app.post('/', createExerciseSchema, createExerciseController)
}

export const trainingAdminRoutes: FastifyPluginCallbackZod = async (app) => {
  app.post('/', createTrainingSchema, createTrainingController)
}
