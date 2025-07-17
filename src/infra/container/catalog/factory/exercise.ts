import { CreateExerciseUseCaseImpl } from '../../../../domains/catalog/application/use-cases/impl/create-exercise-use-case-impl.ts'
import { GetExerciseByIdUseCaseImpl } from '../../../../domains/catalog/application/use-cases/impl/get-exercise-by-id-use-case-impl.ts'
import { GetExercisesUseCaseImpl } from '../../../../domains/catalog/application/use-cases/impl/get-exercises-use-case-impl.ts'
import { exercise } from '../index.ts'

const { repository } = exercise.exerciseDependencies
const { drizzleRepository } = repository

export function makeCreateExerciseUseCase() {
  return new CreateExerciseUseCaseImpl(drizzleRepository)
}

export function makeGetExerciseByIdUseCase() {
  return new GetExerciseByIdUseCaseImpl(drizzleRepository)
}

export function makeGetExercisesUseCase() {
  return new GetExercisesUseCaseImpl(drizzleRepository)
}
