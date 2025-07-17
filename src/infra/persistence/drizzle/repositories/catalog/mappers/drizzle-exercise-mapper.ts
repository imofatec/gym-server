import { Exercise } from '../../../../../../domains/catalog/domain/exercise.ts'
import { UniqueEntityId } from '../../../../../../domains/shared/entities/unique-entity-id.ts'
import type { exercises } from '../../../schemas/catalog/exercises.ts'

export const DrizzleExerciseMapper = {
  toPersistence(exercise: Exercise): typeof exercises.$inferInsert {
    const { id, name, description, equipment, createdAt } = exercise

    return {
      id: id.toString(),
      name,
      description,
      equipment,
      createdAt,
    }
  },

  toDomain(raw: typeof exercises.$inferSelect): Exercise {
    const { id, name, description, equipment, createdAt } = raw

    return Exercise.create(
      {
        name,
        description: description ?? undefined,
        equipment: equipment ?? undefined,
        createdAt,
      },
      new UniqueEntityId(id)
    )
  },
}
