import { UniqueEntityId } from '../../../../../shared/entities/unique-entity-id.ts'
import { Exercise } from '../../../../domain/exercise.ts'
import type { exercises } from '../schema/exercises.ts'

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
