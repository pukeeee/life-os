import { describe, it, expect } from "vitest";
import { MovingAverage } from "./MovingAverage";
import { Correlation } from "./Correlation";

describe("MovingAverage.sma", () => {
  it("повертає null доки бракує вікна, потім середні", () => {
    expect(MovingAverage.sma([1, 2, 3, 4], 2)).toEqual([null, 1.5, 2.5, 3.5]);
  });
});

describe("MovingAverage.ema", () => {
  it("перша точка = значення, далі згладжує", () => {
    const out = MovingAverage.ema([2, 4], 0.5);
    expect(out[0]).toBe(2);
    expect(out[1]).toBe(3); // 0.5*4 + 0.5*2
  });
});

describe("Correlation.pearson", () => {
  it("ідеальна позитивна кореляція = 1", () => {
    const res = Correlation.pearson([1, 2, 3], [2, 4, 6]);
    expect(res?.r).toBeCloseTo(1, 5);
    expect(res?.n).toBe(3);
  });

  it("ідеальна негативна кореляція = -1", () => {
    expect(Correlation.pearson([1, 2, 3], [6, 4, 2])?.r).toBeCloseTo(-1, 5);
  });

  it("null коли замало даних або немає варіації", () => {
    expect(Correlation.pearson([1], [1])).toBeNull();
    expect(Correlation.pearson([5, 5, 5], [1, 2, 3])).toBeNull();
  });
});
