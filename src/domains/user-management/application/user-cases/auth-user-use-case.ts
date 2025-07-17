import type { UserDTO } from '../dtos/user.ts'

export type AuthUserUseCaseRequest = {
  email: string
  password: string
}

export interface AuthUserUseCase {
  execute(params: AuthUserUseCaseRequest): Promise<UserDTO>
}
