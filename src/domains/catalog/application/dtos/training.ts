import type { Training } from '../../domain/training.ts'
import type { DaysOfWeek } from '../../domain/value-objects/days-of-week.ts'
import type { ExerciseDTO } from './exercise.ts'

export type TrainingDTO = {
  id: string
  name: string
  dayOfWeek: DaysOfWeek
  instructorId: string
  exercisesIds: string[]
  createdAt: string
}

export type TrainingWithExercisesDTO = {
  training: Omit<TrainingDTO, 'exercisesIds'>
  exercises: ExerciseDTO[]
}

export const TrainingMapper = {
  toDTO(training: Training): TrainingDTO {
    const { id, name, dayOfWeek, instructorId, exercisesIds, createdAt } =
      training

    return {
      id: id.toString(),
      name,
      dayOfWeek,
      instructorId,
      exercisesIds,
      createdAt: createdAt.toISOString(),
    }
  },
  toDTOWithExercise(
    training: Omit<TrainingDTO, 'exercisesIds'>,
    exercises: ExerciseDTO[]
  ): TrainingWithExercisesDTO {
    return {
      training,
      exercises,
    }
  },
}
