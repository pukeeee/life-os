import { AggregateRoot, Guard, Result, UniqueEntityID } from "@server/shared/kernel";
import { GoalLevel } from "./GoalLevel";

interface GoalProps {
  userId: UniqueEntityID;
  parentId: UniqueEntityID | null;
  level: GoalLevel;
  title: string;
  targetDate: string | null;
  /** 0..1 — частка виконання. */
  progress: number;
  archivedAt: Date | null;
  createdAt: Date;
}

export interface CreateGoalProps {
  userId: UniqueEntityID;
  parentId?: UniqueEntityID | null;
  level: GoalLevel;
  title: string;
  targetDate?: string | null;
  progress?: number;
  archivedAt?: Date | null;
  createdAt?: Date;
}

/**
 * Goal — корінь агрегату контексту Goals. Ієрархія через `parentId`; рівень
 * (life/year/quarter/month/week) — окрема ортогональна вісь, не наслідується
 * автоматично, але має сенс лише в порядку «батько ≥ дитина» за рівнем.
 */
export class Goal extends AggregateRoot<GoalProps> {
  private static readonly MAX_TITLE = 200;
  private static readonly DATE_FORMAT = /^\d{4}-\d{2}-\d{2}$/;

  public get userId(): UniqueEntityID {
    return this.props.userId;
  }
  public get parentId(): UniqueEntityID | null {
    return this.props.parentId;
  }
  public get level(): GoalLevel {
    return this.props.level;
  }
  public get title(): string {
    return this.props.title;
  }
  public get targetDate(): string | null {
    return this.props.targetDate;
  }
  public get progress(): number {
    return this.props.progress;
  }
  public get archivedAt(): Date | null {
    return this.props.archivedAt;
  }
  public get createdAt(): Date {
    return this.props.createdAt;
  }
  public get isArchived(): boolean {
    return this.props.archivedAt !== null;
  }

  private constructor(props: GoalProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: CreateGoalProps, id?: UniqueEntityID): Result<Goal> {
    const emptyGuard = Guard.againstEmpty(props.title ?? "", "title");
    if (emptyGuard.isFailure) return Result.fail(emptyGuard.getError());
    const lengthGuard = Guard.againstAtMost(this.MAX_TITLE, props.title, "title");
    if (lengthGuard.isFailure) return Result.fail(lengthGuard.getError());
    if (props.targetDate && !this.DATE_FORMAT.test(props.targetDate)) {
      return Result.fail("targetDate мусить мати формат YYYY-MM-DD.");
    }
    const progress = props.progress ?? 0;
    if (!Number.isFinite(progress) || progress < 0 || progress > 1) {
      return Result.fail("progress мусить бути в межах 0..1.");
    }

    return Result.ok(
      new Goal(
        {
          userId: props.userId,
          parentId: props.parentId ?? null,
          level: props.level,
          title: props.title.trim(),
          targetDate: props.targetDate ?? null,
          progress,
          archivedAt: props.archivedAt ?? null,
          createdAt: props.createdAt ?? new Date(),
        },
        id,
      ),
    );
  }

  public setProgress(progress: number): Result<void> {
    if (!Number.isFinite(progress) || progress < 0 || progress > 1) {
      return Result.fail("progress мусить бути в межах 0..1.");
    }
    this.props.progress = progress;
    return Result.ok();
  }

  public archive(at: Date = new Date()): void {
    if (!this.isArchived) this.props.archivedAt = at;
  }

  public unarchive(): void {
    this.props.archivedAt = null;
  }
}
