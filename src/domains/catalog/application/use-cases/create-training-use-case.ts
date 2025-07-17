import type { DaysOfWeek } from '../../domain/value-objects/days-of-week.ts'
import type { TrainingDTO } from '../dtos/training.ts'

export type CreateTrainingDTO = {
  name: string
  dayOfWeek: DaysOfWeek
  instructorId: string
  exercisesIds: string[]
}

export interface CreateTrainingUseCase {
  execute(request: CreateTrainingDTO): Promise<TrainingDTO>
}
