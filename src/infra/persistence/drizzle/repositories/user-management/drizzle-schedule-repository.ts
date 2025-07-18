import type { Schedule } from '../../../../../domains/user-management/domain/schedule.ts'
import type { ScheduleRepository } from '../../../../../domains/user-management/domain/schedule-repository.ts'
import { db } from '../../connection.ts'
import { schedules } from '../../schemas/user-management/schedules.ts'
import { schedulesTrainings } from '../../schemas/user-management/schedules-trainings.ts'
import { DrizzleScheduleMapper } from './mappers/drizzle-schedule-mapper.ts'

export class DrizzleScheduleRepository implements ScheduleRepository {
  async save(schedule: Schedule): Promise<Schedule> {
    const raw = DrizzleScheduleMapper.toPersistence(schedule)

    const [row] = await db.insert(schedules).values(raw).returning()

    const [trainingsIdsRows] = await Promise.all(
      schedule.trainingsIds.map((tId) =>
        db
          .insert(schedulesTrainings)
          .values({ trainingId: tId, scheduleId: schedule.id.toString() }).returning()
      )
    )

    return DrizzleScheduleMapper.toDomain(row, trainingsIdsRows.map((tIdR) => tIdR.trainingId))
  }
}
