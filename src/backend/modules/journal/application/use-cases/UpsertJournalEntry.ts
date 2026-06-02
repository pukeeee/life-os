import {
  Result,
  UnexpectedError,
  UniqueEntityID,
  UseCase,
  UseCaseError,
  ValidationError,
} from "@backend/shared/kernel";
import { JournalEntry } from "../../domain/JournalEntry";
import type { IJournalRepository } from "../../domain/IJournalRepository";
import type { JournalEntryDTO } from "../dto/JournalEntryDTO";

export interface UpsertJournalEntryRequest {
  userId: string;
  date: string;
  content: string;
}

type Response = Result<JournalEntryDTO, UseCaseError>;

/** Створити або оновити запис журналу за датою (one-per-day). */
export class UpsertJournalEntry implements UseCase<UpsertJournalEntryRequest, Response> {
  constructor(private readonly journal: IJournalRepository) {}

  public async execute(request: UpsertJournalEntryRequest): Promise<Response> {
    try {
      const userId = new UniqueEntityID(request.userId);
      const existing = await this.journal.findByDate(userId, request.date);

      let entry: JournalEntry;
      if (existing) {
        const upd = existing.updateContent(request.content);
        if (upd.isFailure) return Result.fail(ValidationError.create(upd.getError()));
        entry = existing;
      } else {
        const created = JournalEntry.create({ userId, date: request.date, content: request.content });
        if (created.isFailure) return Result.fail(ValidationError.create(created.getError()));
        entry = created.getValue();
      }

      await this.journal.save(entry);
      return Result.ok(toDto(entry));
    } catch (err) {
      return Result.fail(UnexpectedError.create(err));
    }
  }
}

function toDto(entry: JournalEntry): JournalEntryDTO {
  return {
    entryId: entry.id.toString(),
    date: entry.date,
    content: entry.content,
    createdAt: entry.createdAt.toISOString(),
    updatedAt: entry.updatedAt.toISOString(),
  };
}
