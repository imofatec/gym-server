import type { PaginationParams } from '../../../../shared/repository/pagination-params.js'
import { tryCatch } from '../../../../shared/utils/try-catch.ts'
import type { ExerciseRepository } from '../../../domain/exercise-repository.ts'
import { type ExerciseDTO, ExerciseMapper } from '../../dtos/exercise.ts'
import type { GetExercisesUseCase } from '../get-exercises-use-case.ts'

export class GetExercisesUseCaseImpl implements GetExercisesUseCase {
  private _repository: ExerciseRepository

  constructor(repository: ExerciseRepository) {
    this._repository = repository
  }

  async execute(pagination?: PaginationParams): Promise<ExerciseDTO[]> {
    const { result, error } = await tryCatch(
      this._repository.findAll(pagination)
    )

    if (error) {
      throw new Error('Não foi possivel recuperar os exercícios')
    }

    return result.map((e) => ExerciseMapper.toDTO(e))
  }
}
