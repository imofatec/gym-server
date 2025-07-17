import { CreateTrainingUseCaseImpl } from '../../../../domains/catalog/application/use-cases/impl/create-training-use-case-impl.ts'
import { GetTrainingsUseCaseImpl } from '../../../../domains/catalog/application/use-cases/impl/get-trainings-use-case-impl.ts'
import { training } from '../index.ts'
import { makeGetExerciseByIdUseCase } from './exercise.ts'

const { repository } = training.trainingDependencies
const { drizzleRepository } = repository

const getExerciseByIdUseCase = makeGetExerciseByIdUseCase()

export function makeCreateTrainingUseCase() {
  return new CreateTrainingUseCaseImpl(
    drizzleRepository,
    getExerciseByIdUseCase
  )
}

export function makeGetTrainingsUseCase() {
  return new GetTrainingsUseCaseImpl(drizzleRepository)
}
