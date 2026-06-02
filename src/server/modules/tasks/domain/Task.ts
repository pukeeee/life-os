import { AggregateRoot, Guard, Result, UniqueEntityID } from "@server/shared/kernel";
import { Priority } from "./Priority";

interface TaskProps {
  userId: UniqueEntityID;
  title: string;
  description: string | null;
  /** Дедлайн "YYYY-MM-DD" або null. */
  dueDate: string | null;
  priority: Priority | null;
  completedAt: Date | null;
  createdAt: Date;
}

export interface CreateTaskProps {
  userId: UniqueEntityID;
  title: string;
  description?: string | null;
  dueDate?: string | null;
  priority?: Priority | null;
  completedAt?: Date | null;
  createdAt?: Date;
}

/**
 * Task — корінь агрегату контексту Tasks. Навмисно автономний від Tracking:
 * дедлайн зберігаємо як валідований рядок-дату (без залежності від DayDate).
 */
export class Task extends AggregateRoot<TaskProps> {
  private static readonly MAX_TITLE = 200;
  private static readonly DATE_FORMAT = /^\d{4}-\d{2}-\d{2}$/;

  public get userId(): UniqueEntityID {
    return this.props.userId;
  }
  public get title(): string {
    return this.props.title;
  }
  public get description(): string | null {
    return this.props.description;
  }
  public get dueDate(): string | null {
    return this.props.dueDate;
  }
  public get priority(): Priority | null {
    return this.props.priority;
  }
  public get completedAt(): Date | null {
    return this.props.completedAt;
  }
  public get createdAt(): Date {
    return this.props.createdAt;
  }
  public get isCompleted(): boolean {
    return this.props.completedAt !== null;
  }

  private constructor(props: TaskProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: CreateTaskProps, id?: UniqueEntityID): Result<Task> {
    const emptyGuard = Guard.againstEmpty(props.title ?? "", "title");
    if (emptyGuard.isFailure) return Result.fail(emptyGuard.getError());
    const lengthGuard = Guard.againstAtMost(this.MAX_TITLE, props.title, "title");
    if (lengthGuard.isFailure) return Result.fail(lengthGuard.getError());

    if (props.dueDate && !this.DATE_FORMAT.test(props.dueDate)) {
      return Result.fail("dueDate мусить мати формат YYYY-MM-DD.");
    }

    return Result.ok(
      new Task(
        {
          userId: props.userId,
          title: props.title.trim(),
          description: props.description ?? null,
          dueDate: props.dueDate ?? null,
          priority: props.priority ?? null,
          completedAt: props.completedAt ?? null,
          createdAt: props.createdAt ?? new Date(),
        },
        id,
      ),
    );
  }

  public complete(at: Date = new Date()): void {
    if (!this.isCompleted) this.props.completedAt = at;
  }

  public reopen(): void {
    this.props.completedAt = null;
  }
}
