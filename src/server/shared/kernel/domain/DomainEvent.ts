import { UniqueEntityID } from "./UniqueEntityID";

/**
 * Доменна подія — факт, що стався в домені й може зацікавити інші частини системи
 * (напр. MetricLogged → перерахунок стріку/агрегатів дня). Це основа event-driven
 * стилю: агрегати лишаються незалежними, а реакції підключаються через обробники.
 */
export interface DomainEvent {
  readonly dateTimeOccurred: Date;
  /** Id агрегату, що породив подію — використовується диспетчером для маршрутизації. */
  getAggregateId(): UniqueEntityID;
}
