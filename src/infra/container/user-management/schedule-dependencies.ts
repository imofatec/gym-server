import { DrizzleScheduleRepository } from "../../persistence/drizzle/repositories/user-management/drizzle-schedule-repository.ts";

const repository = {
    drizzleRepository: new DrizzleScheduleRepository()
}

export const scheduleDependencies = {
    repository
}
