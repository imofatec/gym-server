import { eq } from 'drizzle-orm'
import { db } from '../../../../../main/config/db/drizzle/connection.ts'
import { withPagination } from '../../../../shared/repository/drizzle/with-pagination.ts'
import type { PaginationParams } from '../../../../shared/repository/pagination-params.js'
import type { User } from '../../../domain/user.ts'
import type { UserRepository } from '../../../domain/user-repository.ts'
import { DrizzleUserMapper } from './mappers/drizzle-user-mapper.ts'
import { users } from './schema/user.ts'

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
