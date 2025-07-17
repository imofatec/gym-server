import type { PaginationParams } from '../../../shared/repository/pagination-params.js'
import type { UserDTO } from '../dtos/user.ts'

export interface GetUsersUseCase {
  execute(pagination?: PaginationParams): Promise<UserDTO[]>
}
