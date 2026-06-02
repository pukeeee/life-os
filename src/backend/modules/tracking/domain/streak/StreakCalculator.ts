export interface StreakResult {
  /** Довжина останньої (трейлінгової) серії послідовних успішних днів. */
  current: number;
  /** Найдовша серія за всю історію. */
  longest: number;
  /** Остання успішна доба (YYYY-MM-DD) або null. */
  lastCompletedDate: string | null;
}

/**
 * Чистий доменний сервіс обчислення стріків над списком успішних дат.
 * Без БД, без побічних ефектів → тривіально тестується (TDD).
 *
 * `current` — це довжина трейлінгової серії (що закінчується найпізнішою датою).
 * Чи «жива» серія сьогодні — вирішує UI, порівнюючи lastCompletedDate із сьогодні.
 */
export class StreakCalculator {
  public static compute(successDates: string[]): StreakResult {
    const unique = [...new Set(successDates)].sort();
    if (unique.length === 0) {
      return { current: 0, longest: 0, lastCompletedDate: null };
    }

    let longest = 1;
    let run = 1;
    for (let i = 1; i < unique.length; i += 1) {
      if (this.isConsecutive(unique[i - 1], unique[i])) {
        run += 1;
      } else {
        run = 1;
      }
      if (run > longest) longest = run;
    }

    return {
      current: run, // run після циклу = трейлінгова серія
      longest,
      lastCompletedDate: unique[unique.length - 1],
    };
  }

  /** Чи `b` — наступний календарний день після `a` (обидва "YYYY-MM-DD"). */
  private static isConsecutive(a: string, b: string): boolean {
    const dayMs = 24 * 60 * 60 * 1000;
    return this.toUtc(b) - this.toUtc(a) === dayMs;
  }

  private static toUtc(date: string): number {
    const [y, m, d] = date.split("-").map(Number);
    return Date.UTC(y, m - 1, d);
  }
}
