import type { UniqueEntityID } from "@backend/shared/kernel";
import type { Entry } from "../../domain/entry/Entry";
import type { IEntryRepository } from "../../domain/entry/IEntryRepository";
import type { DayDate } from "../../domain/day/DayDate";

/** In-memory адаптер репозиторію записів. */
export class InMemoryEntryRepository implements IEntryRepository {
  private readonly store = new Map<string, Entry>();

  public async findById(id: UniqueEntityID): Promise<Entry | null> {
    return this.store.get(id.toString()) ?? null;
  }

  public async findByMetricAndDay(
    metricId: UniqueEntityID,
    dayId: UniqueEntityID,
  ): Promise<Entry | null> {
    for (const entry of this.store.values()) {
      if (entry.metricId.equals(metricId) && entry.dayId.equals(dayId)) return entry;
    }
    return null;
  }

  public async listByUserAndDay(
    userId: UniqueEntityID,
    dayId: UniqueEntityID,
  ): Promise<Entry[]> {
    return [...this.store.values()].filter(
      (e) => e.userId.equals(userId) && e.dayId.equals(dayId),
    );
  }

  public async listByMetric(metricId: UniqueEntityID): Promise<Entry[]> {
    return [...this.store.values()].filter((e) => e.metricId.equals(metricId));
  }

  public async listByUserInRange(
    userId: UniqueEntityID,
    from: DayDate,
    to: DayDate,
  ): Promise<Entry[]> {
    // Дати у форматі YYYY-MM-DD → лексикографічне порівняння == хронологічне.
    return [...this.store.values()].filter(
      (e) => e.userId.equals(userId) && e.date.value >= from.value && e.date.value <= to.value,
    );
  }

  public async save(entry: Entry): Promise<void> {
    this.store.set(entry.id.toString(), entry);
  }
}
