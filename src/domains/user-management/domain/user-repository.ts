import type { PaginationParams } from '../../shared/repository/pagination-params.js'
import type { User } from './user.ts'

export interface UserRepository {
  save(user: User): Promise<User>
  findAll(pagination?: PaginationParams): Promise<User[]>
  findByEmail(email: string): Promise<User | null>
}
