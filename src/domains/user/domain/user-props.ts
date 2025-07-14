import type { Email } from './value-objects/email.ts'
import type { Password } from './value-objects/password.ts'
import type { UserRole } from './value-objects/user-role.ts'
import type { Username } from './value-objects/username.ts'

export type UserProps = {
  username: Username
  password: Password
  email: Email
  role: UserRole
  createdAt: Date
}
