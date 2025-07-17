import type { UserRole } from '../../domain/value-objects/user-role.ts'
import type { UserDTO } from '../dtos/user.ts'

export type CreateUserUseCaseRequest = {
  username: string
  password: string
  email: string
  role: UserRole
}

export interface CreateUserUseCase {
  execute(userRequest: CreateUserUseCaseRequest): Promise<UserDTO>
}
