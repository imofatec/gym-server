import type { User } from '../../domain/user.ts'
import type { UserRole } from '../../domain/value-objects/user-role.ts'

export type UserDTO = {
  id: string
  username: string
  email: string
  role: UserRole
  createdAt: string
}

export const UserMapper = {
  toDTO(user: User): UserDTO {
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
