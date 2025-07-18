import { CreateScheduleUseCaseImpl } from "../../../../domains/user-management/application/user-cases/impl/create-schedule-use-case-impl.ts";
import { schedule } from "../index.ts";

const {repository} = schedule.scheduleDependencies

export function makeCreateScheduleUseCase() {
  return new CreateScheduleUseCaseImpl(repository.drizzleRepository)
}
