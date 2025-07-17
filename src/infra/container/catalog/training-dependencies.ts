import { DrizzleTrainingRepository } from "../../persistence/drizzle/repositories/catalog/drizzle-training-repository.ts"

const repository = {
  drizzleRepository: new DrizzleTrainingRepository(),
}

export const dependencies = {
  repository,
}
