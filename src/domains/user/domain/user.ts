import { BaseEntity } from '../../shared/entities/base-entity.ts'
import type { UniqueEntityId } from '../../shared/entities/unique-entity-id.ts'
import type { Optional } from '../../shared/utils/optional.js'
import type { UserRole } from './value-objects/user-role.ts'

export type UserProps = {
  username: string
  password: string
  email: string
  role: UserRole
  createdAt: Date
}

export class User extends BaseEntity<UserProps> {
  static create(props: Optional<UserProps, 'createdAt'>, id?: UniqueEntityId) {
    return new User(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )
  }

  get username() {
    return this.props.username
  }

  get password() {
    return this.props.password
  }

  get email() {
    return this.props.email
  }

  get role() {
    return this.props.role
  }

  get createdAt() {
    return this.props.createdAt
  }
}
