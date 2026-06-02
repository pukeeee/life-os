import { createId, isCuid } from "@paralleldrive/cuid2";

/**
 * Ідентичність сутності. Генерується в домені (а не в БД), тож агрегат має
 * ідентичність одразу після створення — це канонічний підхід DDD і спрощує
 * тестування та портативність між сховищами.
 *
 * Використовуємо cuid2: колізієстійкий, без залежності від БД.
 */
export class UniqueEntityID {
  private readonly value: string;

  constructor(id?: string) {
    this.value = id ?? createId();
  }

  public toString(): string {
    return this.value;
  }

  public equals(id?: UniqueEntityID): boolean {
    if (id === null || id === undefined) return false;
    return id.toString() === this.value;
  }

  /** Перевірка, що рядок схожий на валідний cuid2 (для гідрації з зовнішніх джерел). */
  public static isValid(id: string): boolean {
    return isCuid(id);
  }
}
