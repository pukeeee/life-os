import type { UniqueEntityID } from "@backend/shared/kernel";
import type { Day } from "../../domain/day/Day";
import type { DayDate } from "../../domain/day/DayDate";
import type { IDayRepository } from "../../domain/day/IDayRepository";

/** In-memory адаптер репозиторію діб. */
export class InMemoryDayRepository implements IDayRepository {
  private readonly store = new Map<string, Day>();

  public async findByUserAndDate(userId: UniqueEntityID, date: DayDate): Promise<Day | null> {
    for (const day of this.store.values()) {
      if (day.userId.equals(userId) && day.date.value === date.value) return day;
    }
    return null;
  }

  public async save(day: Day): Promise<void> {
    this.store.set(day.id.toString(), day);
  }
}
