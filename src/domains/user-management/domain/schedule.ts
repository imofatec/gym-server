import type { Training } from '../../catalog/domain/training.ts'
import { BaseEntity } from '../../shared/entities/base-entity.ts'
import type { UniqueEntityId } from '../../shared/entities/unique-entity-id.ts'
import type { User } from './user.ts'

export type ScheduleProps = {
  studentId: User['id']
  trainingIds: Training['id'][]
  startDate: Date
  finishDate: Date
  createdAt: Date
}

export class Schedule extends BaseEntity<ScheduleProps> {
  static create(props: ScheduleProps, id?: UniqueEntityId) {
    return new Schedule(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )
  }

  get studentId() {
    return this.props.studentId.toString()
  }

  get trainingIds() {
    return this.props.trainingIds.map((id) => id.toString())
  }

  get startDate() {
    return this.props.startDate
  }

  get finalDate() {
    return this.props.finishDate
  }

  get createdAt() {
    return this.props.createdAt
  }
}
