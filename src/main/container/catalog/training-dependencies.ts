import { DrizzleTrainingRepository } from '../../../domains/catalog/infra/persistence/drizzle/drizzle-training-repository.ts'

const repository = {
  drizzleRepository: new DrizzleTrainingRepository(),
}

export const dependencies = {
  repository,
}
