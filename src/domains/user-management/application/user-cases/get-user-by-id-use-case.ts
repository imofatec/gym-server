import type { UserDTO } from '../dtos/user.ts'

export interface GetUserByIdUseCase {
  execute(id: UserDTO['id']): Promise<UserDTO>
}
