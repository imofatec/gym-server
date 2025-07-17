import { BaseEntity } from '../../shared/entities/base-entity.ts'
import type { UniqueEntityId } from '../../shared/entities/unique-entity-id.ts'
import type { Optional } from '../../shared/utils/optional.js'
import type { User } from '../../user-management/domain/user.ts'
import type { Exercise } from './exercise.ts'
import type { DaysOfWeek } from './value-objects/days-of-week.ts'

export type TrainingProps = {
  name: string
  dayOfWeek: DaysOfWeek
  instructorId: User['id']
  exercisesIds: Exercise['id'][]
  createdAt: Date
}

export class Training extends BaseEntity<TrainingProps> {
  static create(
    props: Optional<TrainingProps, 'createdAt'>,
    id?: UniqueEntityId
  ) {
    return new Training(
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

  get dayOfWeek() {
    return this.props.dayOfWeek
  }

  get exercisesIds() {
    return this.props.exercisesIds.map((id) => id.toString())
  }

  get instructorId() {
    return this.props.instructorId.toString()
  }

  get createdAt() {
    return this.props.createdAt
  }
}
