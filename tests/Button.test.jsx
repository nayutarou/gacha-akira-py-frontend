import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Button from "../src/components/Button";

describe("Button component", () => {
  it("renders the button with the correct text", () => {
    render(<Button />);
    expect(screen.getByRole("button", { name: /ガチャを引く/i })).toBeInTheDocument();
  });

  it("calls the handleClick function when clicked", () => {
    const handleClick = vi.fn();
    render(<Button handleClick={handleClick} />);
    const button = screen.getByRole("button", { name: /ガチャを引く/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
