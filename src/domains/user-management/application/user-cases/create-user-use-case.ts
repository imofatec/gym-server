import type { UserRole } from '../../domain/value-objects/user-role.ts'
import type { UserDTO } from '../dtos/user.ts'

export type CreateUserUseCaseDTO = {
  username: string
  password: string
  email: string
  role: UserRole
}

export interface CreateUserUseCase {
  execute(userRequest: CreateUserUseCaseDTO): Promise<UserDTO>
}
