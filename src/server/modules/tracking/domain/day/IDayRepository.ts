import type { UniqueEntityID } from "@server/shared/kernel";
import type { Day } from "./Day";
import type { DayDate } from "./DayDate";

/** Порт репозиторію діб. */
export interface IDayRepository {
  findByUserAndDate(userId: UniqueEntityID, date: DayDate): Promise<Day | null>;
  save(day: Day): Promise<void>;
}
