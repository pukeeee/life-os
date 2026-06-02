import type { UniqueEntityID } from "@server/shared/kernel";
import type { JournalEntry } from "./JournalEntry";

/** Порт репозиторію журналу. */
export interface IJournalRepository {
  findByDate(userId: UniqueEntityID, date: string): Promise<JournalEntry | null>;
  listByUser(userId: UniqueEntityID, limit?: number): Promise<JournalEntry[]>;
  save(entry: JournalEntry): Promise<void>;
}
