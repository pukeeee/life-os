export interface CorrelationOutcome {
  /** Коефіцієнт кореляції Пірсона в межах [-1; 1]. */
  r: number;
  /** Кількість пар спостережень. */
  n: number;
}

/**
 * Коефіцієнт кореляції Пірсона — основа «двигуна інсайтів». Чистий сервіс.
 * Повертає null, якщо даних замало (< 2) або в одному з рядів немає варіації
 * (кореляцію не визначити).
 */
export class Correlation {
  public static pearson(xs: number[], ys: number[]): CorrelationOutcome | null {
    const n = Math.min(xs.length, ys.length);
    if (n < 2) return null;

    let sumX = 0;
    let sumY = 0;
    for (let i = 0; i < n; i += 1) {
      sumX += xs[i];
      sumY += ys[i];
    }
    const meanX = sumX / n;
    const meanY = sumY / n;

    let numerator = 0;
    let devX = 0;
    let devY = 0;
    for (let i = 0; i < n; i += 1) {
      const a = xs[i] - meanX;
      const b = ys[i] - meanY;
      numerator += a * b;
      devX += a * a;
      devY += b * b;
    }

    const denominator = Math.sqrt(devX * devY);
    if (denominator === 0) return null;

    return { r: numerator / denominator, n };
  }
}
