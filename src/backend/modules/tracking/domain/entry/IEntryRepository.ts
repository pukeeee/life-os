import type { UniqueEntityID } from "@backend/shared/kernel";
import type { Entry } from "./Entry";
import type { DayDate } from "../day/DayDate";

/** Порт репозиторію записів (логів метрик). save виконує upsert. */
export interface IEntryRepository {
  findById(id: UniqueEntityID): Promise<Entry | null>;
  /** Запис конкретної метрики за конкретну добу (для daily-каденції — один). */
  findByMetricAndDay(metricId: UniqueEntityID, dayId: UniqueEntityID): Promise<Entry | null>;
  /** Усі записи користувача за добу (для Today/зведень). */
  listByUserAndDay(userId: UniqueEntityID, dayId: UniqueEntityID): Promise<Entry[]>;
  /** Уся історія записів метрики (для стріків/трендів). */
  listByMetric(metricId: UniqueEntityID): Promise<Entry[]>;
  /** Усі записи користувача в діапазоні дат [from; to] (для аналітики). */
  listByUserInRange(userId: UniqueEntityID, from: DayDate, to: DayDate): Promise<Entry[]>;
  save(entry: Entry): Promise<void>;
}
