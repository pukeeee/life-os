import {
  Result,
  UnexpectedError,
  UniqueEntityID,
  UseCase,
  UseCaseError,
} from "@backend/shared/kernel";
import type { IJournalRepository } from "../../domain/IJournalRepository";
import type { JournalEntry } from "../../domain/JournalEntry";
import type { JournalEntryDTO } from "../dto/JournalEntryDTO";

export interface GetJournalEntryRequest {
  userId: string;
  date: string;
}

type Response = Result<JournalEntryDTO | null, UseCaseError>;

/** Повертає запис журналу за датою або null, якщо немає. */
export class GetJournalEntry implements UseCase<GetJournalEntryRequest, Response> {
  constructor(private readonly journal: IJournalRepository) {}

  public async execute(request: GetJournalEntryRequest): Promise<Response> {
    try {
      const entry = await this.journal.findByDate(new UniqueEntityID(request.userId), request.date);
      return Result.ok(entry ? toDto(entry) : null);
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
