import { BaseEntity } from '../../shared/entities/base-entity.ts'
import type { UniqueEntityId } from '../../shared/entities/unique-entity-id.ts'
import type { Optional } from '../../shared/utils/optional.js'

export type ExerciseProps = {
  name: string
  description?: string
  equipment?: string
  createdAt: Date
}

export class Exercise extends BaseEntity<ExerciseProps> {
  static create(
    props: Optional<ExerciseProps, 'createdAt'>,
    id?: UniqueEntityId
  ) {
    return new Exercise(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )
  }
  get name() {
    return this.props.name
  }

  get description() {
    return this.props.description
  }

  get equipment() {
    return this.props.equipment
  }

  get createdAt() {
    return this.props.createdAt
  }
}
