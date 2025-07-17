import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TenPullDisplay from "../src/components/TenPullDisplay";

describe("TenPullDisplay component", () => {
  const rarityTexts = {
    A: "SSR",
    B: "SR",
    C: "R",
    D: "N",
    X: "ハズレ",
  };

  it("renders 10 Result components with correct data", () => {
    const mockResults = [
      { result: "A" }, { result: "B" }, { result: "C" }, { result: "D" }, { result: "X" },
      { result: "A" }, { result: "B" }, { result: "C" }, { result: "D" }, { result: "X" },
    ];

    render(<TenPullDisplay results={mockResults} rarityTexts={rarityTexts} />);

    // Check if 10 Result components are rendered
    const resultContainers = screen.getAllByTestId("result-container");
    expect(resultContainers).toHaveLength(10);

    // Check if each result's text and rarity text are displayed
    mockResults.forEach((mockResult, index) => {
      const currentResultContainer = resultContainers[index];
      expect(within(currentResultContainer).getByRole("heading", { level: 1 })).toHaveTextContent(mockResult.result);
      expect(within(currentResultContainer).getByText(rarityTexts[mockResult.result])).toBeInTheDocument();
    });
  });

  it("renders correctly with different results", () => {
    const mockResults = [
      { result: "A" }, { result: "A" }, { result: "A" }, { result: "A" }, { result: "A" },
      { result: "B" }, { result: "B" }, { result: "B" }, { result: "B" }, { result: "B" },
    ];

    render(<TenPullDisplay results={mockResults} rarityTexts={rarityTexts} />);

    const resultHeadings = screen.getAllByRole("heading", { level: 1 });
    expect(resultHeadings).toHaveLength(10);

    expect(screen.getAllByText("A")).toHaveLength(5);
    expect(screen.getAllByText("B")).toHaveLength(5);
  });
});
