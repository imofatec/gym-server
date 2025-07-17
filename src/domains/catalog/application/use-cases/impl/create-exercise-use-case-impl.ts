import { tryCatch } from '../../../../shared/utils/try-catch.ts'
import { Exercise } from '../../../domain/exercise.ts'
import type { ExerciseRepository } from '../../../domain/exercise-repository.ts'
import { type ExerciseDTO, ExerciseMapper } from '../../dtos/exercise.ts'
import type {
  CreateExerciseDTO,
  CreateExerciseUseCase,
} from '../create-exercise-use-case.ts'

export class CreateExerciseUseCaseImpl implements CreateExerciseUseCase {
  private _repository: ExerciseRepository

  constructor(repository: ExerciseRepository) {
    this._repository = repository
  }

  async execute(exercise: CreateExerciseDTO): Promise<ExerciseDTO> {
    const { name, description, equipment } = exercise

    const { result, error } = await tryCatch(
      this._repository.save(Exercise.create({ name, description, equipment }))
    )

    if (error) {
      throw new Error('Não foi possível criar o execício')
    }

    return ExerciseMapper.toDTO(result)
  }
}
