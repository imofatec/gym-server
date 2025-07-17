import type { ExerciseDTO } from '../dtos/exercise.ts'

export type CreateExerciseDTO = {
  name: string
  description?: string
  equipment?: string
}

export interface CreateExerciseUseCase {
  execute(exercise: CreateExerciseDTO): Promise<ExerciseDTO>
}
