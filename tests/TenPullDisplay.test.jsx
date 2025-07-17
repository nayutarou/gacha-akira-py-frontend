import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TenPullDisplay from "../src/components/TenPullDisplay";

describe("TenPullDisplay component", () => {
  it("renders 10 Result components with correct data", () => {
    const mockResults = [
      { result: "A" }, { result: "B" }, { result: "C" }, { result: "D" },
      { result: "A" }, { result: "B" }, { result: "C" }, { result: "D" },
      { result: "A" }, { result: "B" },
    ];

    render(<TenPullDisplay results={mockResults} />);

    // Check if 10 Result components are rendered
    const resultContainers = screen.getAllByTestId("result-container");
    expect(resultContainers).toHaveLength(10);

    // Check if each result's text and rarity text are displayed
    mockResults.forEach((mockResult, index) => {
      const currentResultContainer = resultContainers[index];
      expect(within(currentResultContainer).getByRole("heading", { level: 1 })).toHaveTextContent(mockResult.result);
    });
  });

  it("renders correctly with different results", () => {
    const mockResults = [
      { result: "A" }, { result: "A" }, { result: "A" }, { result: "A" }, { result: "A" },
      { result: "B" }, { result: "B" }, { result: "B" }, { result: "B" }, { result: "B" },
    ];

    render(<TenPullDisplay results={mockResults} />);

    const resultHeadings = screen.getAllByRole("heading", { level: 1 });
    expect(resultHeadings).toHaveLength(10);

    expect(screen.getAllByText("A")).toHaveLength(5);
    expect(screen.getAllByText("B")).toHaveLength(5);
  });
});
