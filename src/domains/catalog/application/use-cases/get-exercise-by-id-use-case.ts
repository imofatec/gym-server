import type { ExerciseDTO } from '../dtos/exercise.ts'

export interface GetExerciseByIdUseCase {
  execute(id: string): Promise<ExerciseDTO>
}
