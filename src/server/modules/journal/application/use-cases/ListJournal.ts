import {
  Result,
  UnexpectedError,
  UniqueEntityID,
  UseCase,
  UseCaseError,
} from "@server/shared/kernel";
import type { IJournalRepository } from "../../domain/IJournalRepository";
import type { JournalEntry } from "../../domain/JournalEntry";
import type { JournalEntryDTO } from "../dto/JournalEntryDTO";

export interface ListJournalRequest {
  userId: string;
  limit?: number;
}

type Response = Result<JournalEntryDTO[], UseCaseError>;

const DEFAULT_LIMIT = 30;

/** Список останніх записів журналу користувача (за датою спадно). */
export class ListJournal implements UseCase<ListJournalRequest, Response> {
  constructor(private readonly journal: IJournalRepository) {}

  public async execute(request: ListJournalRequest): Promise<Response> {
    try {
      const limit = request.limit ?? DEFAULT_LIMIT;
      const entries = await this.journal.listByUser(new UniqueEntityID(request.userId), limit);
      return Result.ok(entries.map(toDto));
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
