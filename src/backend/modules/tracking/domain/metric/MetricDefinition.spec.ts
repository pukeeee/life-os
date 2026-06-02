import { describe, it, expect } from "vitest";
import { UniqueEntityID } from "@backend/shared/kernel";
import { MetricDefinition } from "./MetricDefinition";
import { MetricKind } from "./MetricKind";

const userId = new UniqueEntityID();

function makeMetric(
  kind: string,
  extra: Partial<Parameters<typeof MetricDefinition.create>[0]> = {},
) {
  return MetricDefinition.create({
    userId,
    name: "Тест",
    kind: MetricKind.create(kind).getValue(),
    ...extra,
  });
}

describe("MetricDefinition — інваріанти створення", () => {
  it("вимагає scaleMin/scaleMax для scale", () => {
    expect(makeMetric("scale").isFailure).toBe(true);
    expect(makeMetric("scale", { scaleMin: 1, scaleMax: 5 }).isSuccess).toBe(true);
  });

  it("вимагає непорожній choiceOptions для choice", () => {
    expect(makeMetric("choice").isFailure).toBe(true);
    expect(makeMetric("choice", { choiceOptions: ["a", "b"] }).isSuccess).toBe(true);
  });

  it("відхиляє порожню назву", () => {
    expect(makeMetric("boolean", { name: "  " }).isFailure).toBe(true);
  });
});

describe("MetricDefinition.interpret — інтерпретація значення за типом", () => {
  it("boolean → 1/0", () => {
    const metric = makeMetric("boolean").getValue();
    expect(metric.interpret({ boolean: true }).getValue().numeric).toBe(1);
    expect(metric.interpret({ boolean: false }).getValue().numeric).toBe(0);
    expect(metric.interpret({}).isFailure).toBe(true);
  });

  it("count → ціле ≥ 0", () => {
    const metric = makeMetric("count").getValue();
    expect(metric.interpret({ number: 5 }).getValue().numeric).toBe(5);
    expect(metric.interpret({ number: -1 }).isFailure).toBe(true);
    expect(metric.interpret({ number: 1.5 }).isFailure).toBe(true);
  });

  it("scale → у межах [min; max]", () => {
    const metric = makeMetric("scale", { scaleMin: 1, scaleMax: 5 }).getValue();
    expect(metric.interpret({ number: 4 }).getValue().numeric).toBe(4);
    expect(metric.interpret({ number: 6 }).isFailure).toBe(true);
    expect(metric.interpret({ number: 0 }).isFailure).toBe(true);
  });

  it("choice → лише з дозволених опцій", () => {
    const metric = makeMetric("choice", { choiceOptions: ["low", "high"] }).getValue();
    expect(metric.interpret({ text: "high" }).getValue().text).toBe("high");
    expect(metric.interpret({ text: "mid" }).isFailure).toBe(true);
  });
});
