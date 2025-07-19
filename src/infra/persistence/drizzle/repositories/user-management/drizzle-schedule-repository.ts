import { desc, eq, inArray } from 'drizzle-orm'
import type { PaginationParams } from '../../../../../domains/shared/repository/pagination-params.js'
import type { Schedule } from '../../../../../domains/user-management/domain/schedule.ts'
import type { ScheduleRepository } from '../../../../../domains/user-management/domain/schedule-repository.ts'
import { db } from '../../connection.ts'
import { schedules } from '../../schemas/user-management/schedules.ts'
import { schedulesTrainings } from '../../schemas/user-management/schedules-trainings.ts'
import { withPagination } from '../utils/with-pagination.ts'
import { DrizzleScheduleMapper } from './mappers/drizzle-schedule-mapper.ts'
import { DrizzleSchedulesTrainingsMapper } from './mappers/drizzle-schedules-trainings-mapper.ts'

export class DrizzleScheduleRepository implements ScheduleRepository {
  async findAll(pagination?: PaginationParams): Promise<Schedule[]> {
    let baseSchedules = db
      .select()
      .from(schedules)
      .orderBy(desc(schedules.createdAt))
      .$dynamic()

    if (pagination) {
      const { page, pageSize } = pagination
      baseSchedules = withPagination(baseSchedules, page + 1, pageSize)
    }

    const schedulesResult = await baseSchedules

    const scheduleIds = schedulesResult.map((s) => s.id)

    const joined = await db
      .select()
      .from(schedules)
      .leftJoin(
        schedulesTrainings,
        eq(schedules.id, schedulesTrainings.scheduleId)
      )
      .where(inArray(schedules.id, scheduleIds))

    return DrizzleSchedulesTrainingsMapper.toSchedule(joined)
  }

  async findByStudentId(
    studentId: Schedule['studentId'],
    pagination?: PaginationParams
  ): Promise<Schedule[]> {
    let baseSchedules = db
      .select()
      .from(schedules)
      .where(eq(schedules.studentId, studentId))
      .orderBy(desc(schedules.createdAt))
      .$dynamic()

    if (pagination) {
      const { page, pageSize } = pagination
      baseSchedules = withPagination(baseSchedules, page + 1, pageSize)
    }

    const schedulesResult = await baseSchedules

    const schedulesIds = schedulesResult.map((s) => s.id)

    const joined = await db
      .select()
      .from(schedules)
      .leftJoin(
        schedulesTrainings,
        eq(schedulesTrainings.scheduleId, schedules.id)
      )
      .where(inArray(schedules.id, schedulesIds))

    return DrizzleSchedulesTrainingsMapper.toSchedule(joined)
  }

  async save(schedule: Schedule): Promise<Schedule> {
    const raw = DrizzleScheduleMapper.toPersistence(schedule)

    const [row] = await db.insert(schedules).values(raw).returning()

    const [trainingsIdsRows] = await Promise.all(
      schedule.trainingsIds.map((tId) =>
        db
          .insert(schedulesTrainings)
          .values({ trainingId: tId, scheduleId: schedule.id.toString() })
          .returning()
      )
    )

    return DrizzleScheduleMapper.toDomain(
      row,
      trainingsIdsRows.map((tIdR) => tIdR.trainingId)
    )
  }
}
