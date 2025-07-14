import type { PaginationParams } from '../../../shared/repository/pagination-params.js'
import type { NoPasswordUser } from '../dtos/no-password-user.ts'

export interface GetUsersUseCase {
  execute(pagination?: PaginationParams): Promise<NoPasswordUser[]>
}
