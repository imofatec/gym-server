import { UniqueEntityId } from '../../../../../../domains/shared/entities/unique-entity-id.ts'
import { Schedule } from '../../../../../../domains/user-management/domain/schedule.ts'
import type { schedules } from '../../../schemas/user-management/schedules.ts'

export const DrizzleScheduleMapper = {
  toPersistence(schedule: Schedule): typeof schedules.$inferInsert {
    const { id, studentId, startDate, finishDate, createdAt } =
      schedule

      return {
        id: id.toString(),
        studentId,
        startDate,
        finishDate,
        createdAt
      }
  },
  toDomain(raw: typeof schedules.$inferSelect, trainingsIds: string[]): Schedule {
    const { id, studentId, startDate, finishDate, createdAt } = raw
    return Schedule.create({
        // biome-ignore lint/style/noNonNullAssertion: confia
        studentId: new UniqueEntityId(studentId!),
        trainingIds: trainingsIds.map((tId) => new UniqueEntityId(tId)),
        startDate,
        finishDate,
        createdAt
        
    }, new UniqueEntityId(id),)
    
  }
}
