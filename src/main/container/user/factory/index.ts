import { AuthUserUseCaseImpl } from '../../../../domains/user/application/user-cases/impl/auth-user-impl.ts'
import { CreateUserUseCaseImpl } from '../../../../domains/user/application/user-cases/impl/create-user-impl.ts'
import { GetUsersUseCaseImpl } from '../../../../domains/user/application/user-cases/impl/get-users-impl.ts'
import { user } from '../index.ts'

const { repository, security } = user.dependencies
const { drizzleRepository } = repository
const { passwordEncoder } = security

export function makeCreateUserUseCase() {
  return new CreateUserUseCaseImpl(drizzleRepository, passwordEncoder)
}

export function makeGetUsersUseCase() {
  return new GetUsersUseCaseImpl(drizzleRepository)
}

export function makeAuthUserUseCase() {
  return new AuthUserUseCaseImpl(drizzleRepository, passwordEncoder)
}
