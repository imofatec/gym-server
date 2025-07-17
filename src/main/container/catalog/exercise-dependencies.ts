import { DrizzleExerciseRepository } from '../../../domains/catalog/infra/persistence/drizzle/drizzle-exercise-repository.ts'

const repository = {
  drizzleRepository: new DrizzleExerciseRepository(),
}

export const dependencies = {
  repository,
}
