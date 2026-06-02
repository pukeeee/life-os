import { describe, it, expect } from "vitest";
import { StreakCalculator } from "./StreakCalculator";

describe("StreakCalculator", () => {
  it("порожній вхід → нулі", () => {
    expect(StreakCalculator.compute([])).toEqual({
      current: 0,
      longest: 0,
      lastCompletedDate: null,
    });
  });

  it("рахує трейлінгову та найдовшу серії", () => {
    // дві серії: 3 дні (01-03) і 2 дні (06-07)
    const res = StreakCalculator.compute([
      "2026-06-01",
      "2026-06-02",
      "2026-06-03",
      "2026-06-06",
      "2026-06-07",
    ]);
    expect(res.longest).toBe(3);
    expect(res.current).toBe(2);
    expect(res.lastCompletedDate).toBe("2026-06-07");
  });

  it("дедуплікує та сортує вхід", () => {
    const res = StreakCalculator.compute(["2026-06-02", "2026-06-01", "2026-06-02"]);
    expect(res.longest).toBe(2);
    expect(res.current).toBe(2);
  });

  it("розрив скидає поточну серію", () => {
    const res = StreakCalculator.compute(["2026-06-01", "2026-06-05"]);
    expect(res.longest).toBe(1);
    expect(res.current).toBe(1);
    expect(res.lastCompletedDate).toBe("2026-06-05");
  });
});
