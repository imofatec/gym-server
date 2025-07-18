import { UniqueEntityId } from '../../../../shared/entities/unique-entity-id.ts'
import type { PaginationParams } from '../../../../shared/repository/pagination-params.js'
import { tryCatch } from '../../../../shared/utils/try-catch.ts'
import type { ExerciseRepository } from '../../../domain/exercise-repository.ts'
import type { TrainingRepository } from '../../../domain/training-repository.ts'
import {
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
    pagination?: PaginationParams
  ): Promise<TrainingWithExercisesDTO[]> {
    const { result, error } = await tryCatch(
      this._tRepository.findAll(pagination)
    )

    if (error) {
      throw new Error('Não foi possível recuperar os treinos')
    }

    const trainings = result

    const findingExercisesPromises = trainings.map(async (t) => {
      const exercises = await this._eRepository.findByIds(
        t.exercisesIds.map((eId) => new UniqueEntityId(eId))
      )

      return { training: t, exercises }
    })

    const trainingsWithExercises = await Promise.all(findingExercisesPromises)

    return trainingsWithExercises.map((tE) =>
      TrainingMapper.toDTOWithExercise(tE.training, tE.exercises)
    )
  }
}
