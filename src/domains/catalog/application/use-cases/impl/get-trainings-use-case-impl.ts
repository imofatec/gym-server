import type { PaginationParams } from '../../../../shared/repository/pagination-params.js'
import { tryCatch } from '../../../../shared/utils/try-catch.ts'
import type { TrainingRepository } from '../../../domain/training-repository.ts'
import { type TrainingDTO, TrainingMapper } from '../../dtos/training.ts'
import type { GetTrainingsUseCase } from '../get-trainings-use-case.ts'

export class GetTrainingsUseCaseImpl implements GetTrainingsUseCase {
  private _repository: TrainingRepository

  constructor(repository: TrainingRepository) {
    this._repository = repository
  }

  async execute(pagination?: PaginationParams): Promise<TrainingDTO[]> {
    const { result, error } = await tryCatch(
      this._repository.findAll(pagination)
    )

    if (error) {
      throw new Error('Não foi possivel recuperar os treinos')
    }

    return result.map((t) => TrainingMapper.toDTO(t))
  }
}
