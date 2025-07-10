import { describe, it, expect } from "vitest";
import resultColor from "../src/libs/resultColor";

describe("resultColor", () => {
  it("returns the correct color for A", () => {
    expect(resultColor("A")).toBe("#ff00ff");
  });

  it("returns the correct color for B", () => {
    expect(resultColor("B")).toBe("#ffd700");
  });

  it("returns the correct color for C", () => {
    expect(resultColor("C")).toBe("#ff0000");
  });

  it("returns the correct color for D", () => {
    expect(resultColor("D")).toBe("#0000ff");
  });

  it("returns white for unknown results", () => {
    expect(resultColor("X")).toBe("#ffffff");
    expect(resultColor("Z")).toBe("#ffffff");
    expect(resultColor(null)).toBe("#ffffff");
    expect(resultColor(undefined)).toBe("#ffffff");
  });
});
