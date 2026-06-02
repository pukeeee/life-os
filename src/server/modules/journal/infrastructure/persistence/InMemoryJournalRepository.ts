import type { UniqueEntityID } from "@server/shared/kernel";
import type { IJournalRepository } from "../../domain/IJournalRepository";
import type { JournalEntry } from "../../domain/JournalEntry";

/** In-memory адаптер з ключем `${userId}:${date}` для one-per-day. */
export class InMemoryJournalRepository implements IJournalRepository {
  private readonly store = new Map<string, JournalEntry>();

  public async findByDate(userId: UniqueEntityID, date: string): Promise<JournalEntry | null> {
    return this.store.get(key(userId.toString(), date)) ?? null;
  }

  public async listByUser(userId: UniqueEntityID, limit?: number): Promise<JournalEntry[]> {
    const list = [...this.store.values()]
      .filter((e) => e.userId.equals(userId))
      .sort((a, b) => b.date.localeCompare(a.date));
    return typeof limit === "number" ? list.slice(0, limit) : list;
  }

  public async save(entry: JournalEntry): Promise<void> {
    this.store.set(key(entry.userId.toString(), entry.date), entry);
  }
}

function key(userId: string, date: string): string {
  return `${userId}:${date}`;
}
