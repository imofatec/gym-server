import { CreateTrainingUseCaseImpl } from '../../../../domains/catalog/application/use-cases/impl/create-training-use-case-impl.ts'
import { GetTrainingsUseCaseImpl } from '../../../../domains/catalog/application/use-cases/impl/get-trainings-use-case-impl.ts'
import { GetTrainingsWithExercisesUseCaseImpl } from '../../../../domains/catalog/application/use-cases/impl/get-trainings-with-exercises-use-case-impl.ts'
import { exercise, training } from '../index.ts'
import { makeGetExerciseByIdUseCase } from './exercise.ts'

const trainingRepository =
  training.trainingDependencies.repository.drizzleRepository
const exerciseRepository =
  exercise.exerciseDependencies.repository.drizzleRepository

const getExerciseByIdUseCase = makeGetExerciseByIdUseCase()

export function makeCreateTrainingUseCase() {
  return new CreateTrainingUseCaseImpl(
    trainingRepository,
    getExerciseByIdUseCase
  )
}

export function makeGetTrainingsUseCase() {
  return new GetTrainingsUseCaseImpl(trainingRepository)
}

export function makeGetTrainingsWithExercisesUseCase() {
  return new GetTrainingsWithExercisesUseCaseImpl(
    trainingRepository,
    exerciseRepository
  )
}
