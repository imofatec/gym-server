import type { schedules } from '../../../schemas/user-management/schedules.ts'
import type { schedulesTrainings } from '../../../schemas/user-management/schedules-trainings.ts'
import { groupByLeftJoin } from '../../utils/joins.ts'
import { DrizzleScheduleMapper } from './drizzle-schedule-mapper.ts'

export const DrizzleSchedulesTrainingsMapper = {
  toSchedule(
    rows: {
      schedules: typeof schedules.$inferSelect
      schedules_trainings: typeof schedulesTrainings.$inferSelect | null
    }[]
  ) {
    return groupByLeftJoin(
      rows.map((row) => ({
        left: row.schedules,
        right: row.schedules_trainings,
      })),
      (row) => {
        if (!row.right) {
          return null
        }
        return { id: row.left.id, value: row.right.trainingId }
      },
      (schedule, trainingsIds) =>
        DrizzleScheduleMapper.toDomain(schedule, trainingsIds)
    )
  },
}
