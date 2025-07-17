import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { createTrainingController } from '../../controllers/catalog/create-training-controller.ts'
import { getTrainingsController } from '../../controllers/catalog/get-trainings-controller.ts'
import { createTrainingSchema } from '../../schema/catalog/create-catalog-schemas.ts'
import { getTrainingsSchema } from '../../schema/catalog/get-catalog-schemas.ts'

export const trainingAdminRoutes: FastifyPluginCallbackZod = async (app) => {
  app.post('/', createTrainingSchema, createTrainingController)
}

export const trainingRoutes: FastifyPluginCallbackZod = (app) => {
  app.get('/', getTrainingsSchema, getTrainingsController)
}
