import { UniqueEntityId } from '../../../../shared/entities/unique-entity-id.ts'
import type { PaginationParams } from '../../../../shared/repository/pagination-params.js'
import { tryCatch } from '../../../../shared/utils/try-catch.ts'
import type { ExerciseRepository } from '../../../domain/exercise-repository.ts'
import type { Training } from '../../../domain/training.ts'
import type { TrainingRepository } from '../../../domain/training-repository.ts'
import { ExerciseMapper } from '../../dtos/exercise.ts'
import {
  type TrainingDTO,
  TrainingMapper,
  type TrainingWithExercisesDTO,
} from '../../dtos/training.ts'
import type { GetTrainingsWithExercisesUseCase } from '../get-trainings-with-exercises-use-case.ts'

export class GetTrainingsWithExercisesUseCaseImpl
  implements GetTrainingsWithExercisesUseCase
{
  private _tRepository: TrainingRepository

  private _eRepository: ExerciseRepository

  constructor(
    tRepository: TrainingRepository,
    eRepository: ExerciseRepository
  ) {
    this._tRepository = tRepository
    this._eRepository = eRepository
  }

  async execute(
    pagination?: PaginationParams,
    ids?: TrainingDTO['id'][]
  ): Promise<TrainingWithExercisesDTO[]> {
    return ids ? this._getByIds(ids) : this._getAll(pagination)
  }

  private async _getAll(pagination?: PaginationParams) {
    const { result, error } = await tryCatch(
      this._tRepository.findAll(pagination)
    )

    if (error) {
      throw this._throwError()
    }

    return this._composeTraining(result)
  }

  private async _getByIds(ids: TrainingDTO['id'][]) {
    const { result, error } = await tryCatch(
      this._tRepository.findByIds(ids.map((id) => new UniqueEntityId(id)))
    )

    if (error) {
      throw this._throwError()
    }

    return this._composeTraining(result)
  }

  private async _composeTraining(trainings: Training[]) {
    const findingExercisesPromises = trainings.map(async (t) => {
      const exercises = await this._eRepository.findByIds(
        t.exercisesIds.map((eId) => new UniqueEntityId(eId))
      )

      return { training: t, exercises }
    })

    const trainingsWithExercises = await Promise.all(findingExercisesPromises)

    return trainingsWithExercises.map((tE) =>
      TrainingMapper.toDTOWithExercise(
        TrainingMapper.toDTO(tE.training),
        tE.exercises.map((tEE) => ExerciseMapper.toDTO(tEE))
      )
    )
  }

  private _throwError() {
    return new Error('Não foi possível recuperar os treinos')
  }
}
