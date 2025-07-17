import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import GachaCounts from "../src/components/GachaCounts";

describe("GachaCounts component", () => {
  it("renders correctly with initial zero counts", () => {
    const initialCounts = {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
    };
    render(<GachaCounts resultCounts={initialCounts} />);

    expect(screen.getByText("A: 0回")).toBeInTheDocument();
    expect(screen.getByText("B: 0回")).toBeInTheDocument();
    expect(screen.getByText("C: 0回")).toBeInTheDocument();
    expect(screen.getByText("D: 0回")).toBeInTheDocument();
  });

  it("renders correctly with updated counts", () => {
    const updatedCounts = {
      A: 5,
      B: 3,
      C: 10,
      D: 2,
    };
    render(<GachaCounts resultCounts={updatedCounts} />);

    expect(screen.getByText("A: 5回")).toBeInTheDocument();
    expect(screen.getByText("B: 3回")).toBeInTheDocument();
    expect(screen.getByText("C: 10回")).toBeInTheDocument();
    expect(screen.getByText("D: 2回")).toBeInTheDocument();
  });

  it("renders correctly with some zero and some non-zero counts", () => {
    const mixedCounts = {
      A: 1,
      B: 0,
      C: 2,
      D: 0,
    };
    render(<GachaCounts resultCounts={mixedCounts} />);

    expect(screen.getByText("A: 1回")).toBeInTheDocument();
    expect(screen.getByText("B: 0回")).toBeInTheDocument();
    expect(screen.getByText("C: 2回")).toBeInTheDocument();
    expect(screen.getByText("D: 0回")).toBeInTheDocument();
  });
});
