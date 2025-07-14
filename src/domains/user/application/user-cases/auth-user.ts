import type { NoPasswordUser } from '../dtos/no-password-user.ts'

export type AuthUserUseCaseRequest = {
  email: string
  password: string
}

export interface AuthUserUseCase {
  execute(params: AuthUserUseCaseRequest): Promise<NoPasswordUser>
}
