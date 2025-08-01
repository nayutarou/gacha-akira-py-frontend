import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import GachaHistory from "../src/components/GachaHistory";

describe("GachaHistory component", () => {
  it("renders 'まだ履歴はありません。' when history is empty", () => {
    render(<GachaHistory history={[]} />);
    expect(screen.getByText("まだ履歴はありません。")).toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("renders history items correctly when history is not empty", () => {
    const mockHistory = [
      { result: "A", timestamp: "2023-01-01T10:00:00Z" },
      { result: "B", timestamp: "2023-01-01T09:59:00Z" },
      { result: "C", timestamp: "2023-01-01T09:58:00Z" },
    ];
    render(<GachaHistory history={mockHistory} />);

    expect(screen.queryByText("まだ履歴はありません。")).not.toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getByText("3回目: A")).toBeInTheDocument();
    expect(screen.getByText("2回目: B")).toBeInTheDocument();
    expect(screen.getByText("1回目: C")).toBeInTheDocument();
  });

  it("renders multiple items of the same result correctly", () => {
    const mockHistory = [
      { result: "A", timestamp: "2023-01-01T10:00:00Z" },
      { result: "A", timestamp: "2023-01-01T09:59:00Z" },
      { result: "B", timestamp: "2023-01-01T09:58:00Z" },
    ];
    render(<GachaHistory history={mockHistory} />);

    const aResults = screen.getAllByText(/\d+回目: A/);
    expect(aResults).toHaveLength(2);
    expect(screen.getByText(/\d+回目: B/)).toBeInTheDocument();
  });
});
