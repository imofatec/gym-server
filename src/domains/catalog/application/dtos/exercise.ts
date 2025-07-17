import type { Exercise } from '../../domain/exercise.ts'

export type ExerciseDTO = {
  id: string
  name: string
  description?: string
  equipment?: string
  createdAt: string
}

export const ExerciseMapper = {
  toDTO(exercise: Exercise): ExerciseDTO {
    const { id, name, description, equipment, createdAt } = exercise

    return {
      id: id.toString(),
      name,
      description,
      equipment,
      createdAt: createdAt.toISOString(),
    }
  },
}
