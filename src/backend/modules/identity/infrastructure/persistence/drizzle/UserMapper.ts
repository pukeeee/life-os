import { UniqueEntityID } from "@backend/shared/kernel";
import type { UserInsert, UserRow } from "@backend/infrastructure/persistence/drizzle/schema";
import { User } from "../../../domain/User";
import { Email } from "../../../domain/Email";
import { Timezone } from "../../../domain/Timezone";

/**
 * Мапер User ↔ рядок БД. Ізолює домен від форми персистенції: жодних SQL-типів
 * у домені, жодних доменних правил у схемі.
 */
export class UserMapper {
  public static toDomain(row: UserRow): User {
    const email = Email.create(row.email).getValue();
    const timezone = Timezone.create(row.timezone).getValue();
    return User.create(
      {
        email,
        displayName: row.displayName,
        timezone,
        birthDate: row.birthDate,
        createdAt: row.createdAt,
      },
      new UniqueEntityID(row.id),
    ).getValue();
  }

  public static toPersistence(user: User): UserInsert {
    return {
      id: user.id.toString(),
      email: user.email.value,
      displayName: user.displayName,
      timezone: user.timezone.value,
      birthDate: user.birthDate,
      createdAt: user.createdAt,
      updatedAt: new Date(),
    };
  }
}
