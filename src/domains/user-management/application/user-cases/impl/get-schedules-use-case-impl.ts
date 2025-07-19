import { TrainingMapper } from '../../../../catalog/application/dtos/training.ts'
import type { GetTrainingsWithExercisesUseCase } from '../../../../catalog/application/use-cases/get-trainings-with-exercises-use-case.ts'
import type { PaginationParams } from '../../../../shared/repository/pagination-params.js'
import { tryCatch } from '../../../../shared/utils/try-catch.ts'
import type { Schedule } from '../../../domain/schedule.ts'
import type { ScheduleRepository } from '../../../domain/schedule-repository.ts'
import {
  type FullScheduleDTO,
  type ScheduleDTO,
  ScheduleMapper,
} from '../../dtos/schedule.ts'
import type { GetSchedulesUseCase } from '../get-schedules-use-case.ts'
import type { GetUserByIdUseCase } from '../get-user-by-id-use-case.ts'

export class GetSchedulesUseCaseImpl implements GetSchedulesUseCase {
  private _sRepository: ScheduleRepository

  private _uUseCase: GetUserByIdUseCase

  private _tUseCase: GetTrainingsWithExercisesUseCase

  constructor(
    sRepository: ScheduleRepository,
    uUseCase: GetUserByIdUseCase,
    tUseCase: GetTrainingsWithExercisesUseCase
  ) {
    this._sRepository = sRepository
    this._uUseCase = uUseCase
    this._tUseCase = tUseCase
  }

  async execute(
    pagination?: PaginationParams,
    studentId?: ScheduleDTO['studentId'],
    fullSchedule?: boolean
  ): Promise<ScheduleDTO[] | FullScheduleDTO[]> {
    return studentId
      ? this._getByStudentId(studentId, fullSchedule, pagination)
      : this._getAll(fullSchedule, pagination)
  }

  private async _getAll(fullSchedule?: boolean, pagination?: PaginationParams) {
    const { result, error } = await tryCatch(
      this._sRepository.findAll(pagination)
    )

    if (error) {
      throw this._throwError()
    }

    const schedules = result

    if (!fullSchedule) {
      return schedules.map((s) => ScheduleMapper.toDTO(s))
    }

    return await Promise.all(this._composeFullSchedule(schedules))
  }

  private async _getByStudentId(
    studentId: ScheduleDTO['studentId'],
    fullSchedule?: boolean,
    pagination?: PaginationParams
  ) {
    const { result, error } = await tryCatch(
      this._sRepository.findByStudentId(studentId, pagination)
    )

    if (error) {
      throw this._throwError()
    }

    const schedules = result
    if (!fullSchedule) {
      return schedules.map((s) => ScheduleMapper.toDTO(s))
    }

    return await Promise.all(this._composeFullSchedule(schedules))
  }

  private _composeFullSchedule(schedules: Schedule[]) {
    return schedules.map(async (s) => {
      const trainings = await this._tUseCase.execute(undefined, s.trainingsIds)
      const user = await this._uUseCase.execute(s.studentId)

      const fullTrainingsDTOs = trainings.map((tWE) => {
        return TrainingMapper.toDTOWithExercise(tWE.training, tWE.exercises)
      })

      return ScheduleMapper.toFullDTO(
        ScheduleMapper.toDTO(s),
        user,
        fullTrainingsDTOs
      )
    })
  }

  private _throwError() {
    return new Error('Não foi possível recuperar os cronogramas')
  }
}
