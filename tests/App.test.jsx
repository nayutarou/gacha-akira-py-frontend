import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { GachaProvider } from "../src/GachaContext";
import App from "../src/app"; // Adjust import path
import HistoryPage from "../src/pages/HistoryPage"; // HistoryPageをインポート
import { mockTenPullResults } from "./test-data";

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

  const renderApp = (initialEntries = ["/"]) => {
    render(
      <MemoryRouter initialEntries={initialEntries}>
        <GachaProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </GachaProvider>
      </MemoryRouter>
    );
  };

  it("renders the initial state correctly", () => {
    renderApp();
    expect(screen.getByRole("heading", { level: 1, name: "ガチャを引きましょう" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "ガチャを引く" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "10連ガチャを引く" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "履歴を見る" })).toBeInTheDocument();
    expect(screen.getByText("まだガチャが実行されていません。")).toBeInTheDocument();
  });

  // Test cases for different gacha results based on backend probabilities
  it.each([["A", "SSR"], ["B", "SR"], ["C", "R"], ["D", "N"]])("fetches gacha result %s and updates the display", async (gachaResult) => {
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
      expect(screen.getByText(`${gachaResult}: 100.00% (1回)`)).toBeInTheDocument();
    });

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith("http://127.0.0.1:8000/gacha");
  });

  it("fetches 10 gacha results and updates the display", async () => {
    const mockGachaResults = mockTenPullResults;
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

      expect(screen.getByText("A: 30.00% (3回)")).toBeInTheDocument();
      expect(screen.getByText("B: 30.00% (3回)")).toBeInTheDocument();
      expect(screen.getByText("C: 20.00% (2回)")).toBeInTheDocument();
      expect(screen.getByText("D: 20.00% (2回)")).toBeInTheDocument();
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

  it("displays single gacha result in Result component and updates GachaCounts", async () => {
    const mockGachaResult = { result: "A" };
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => mockGachaResult,
    });

    renderApp();

    const button = screen.getByRole("button", { name: "ガチャを引く" });
    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("A")).toBeInTheDocument(); // Result component
      expect(screen.getByText("A: 100.00% (1回)")).toBeInTheDocument(); // GachaCounts component
    });
  });

  it("displays 10-pull gacha results in TenPullDisplay and updates GachaCounts", async () => {
    mockTenPullResults.forEach((mockResult) => {
      fetchSpy.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResult,
      });
    });

    renderApp();

    const button = screen.getByRole("button", { name: "10連ガチャを引く" });
    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getAllByText(/^[ABCD]$/).length).toBe(10); // TenPullDisplay component
      expect(screen.getByText("A: 30.00% (3回)")).toBeInTheDocument(); // GachaCounts component
    });
  });

  it("navigates to history page", async () => {
    renderApp();

    const historyLink = screen.getByRole("link", { name: "履歴を見る" });
    await userEvent.click(historyLink);

    await waitFor(() => {
      expect(screen.getByRole("heading", { level: 1, name: "ガチャ履歴" })).toBeInTheDocument();
    });
  });
});
