/**
 * Публічний API спільного доменного ядра.
 * Доменні модулі імпортують будівельні блоки лише звідси: `@backend/shared/kernel`.
 */

// core (прикладні примітиви)
export { Result } from "./core/Result";
export { Guard } from "./core/Guard";
export type { GuardArgument } from "./core/Guard";
export type { UseCase } from "./core/UseCase";
export { UseCaseError } from "./core/UseCaseError";
export { UnexpectedError, ValidationError } from "./core/AppError";

// domain (тактичні патерни DDD)
export { Entity } from "./domain/Entity";
export { AggregateRoot } from "./domain/AggregateRoot";
export { ValueObject } from "./domain/ValueObject";
export { UniqueEntityID } from "./domain/UniqueEntityID";
export { DomainEvents } from "./domain/DomainEvents";
export type { DomainEvent } from "./domain/DomainEvent";
