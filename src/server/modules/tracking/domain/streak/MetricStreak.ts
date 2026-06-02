import { Entity, Result, UniqueEntityID } from "@server/shared/kernel";
import type { StreakResult } from "./StreakCalculator";

interface MetricStreakProps {
  userId: UniqueEntityID;
  metricId: UniqueEntityID;
  current: number;
  longest: number;
  lastCompletedDate: string | null;
  updatedAt: Date;
}

export interface CreateMetricStreakProps {
  userId: UniqueEntityID;
  metricId: UniqueEntityID;
  current?: number;
  longest?: number;
  lastCompletedDate?: string | null;
  updatedAt?: Date;
}

/**
 * MetricStreak — кешована проєкція стріку по метриці (read-model). Перераховується
 * обробником події MetricLogged. Ідентифікується по метриці (один стрік на метрику).
 */
export class MetricStreak extends Entity<MetricStreakProps> {
  public get id(): UniqueEntityID {
    return this._id;
  }
  public get userId(): UniqueEntityID {
    return this.props.userId;
  }
  public get metricId(): UniqueEntityID {
    return this.props.metricId;
  }
  public get current(): number {
    return this.props.current;
  }
  public get longest(): number {
    return this.props.longest;
  }
  public get lastCompletedDate(): string | null {
    return this.props.lastCompletedDate;
  }
  public get updatedAt(): Date {
    return this.props.updatedAt;
  }

  private constructor(props: MetricStreakProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: CreateMetricStreakProps, id?: UniqueEntityID): Result<MetricStreak> {
    return Result.ok(
      new MetricStreak(
        {
          userId: props.userId,
          metricId: props.metricId,
          current: props.current ?? 0,
          longest: props.longest ?? 0,
          lastCompletedDate: props.lastCompletedDate ?? null,
          updatedAt: props.updatedAt ?? new Date(),
        },
        id,
      ),
    );
  }

  /** Застосувати результат перерахунку калькулятора. */
  public apply(result: StreakResult): void {
    this.props.current = result.current;
    this.props.longest = Math.max(result.longest, this.props.longest);
    this.props.lastCompletedDate = result.lastCompletedDate;
    this.props.updatedAt = new Date();
  }
}
