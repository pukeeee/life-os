/**
 * Згладжування рядів значень. Чистий доменний сервіс аналітики — без БД/IO.
 * SMA прибирає щоденний шум; EMA реагує швидше на свіжі зміни.
 */
export class MovingAverage {
  /** Просте ковзне середнє. Повертає null для точок, де ще бракує `window` значень. */
  public static sma(values: number[], window: number): (number | null)[] {
    if (window <= 0) throw new Error("window мусить бути > 0");
    return values.map((_, i) => {
      if (i < window - 1) return null;
      const slice = values.slice(i - window + 1, i + 1);
      return slice.reduce((a, b) => a + b, 0) / window;
    });
  }

  /** Експоненційне ковзне середнє (alpha ∈ (0;1]). */
  public static ema(values: number[], alpha: number): number[] {
    if (alpha <= 0 || alpha > 1) throw new Error("alpha мусить бути в (0; 1]");
    const out: number[] = [];
    let prev: number | undefined;
    for (const v of values) {
      prev = prev === undefined ? v : alpha * v + (1 - alpha) * prev;
      out.push(prev);
    }
    return out;
  }
}
