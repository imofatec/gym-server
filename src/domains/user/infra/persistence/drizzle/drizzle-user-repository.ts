import { asc, eq } from 'drizzle-orm'
import { db } from '../../../../../main/config/db/drizzle/connection.ts'
import type { PaginationParams } from '../../../../shared/repository/pagination-params.js'
import { tryCatch } from '../../../../shared/utils/try-catch.ts'
import { SaveUserError } from '../../../domain/errors/save-user-error.ts'
import type { User } from '../../../domain/user.ts'
import type { UserRepository } from '../../../domain/user-repository.ts'
import { DrizzleUserMapper } from './mappers/drizzle-user-mapper.ts'
import { users } from './schema/user.ts'

export class DrizzleUserRepository implements UserRepository {
  async save(user: User): Promise<User> {
    const raw = DrizzleUserMapper.toPersistence(user)
    const { error } = await tryCatch(db.insert(users).values(raw))

    if (error) {
      throw new SaveUserError('Não foi possível salvar o usuário')
    }

    return user
  }

  async findAll(pagination?: PaginationParams): Promise<User[]> {
    const cursor = db.select().from(users).orderBy(asc(users.createdAt))

    if (pagination) {
      const { page, pageSize } = pagination
      cursor.limit(pageSize).offset(page)
    }

    const { result, error } = await tryCatch(cursor)

    if (error) {
      throw new Error('Não foi possível recuperar os usuários')
    }

    return result.map((r) => DrizzleUserMapper.toDomain(r))
  }

  async findByEmail(email: string): Promise<User | null> {
    const { result, error } = await tryCatch(
      db.select().from(users).where(eq(users.email, email))
    )

    if (error) {
      throw new Error('Não foi possível recuperar usuário')
    }

    return DrizzleUserMapper.toDomain(result[0])
  }
}
