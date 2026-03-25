import { describe, it, expect } from "vitest";

describe("Sample Test", () => {
  it("should pass basic test", () => {
    expect(1 + 1).toBe(2);
  });

  it("should validate string operations", () => {
    const greeting = "Hello, Vitest!";
    expect(greeting).toContain("Vitest");
  });
});
