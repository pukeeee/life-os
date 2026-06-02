import { AggregateRoot, Result, UniqueEntityID } from "@server/shared/kernel";
import type { DayDate } from "./DayDate";

interface DayProps {
  userId: UniqueEntityID;
  date: DayDate;
  createdAt: Date;
}

export interface CreateDayProps {
  userId: UniqueEntityID;
  date: DayDate;
  createdAt?: Date;
}

/**
 * Day — контейнер доби користувача; точка звʼязування записів, настрою, задач і
 * журналу за календарний день. Наразі мінімальний (ідентичність + дата); кешовані
 * агрегати додамо, коли зʼявиться потреба в швидких зведеннях.
 */
export class Day extends AggregateRoot<DayProps> {
  public get userId(): UniqueEntityID {
    return this.props.userId;
  }
  public get date(): DayDate {
    return this.props.date;
  }
  public get createdAt(): Date {
    return this.props.createdAt;
  }

  private constructor(props: DayProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: CreateDayProps, id?: UniqueEntityID): Result<Day> {
    const day = new Day(
      { userId: props.userId, date: props.date, createdAt: props.createdAt ?? new Date() },
      id,
    );
    return Result.ok(day);
  }
}
