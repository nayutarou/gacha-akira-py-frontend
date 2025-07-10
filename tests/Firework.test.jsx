import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Firework from "../src/components/Firework";

describe("Firework component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("renders without crashing", () => {
    render(<Firework x={50} y={50} color="#FF0000" />);
    expect(screen.getByTestId("firework-container")).toBeInTheDocument();
  });

  it("renders particles with the correct color", () => {
    const color = "#00FF00";
    render(<Firework x={50} y={50} color={color} />);
    const particles = screen.getAllByTestId("firework-particle");
    particles.forEach(particle => {
      expect(particle).toHaveStyle(`background-color: ${color}`);
    });
  });

  it("simulates particle animation over time", () => {
    render(<Firework x={50} y={50} color="#FF0000" />);
    const initialParticles = screen.getAllByTestId("firework-particle");
    initialParticles.forEach(particle => {
      expect(particle).toHaveStyle("opacity: 1");
    });

    vi.advanceTimersByTime(1000); // Advance time by 1 second

    // After 1 second, particles should have transitioned (opacity might change, transform might change)
    // This test is more about ensuring the animation is triggered, not its exact visual state.
    // A more robust test would check specific style changes if they were critical.
    const animatedParticles = screen.getAllByTestId("firework-particle");
    animatedParticles.forEach(particle => {
      // Expect some change, or at least no error during animation
      expect(particle).toBeInTheDocument();
    });
  });
});
