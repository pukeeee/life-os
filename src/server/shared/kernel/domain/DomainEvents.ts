import { AggregateRoot } from "./AggregateRoot";
import { DomainEvent } from "./DomainEvent";
import { UniqueEntityID } from "./UniqueEntityID";

type DomainEventHandler = (event: DomainEvent) => void | Promise<void>;

/**
 * Простий in-memory диспетчер доменних подій (патерн із DDD-спільноти).
 *
 * Потік:
 *  1) Агрегат у бізнес-методі викликає addDomainEvent(...) → агрегат «маркується».
 *  2) Репозиторій після успішного save(...) викликає
 *     DomainEvents.dispatchEventsForAggregate(aggregate.id).
 *  3) Диспетчер викликає зареєстровані обробники й очищає події агрегату.
 *
 * Так домен лишається синхронним і чистим, а сайд-ефекти (кеш, e-mail, перерахунки)
 * під'єднуються ззовні. Пізніше реалізацію можна замінити на чергу (Redis/Bull)
 * без зміни доменного коду.
 */
export class DomainEvents {
  private static handlersMap: Record<string, DomainEventHandler[]> = {};
  private static markedAggregates: AggregateRoot<unknown>[] = [];

  public static markAggregateForDispatch(aggregate: AggregateRoot<unknown>): void {
    const found = this.findMarkedAggregateByID(aggregate.id);
    if (!found) {
      this.markedAggregates.push(aggregate);
    }
  }

  public static dispatchEventsForAggregate(id: UniqueEntityID): void {
    const aggregate = this.findMarkedAggregateByID(id);
    if (!aggregate) return;
    this.dispatchAggregateEvents(aggregate);
    aggregate.clearEvents();
    this.removeAggregateFromMarkedDispatchList(aggregate);
  }

  public static register(callback: DomainEventHandler, eventClassName: string): void {
    if (!Object.prototype.hasOwnProperty.call(this.handlersMap, eventClassName)) {
      this.handlersMap[eventClassName] = [];
    }
    this.handlersMap[eventClassName].push(callback);
  }

  /** Скидання стану — переважно для ізоляції в тестах. */
  public static clearHandlers(): void {
    this.handlersMap = {};
  }

  public static clearMarkedAggregates(): void {
    this.markedAggregates = [];
  }

  private static dispatchAggregateEvents(aggregate: AggregateRoot<unknown>): void {
    for (const event of aggregate.domainEvents) {
      this.dispatch(event);
    }
  }

  private static dispatch(event: DomainEvent): void {
    const eventClassName = event.constructor.name;
    const handlers = this.handlersMap[eventClassName];
    if (!handlers) return;
    for (const handler of handlers) {
      // Помилки обробників не повинні «валити» доменну операцію.
      void Promise.resolve(handler(event)).catch((err) => {
        console.error(`[DomainEvents] обробник ${eventClassName} впав:`, err);
      });
    }
  }

  private static findMarkedAggregateByID(id: UniqueEntityID): AggregateRoot<unknown> | undefined {
    return this.markedAggregates.find((a) => a.id.equals(id));
  }

  private static removeAggregateFromMarkedDispatchList(aggregate: AggregateRoot<unknown>): void {
    const index = this.markedAggregates.findIndex((a) => a.equals(aggregate));
    if (index !== -1) this.markedAggregates.splice(index, 1);
  }
}
