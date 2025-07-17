import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { createExerciseController } from '../../controllers/catalog/create-exercise-controller.ts'
import { getExercisesController } from '../../controllers/catalog/get-exercises-controller.ts'
import { createExerciseSchema } from '../../schema/catalog/create-catalog-schemas.ts'
import { getExercisesSchema } from '../../schema/catalog/get-catalog-schemas.ts'

export const exerciseAdminRoutes: FastifyPluginCallbackZod = async (app) => {
  app.post('/', createExerciseSchema, createExerciseController)
}

export const exerciseRoutes: FastifyPluginCallbackZod = async (app) => {
  app.get('/', getExercisesSchema, getExercisesController)
}
