import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import App from "../src/app"; // Adjust import path

// Mock the Firework component to check its props
vi.mock("../src/components/Firework", () => ({
  default: vi.fn(({ color }) => <div data-testid="mock-firework" style={{ backgroundColor: color }}></div>),
}));

const getResultColor = (resultValue) => {
  switch (resultValue) {
    case "A":
      return "#ff00ff";
    case "B":
      return "#ffd700";
    case "C":
      return "#ff0000";
    case "D":
      return "#0000ff";
    default:
      return "#ffffff";
  }
};

describe("App component", () => {
  let fetchSpy;

  beforeEach(() => {
    fetchSpy = vi.spyOn(global, "fetch");
    fetchSpy.mockClear();
  });

  afterEach(() => {
    fetchSpy.mockRestore();
  });

  it("renders the initial state correctly", () => {
    render(<App />);
    expect(screen.getByText("X")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /ガチャを引く/i })).toBeInTheDocument();
  });

  // Test cases for different gacha results based on backend probabilities
  it.each([["A"], ["B"], ["C"], ["D"]])("fetches gacha result %s and updates the display", async (gachaResult) => {
    const mockGachaResult = { result: gachaResult };
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => mockGachaResult,
    });

    render(<App />);

    const button = screen.getByRole("button", { name: /ガチャを引く/i });
    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(gachaResult)).toBeInTheDocument();
      // Check if Firework component was rendered with the correct color
      expect(screen.getByTestId("mock-firework")).toHaveStyle(`background-color: ${getResultColor(gachaResult)}`);
    });

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith("http://localhost:8000/gacha");
  });

  it("handles fetch error gracefully", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    fetchSpy.mockImplementationOnce(() => Promise.reject(new Error("Network error")));

    render(<App />);

    const button = screen.getByRole("button", { name: /ガチャを引く/i });
    await userEvent.click(button);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Failed to fetch gacha result:",
        expect.any(Error),
      );
    });

    // The result should not change from the initial state
    expect(screen.getByText("X")).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });
});
