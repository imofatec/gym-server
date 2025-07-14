import type { UserRole } from '../../domain/value-objects/user-role.ts'

export type NoPasswordUser = {
  id: string
  username: string
  email: string
  role: UserRole
  createdAt: string
}
