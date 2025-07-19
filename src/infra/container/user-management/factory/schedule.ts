import { CreateScheduleUseCaseImpl } from '../../../../domains/user-management/application/user-cases/impl/create-schedule-use-case-impl.ts'
import { GetSchedulesUseCaseImpl } from '../../../../domains/user-management/application/user-cases/impl/get-schedules-use-case-impl.ts'
import { makeGetTrainingsWithExercisesUseCase } from '../../catalog/factory/training.ts'
import { schedule } from '../index.ts'
import { makeGetUserByIdUseCase } from './user.ts'

const { repository } = schedule.scheduleDependencies

export function makeCreateScheduleUseCase() {
  return new CreateScheduleUseCaseImpl(repository.drizzleRepository)
}

export function makeGetScheduleUseCase() {
  return new GetSchedulesUseCaseImpl(
    repository.drizzleRepository,
    makeGetUserByIdUseCase(),
    makeGetTrainingsWithExercisesUseCase()
  )
}
