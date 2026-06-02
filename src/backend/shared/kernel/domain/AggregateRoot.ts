import { Entity } from "./Entity";
import { UniqueEntityID } from "./UniqueEntityID";
import { DomainEvent } from "./DomainEvent";
import { DomainEvents } from "./DomainEvents";

/**
 * Корінь агрегату (Aggregate Root) — єдина точка входу для змін усередині межі
 * консистентності агрегату. Накопичує доменні події, які диспетчер відправляє
 * ПІСЛЯ успішного збереження агрегату репозиторієм (а не одразу), що гарантує:
 * подія публікується лише якщо зміни справді персистовані.
 */
export abstract class AggregateRoot<TProps> extends Entity<TProps> {
  private _domainEvents: DomainEvent[] = [];

  public get id(): UniqueEntityID {
    return this._id;
  }

  public get domainEvents(): readonly DomainEvent[] {
    return this._domainEvents;
  }

  protected addDomainEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent);
    // Позначаємо агрегат як такий, чиї події треба відправити після збереження.
    DomainEvents.markAggregateForDispatch(this);
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }
}
