import { Training } from '../../../../../../domains/catalog/domain/training.ts'
import type { DaysOfWeek } from '../../../../../../domains/catalog/domain/value-objects/days-of-week.ts'
import { UniqueEntityId } from '../../../../../../domains/shared/entities/unique-entity-id.ts'
import type { trainings } from '../../../schemas/catalog/trainings.ts'

export const DrizzleTrainingMapper = {
  toPersistence(training: Training): typeof trainings.$inferSelect {
    const { id, name, dayOfWeek, instructorId, createdAt } = training

    return {
      id: id.toString(),
      name,
      dayOfWeek,
      instructorId,
      createdAt,
    }
  },

  toDomain(
    raw: typeof trainings.$inferInsert,
    exercisesIds: string[]
  ): Training {
    const { id, name, dayOfWeek, instructorId, createdAt } = raw

    return Training.create(
      {
        name,
        dayOfWeek: dayOfWeek as DaysOfWeek,
        // biome-ignore lint/style/noNonNullAssertion: confia no pai
        instructorId: new UniqueEntityId(instructorId!),
        exercisesIds: exercisesIds.map((eId) => new UniqueEntityId(eId)),
        createdAt,
      },
      new UniqueEntityId(id)
    )
  },
}
