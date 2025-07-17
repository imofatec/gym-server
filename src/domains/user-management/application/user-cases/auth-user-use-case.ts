import type { UserDTO } from '../dtos/user.ts'

export type AuthUserUseCaseDTO = {
  email: string
  password: string
}

export interface AuthUserUseCase {
  execute(params: AuthUserUseCaseDTO): Promise<UserDTO>
}
