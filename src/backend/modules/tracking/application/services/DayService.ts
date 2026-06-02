import type { UniqueEntityID } from "@backend/shared/kernel";
import { Day } from "../../domain/day/Day";
import type { DayDate } from "../../domain/day/DayDate";
import type { IDayRepository } from "../../domain/day/IDayRepository";

/**
 * Прикладний сервіс: гарантує існування Day для (користувач, дата).
 * Інкапсулює патерн «знайти або створити», щоб не дублювати його в use cases.
 */
export class DayService {
  constructor(private readonly days: IDayRepository) {}

  public async ensure(userId: UniqueEntityID, date: DayDate): Promise<Day> {
    const existing = await this.days.findByUserAndDate(userId, date);
    if (existing) return existing;

    const day = Day.create({ userId, date }).getValue();
    await this.days.save(day);
    return day;
  }
}
