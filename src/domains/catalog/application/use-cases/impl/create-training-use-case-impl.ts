import { UniqueEntityId } from '../../../../shared/entities/unique-entity-id.ts'
import { tryCatch } from '../../../../shared/utils/try-catch.ts'
import { Training } from '../../../domain/training.ts'
import type { TrainingRepository } from '../../../domain/training-repository.ts'
import { type TrainingDTO, TrainingMapper } from '../../dtos/training.ts'
import type {
  CreateTrainingDTO,
  CreateTrainingUseCase,
} from '../create-training-use-case.ts'
import type { GetExerciseByIdUseCase } from '../get-exercise-by-id-use-case.ts'

export class CreateTrainingUseCaseImpl implements CreateTrainingUseCase {
  private _tRepository: TrainingRepository

  private _getExercisesUseCase: GetExerciseByIdUseCase

  constructor(
    tRepository: TrainingRepository,
    getExercisesUseCase: GetExerciseByIdUseCase
  ) {
    this._tRepository = tRepository
    this._getExercisesUseCase = getExercisesUseCase
  }

  async execute(request: CreateTrainingDTO): Promise<TrainingDTO> {
    const { name, dayOfWeek, exercisesIds, instructorId } = request

    await Promise.all(
      exercisesIds.map((eId) => this._getExercisesUseCase.execute(eId))
    )

    const training = Training.create({
      name,
      dayOfWeek,
      instructorId: new UniqueEntityId(instructorId),
      exercisesIds: exercisesIds.map((eId) => new UniqueEntityId(eId)),
    })

    const { result, error } = await tryCatch(this._tRepository.save(training))

    if (error) {
      throw new Error('Não foi possivel criar o treino')
    }

    return TrainingMapper.toDTO(result)
  }
}
