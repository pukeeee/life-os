import type { DomainEvent, UniqueEntityID } from "@backend/shared/kernel";
import type { User } from "../User";

/**
 * Подія: зареєстровано нового користувача. Сюди підключаються сайд-ефекти
 * (напр. створення дефолтних категорій/метрик, welcome-лист через Resend),
 * не забруднюючи доменну логіку User.
 */
export class UserRegistered implements DomainEvent {
  public readonly dateTimeOccurred: Date;

  constructor(public readonly user: User) {
    this.dateTimeOccurred = new Date();
  }

  public getAggregateId(): UniqueEntityID {
    return this.user.id;
  }
}
