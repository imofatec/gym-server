import { AuthUserUseCaseImpl } from '../../../../domains/user-management/application/user-cases/impl/auth-user-use-case-impl.ts'
import { CreateUserUseCaseImpl } from '../../../../domains/user-management/application/user-cases/impl/create-user-use-case-impl.ts'
import { GetUserByIdUseCaseImpl } from '../../../../domains/user-management/application/user-cases/impl/get-user-by-id-use-case-impl.ts'
import { GetUsersUseCaseImpl } from '../../../../domains/user-management/application/user-cases/impl/get-users-use-case-impl.ts'
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

export function makeGetUserByIdUseCase() {
  return new GetUserByIdUseCaseImpl(drizzleRepository)
}
