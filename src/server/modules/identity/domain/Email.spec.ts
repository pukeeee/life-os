import { describe, it, expect } from "vitest";
import { Email } from "./Email";

describe("Email", () => {
  it("нормалізує (trim + lowercase) і приймає валідний email", () => {
    const result = Email.create("  Foo@Bar.com ");
    expect(result.isSuccess).toBe(true);
    expect(result.getValue().value).toBe("foo@bar.com");
  });

  it("відхиляє невалідний формат", () => {
    expect(Email.create("not-an-email").isFailure).toBe(true);
    expect(Email.create("a@b").isFailure).toBe(true);
    expect(Email.create("").isFailure).toBe(true);
  });

  it("вважає два однакові email рівними (value object)", () => {
    const a = Email.create("user@example.com").getValue();
    const b = Email.create("USER@example.com").getValue();
    expect(a.equals(b)).toBe(true);
  });
});
