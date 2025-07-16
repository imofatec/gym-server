import { UniqueEntityId } from '../../../../../shared/entities/unique-entity-id.ts'
import { User } from '../../../../domain/user.ts'
import type { UserRole } from '../../../../domain/value-objects/user-role.ts'
import type { users } from '../schema/user.ts'

export const DrizzleUserMapper = {
  toDomain(raw: typeof users.$inferSelect): User {
    const { id, username, email, password, role, createdAt } = raw

    return new User(
      {
        username,
        email,
        password,
        role: role as UserRole,
        createdAt: new Date(createdAt),
      },
      new UniqueEntityId(id)
    )
  },

  toPersistence(user: User): typeof users.$inferInsert {
    const { id, username, email, password, role, createdAt } = user

    return {
      id: id.toString(),
      username,
      email,
      password,
      role,
      createdAt,
    }
  },
}
