import { render, screen, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { GachaProvider, useGacha } from "../src/GachaContext";

// Helper component to access the context values
const TestComponent = () => {
  const { gachaHistory, resultCounts, addGachaResult } = useGacha();
  return (
    <div>
      <div data-testid="history">{JSON.stringify(gachaHistory)}</div>
      <div data-testid="counts">{JSON.stringify(resultCounts)}</div>
      <button onClick={() => addGachaResult({ result: "A" })}>Add A</button>
      <button onClick={() => addGachaResult({ result: "B" })}>Add B</button>
    </div>
  );
};

describe("GachaContext", () => {
  it("provides initial context values", () => {
    render(
      <GachaProvider>
        <TestComponent />
      </GachaProvider>,
    );

    expect(screen.getByTestId("history").textContent).toBe("[]");
    expect(screen.getByTestId("counts").textContent).toBe(
      '{"A":0,"B":0,"C":0,"D":0,"X":0}',
    );
  });

  it("adds gacha result to history and updates counts", () => {
    render(
      <GachaProvider>
        <TestComponent />
      </GachaProvider>,
    );

    const addButtonA = screen.getByText("Add A");
    act(() => {
      addButtonA.click();
    });

    expect(screen.getByTestId("history").textContent).toBe('[{"result":"A"}]');
    expect(screen.getByTestId("counts").textContent).toBe(
      '{"A":1,"B":0,"C":0,"D":0,"X":0}',
    );

    const addButtonB = screen.getByText("Add B");
    act(() => {
      addButtonB.click();
    });

    expect(screen.getByTestId("history").textContent).toBe(
      '[{"result":"B"},{"result":"A"}]',
    );
    expect(screen.getByTestId("counts").textContent).toBe(
      '{"A":1,"B":1,"C":0,"D":0,"X":0}',
    );
  });

  it("adds multiple gacha results of the same type and updates counts", () => {
    render(
      <GachaProvider>
        <TestComponent />
      </GachaProvider>,
    );

    const addButtonA = screen.getByText("Add A");
    act(() => {
      addButtonA.click();
    });
    act(() => {
      addButtonA.click();
    });

    expect(screen.getByTestId("history").textContent).toBe(
      '[{"result":"A"},{"result":"A"}]',
    );
    expect(screen.getByTestId("counts").textContent).toBe(
      '{"A":2,"B":0,"C":0,"D":0,"X":0}',
    );
  });
});
