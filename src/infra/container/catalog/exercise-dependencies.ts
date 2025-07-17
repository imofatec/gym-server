import { DrizzleExerciseRepository } from "../../persistence/drizzle/repositories/catalog/drizzle-exercise-repository.ts"

const repository = {
  drizzleRepository: new DrizzleExerciseRepository(),
}

export const dependencies = {
  repository,
}
