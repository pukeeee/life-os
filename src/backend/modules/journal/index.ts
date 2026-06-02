/** Публічний API bounded context-у Journal. */

// Domain
export { JournalEntry } from "./domain/JournalEntry";
export type { IJournalRepository } from "./domain/IJournalRepository";

// Application
export { UpsertJournalEntry } from "./application/use-cases/UpsertJournalEntry";
export type { UpsertJournalEntryRequest } from "./application/use-cases/UpsertJournalEntry";
export { GetJournalEntry } from "./application/use-cases/GetJournalEntry";
export type { GetJournalEntryRequest } from "./application/use-cases/GetJournalEntry";
export { ListJournal } from "./application/use-cases/ListJournal";
export type { ListJournalRequest } from "./application/use-cases/ListJournal";
export type { JournalEntryDTO } from "./application/dto/JournalEntryDTO";

// Infrastructure
export { InMemoryJournalRepository } from "./infrastructure/persistence/InMemoryJournalRepository";
export { DrizzleJournalRepository } from "./infrastructure/persistence/drizzle/DrizzleJournalRepository";
