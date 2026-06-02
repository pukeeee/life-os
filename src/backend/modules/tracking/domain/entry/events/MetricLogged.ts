import type { DomainEvent, UniqueEntityID } from "@backend/shared/kernel";
import type { Entry } from "../Entry";

/**
 * Подія: метрику залоговано (створено або оновлено Entry). Обробники цієї події
 * (поза доменом) перераховуватимуть агрегати дня, стріки та інвалідуватимуть
 * кеш інсайтів — без звʼязності з самим доменом трекінгу.
 */
export class MetricLogged implements DomainEvent {
  public readonly dateTimeOccurred: Date;

  constructor(public readonly entry: Entry) {
    this.dateTimeOccurred = new Date();
  }

  public getAggregateId(): UniqueEntityID {
    return this.entry.id;
  }
}
