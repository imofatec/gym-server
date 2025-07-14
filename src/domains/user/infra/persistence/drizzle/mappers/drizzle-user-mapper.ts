import { UniqueEntityId } from '../../../../../shared/entities/unique-entity-id.ts'
import { User } from '../../../../domain/user.ts'
import { Email } from '../../../../domain/value-objects/email.ts'
import { Password } from '../../../../domain/value-objects/password.ts'
import type { UserRole } from '../../../../domain/value-objects/user-role.ts'
import { Username } from '../../../../domain/value-objects/username.ts'
import type { users } from '../schema/user.ts'

export const DrizzleUserMapper = {
  toDomain(raw: typeof users.$inferSelect): User {
    const { id, username, email, password, role, createdAt } = raw

    return new User(
      {
        username: Username.create(username),
        email: Email.create(email),
        password: Password.create(password),
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
