import { AggregateRoot, Guard, Result, UniqueEntityID } from "@server/shared/kernel";

interface JournalEntryProps {
  userId: UniqueEntityID;
  /** Календарна дата в таймзоні користувача, "YYYY-MM-DD". */
  date: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateJournalEntryProps {
  userId: UniqueEntityID;
  date: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * JournalEntry — щоденний запис журналу (один на добу для користувача).
 * One-per-day гарантується унікальним ключем у репозиторії (userId+date).
 */
export class JournalEntry extends AggregateRoot<JournalEntryProps> {
  private static readonly MAX_CONTENT = 32_000;
  private static readonly DATE_FORMAT = /^\d{4}-\d{2}-\d{2}$/;

  public get userId(): UniqueEntityID {
    return this.props.userId;
  }
  public get date(): string {
    return this.props.date;
  }
  public get content(): string {
    return this.props.content;
  }
  public get createdAt(): Date {
    return this.props.createdAt;
  }
  public get updatedAt(): Date {
    return this.props.updatedAt;
  }

  private constructor(props: JournalEntryProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: CreateJournalEntryProps, id?: UniqueEntityID): Result<JournalEntry> {
    if (!this.DATE_FORMAT.test(props.date)) {
      return Result.fail("date мусить мати формат YYYY-MM-DD.");
    }
    const lengthGuard = Guard.againstAtMost(this.MAX_CONTENT, props.content, "content");
    if (lengthGuard.isFailure) return Result.fail(lengthGuard.getError());

    const now = new Date();
    return Result.ok(
      new JournalEntry(
        {
          userId: props.userId,
          date: props.date,
          content: props.content,
          createdAt: props.createdAt ?? now,
          updatedAt: props.updatedAt ?? now,
        },
        id,
      ),
    );
  }

  public updateContent(content: string): Result<void> {
    const lengthGuard = Guard.againstAtMost(JournalEntry.MAX_CONTENT, content, "content");
    if (lengthGuard.isFailure) return Result.fail(lengthGuard.getError());
    this.props.content = content;
    this.props.updatedAt = new Date();
    return Result.ok();
  }
}
