import { UniqueEntityId } from '../../../../shared/entities/unique-entity-id.ts'
import { tryCatch } from '../../../../shared/utils/try-catch.ts'
import { Schedule } from '../../../domain/schedule.ts'
import type { ScheduleRepository } from '../../../domain/schedule-repository.ts'
import { type ScheduleDTO, ScheduleMapper } from '../../dtos/schedule.ts'
import type {
  CreateSCheduleUseCase,
  CreateScheduleDTO,
} from '../create-schedule-use-case.ts'

export class CreateScheduleUseCaseImpl implements CreateSCheduleUseCase {
  private _repository: ScheduleRepository

  constructor(_repository: ScheduleRepository) {
    this._repository = _repository
  }

  async execute(schedule: CreateScheduleDTO): Promise<ScheduleDTO> {
    const { studentId, trainingsIds, startDate, finishDate } = schedule

    const { result, error } = await tryCatch(
      this._repository.save(
        Schedule.create({
          studentId: new UniqueEntityId(studentId),
          trainingIds: trainingsIds.map((tId) => new UniqueEntityId(tId)),
          startDate,
          finishDate,
        })
      )
    )

    if (error) {
      throw new Error('Não foi possível criar o cronograma')
    }

    return ScheduleMapper.toDTO(result)
  }
}
