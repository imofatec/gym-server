import { eq } from 'drizzle-orm'
import type { PaginationParams } from '../../../../../domains/shared/repository/pagination-params.js'
import type { User } from '../../../../../domains/user-management/domain/user.ts'
import type { UserRepository } from '../../../../../domains/user-management/domain/user-repository.ts'
import { db } from '../../connection.ts'
import { users } from '../../schemas/user-management/user.ts'
import { withPagination } from '../utils/with-pagination.ts'
import { DrizzleUserMapper } from './mappers/drizzle-user-mapper.ts'

export class DrizzleUserRepository implements UserRepository {
  async save(user: User): Promise<User> {
    const raw = DrizzleUserMapper.toPersistence(user)

    const [row] = await db.insert(users).values(raw).returning()

    return DrizzleUserMapper.toDomain(row)
  }

  async findAll(pagination?: PaginationParams): Promise<User[]> {
    let query = db.select().from(users).orderBy(users.createdAt).$dynamic()

    if (pagination) {
      const { page, pageSize } = pagination
      query = withPagination(query, page + 1, pageSize)
    }

    const rows = await query

    return rows.map((r) => DrizzleUserMapper.toDomain(r))
  }

  async findByEmail(email: string): Promise<User> {
    const [row] = await db.select().from(users).where(eq(users.email, email))

    return DrizzleUserMapper.toDomain(row)
  }
}
