import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { getExercisesController } from '../../controllers/catalog/get-exercises-controller.ts'
import { getTrainingsController } from '../../controllers/catalog/get-trainings-controller.ts'
import {
  getExercisesSchema,
  getTrainingsSchema,
} from '../../schemas/catalog/get-catalog-schemas.ts'

export const trainingRoutes: FastifyPluginCallbackZod = (app) => {
  app.get('/', getTrainingsSchema, getTrainingsController)
}

export const exerciseRoutes: FastifyPluginCallbackZod = async (app) => {
  app.get('/', getExercisesSchema, getExercisesController)
}
