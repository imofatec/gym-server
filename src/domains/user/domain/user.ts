import { BaseEntity } from '../../shared/entities/base-entity.ts'
import type { UniqueEntityId } from '../../shared/entities/unique-entity-id.ts'
import type { Optional } from '../../shared/utils/optional.js'
import type { UserProps } from './user-props.ts'

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
    return this.props.username.value
  }

  get password() {
    return this.props.password.value
  }

  get email() {
    return this.props.email.value
  }

  get role() {
    return this.props.role
  }

  get createdAt() {
    return this.props.createdAt
  }
}
