import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { GachaProvider } from "../src/GachaContext";
import App from "../src/app"; // Adjust import path

describe("App component", () => {
  let fetchSpy;

  beforeEach(() => {
    fetchSpy = vi.spyOn(global, "fetch");
    fetchSpy.mockClear();
    vi.clearAllMocks(); // Clear mocks before each test
  });

  afterEach(() => {
    fetchSpy.mockRestore();
  });

  const renderApp = () => {
    render(
      <BrowserRouter>
        <GachaProvider>
          <App />
        </GachaProvider>
      </BrowserRouter>,
    );
  };

  it("renders the initial state correctly", () => {
    renderApp();
    expect(screen.getByRole("heading", { level: 1, name: "ガチャを引きましょう" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "ガチャを引く" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "10連ガチャを引く" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "履歴を見る" })).toBeInTheDocument();
    expect(screen.getByText("A: 0回")).toBeInTheDocument();
    expect(screen.getByText("B: 0回")).toBeInTheDocument();
    expect(screen.getByText("C: 0回")).toBeInTheDocument();
    expect(screen.getByText("D: 0回")).toBeInTheDocument();
  });

  // Test cases for different gacha results based on backend probabilities
  it.each([["A", "SSR"], ["B", "SR"], ["C", "R"], ["D", "N"]])("fetches gacha result %s and updates the display", async (gachaResult, rarityText) => {
    const mockGachaResult = { result: gachaResult };
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => mockGachaResult,
    });

    renderApp();

    const button = screen.getByRole("button", { name: "ガチャを引く" });
    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByRole("heading", { level: 1, name: gachaResult })).toBeInTheDocument();
      expect(screen.getByText(`${gachaResult}: 1回`)).toBeInTheDocument();
    });

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith("http://127.0.0.1:8000/gacha");
  });

  it("fetches 10 gacha results and updates the display", async () => {
    const mockGachaResults = [
      { result: "A" }, { result: "B" }, { result: "C" }, { result: "D" }, { result: "X" },
      { result: "A" }, { result: "B" }, { result: "C" }, { result: "D" }, { result: "X" },
    ];
    mockGachaResults.forEach((mockResult) => {
      fetchSpy.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResult,
      });
    });

    renderApp();

    const button = screen.getByRole("button", { name: "10連ガチャを引く" });
    await userEvent.click(button);

    await waitFor(() => {
      // Check if 10 results are displayed
      const resultHeadings = screen.getAllByRole("heading", { level: 1 });
      expect(resultHeadings).toHaveLength(10);

      // Check if each result is displayed correctly
      mockGachaResults.forEach((mockResult) => {
        expect(screen.getAllByText(mockResult.result).length).toBeGreaterThanOrEqual(1);
      });

      expect(screen.getByText("A: 2回")).toBeInTheDocument();
      expect(screen.getByText("B: 2回")).toBeInTheDocument();
      expect(screen.getByText("C: 2回")).toBeInTheDocument();
      expect(screen.getByText("D: 2回")).toBeInTheDocument();
    });

    expect(fetchSpy).toHaveBeenCalledTimes(10);
    expect(fetchSpy).toHaveBeenCalledWith("http://127.0.0.1:8000/gacha");
  });

  it("handles fetch error gracefully", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    fetchSpy.mockImplementationOnce(() => Promise.reject(new Error("Network error")));

    renderApp();

    const button = screen.getByRole("button", { name: "ガチャを引く" });
    await userEvent.click(button);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Failed to fetch gacha result:",
        expect.any(Error),
      );
    });

    // The result should not change from the initial state
    expect(screen.getByRole("heading", { level: 1, name: "ガチャを引きましょう" })).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });
});
