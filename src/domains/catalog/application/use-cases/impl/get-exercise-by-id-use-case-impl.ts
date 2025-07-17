import { UniqueEntityId } from '../../../../shared/entities/unique-entity-id.ts'
import { NotFoundError } from '../../../../shared/errors/not-found-error.ts'
import { tryCatch } from '../../../../shared/utils/try-catch.ts'
import type { ExerciseRepository } from '../../../domain/exercise-repository.ts'
import { type ExerciseDTO, ExerciseMapper } from '../../dtos/exercise.ts'
import type { GetExerciseByIdUseCase } from '../get-exercise-by-id-use-case.ts'

export class GetExerciseByIdUseCaseImpl implements GetExerciseByIdUseCase {
  private _repository: ExerciseRepository

  constructor(repository: ExerciseRepository) {
    this._repository = repository
  }

  async execute(id: string): Promise<ExerciseDTO> {
    const { result, error } = await tryCatch(
      this._repository.findById(new UniqueEntityId(id))
    )

    if (error || !result) {
      throw new NotFoundError(`Exercício ${id} não encontrado`)
    }

    return ExerciseMapper.toDTO(result)
  }
}
