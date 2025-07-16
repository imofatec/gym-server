import type { User } from '../../domain/user.ts'
import type { NoPasswordUser } from './no-password-user.ts'

export const UserMapper = {
  toNoPasswordUser(user: User): NoPasswordUser {
    const { id, username, email, role, createdAt } = user
    return {
      id: id.toString(),
      username,
      email,
      role,
      createdAt: createdAt.toISOString(),
    }
  },
}
