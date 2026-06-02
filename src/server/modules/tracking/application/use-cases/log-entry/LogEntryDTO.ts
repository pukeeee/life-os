import type { EntrySource } from "../../../domain/entry/Entry";

/**
 * Вхідні дані логування. Значення передається в «сирому» поліморфному вигляді —
 * use case делегує його інтерпретацію визначенню метрики.
 */
export interface LogEntryRequest {
  userId: string;
  metricId: string;
  /** Календарна доба "YYYY-MM-DD" у таймзоні користувача (обчислює викликач). */
  date: string;
  number?: number | null;
  boolean?: boolean | null;
  text?: string | null;
  note?: string | null;
  source?: EntrySource;
}

export interface LogEntryResponse {
  entryId: string;
}
