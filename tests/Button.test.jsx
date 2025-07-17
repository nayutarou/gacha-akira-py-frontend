import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Button from "../src/components/Button";

describe("Button component", () => {
  it("renders the button with the correct text", () => {
    render(<Button text="テストボタン" />);
    expect(screen.getByRole("button", { name: "テストボタン" })).toBeInTheDocument();
  });

  it("calls the handleClick function when clicked", () => {
    const handleClick = vi.fn();
    render(<Button handleClick={handleClick} text="テストボタン" />);
    const button = screen.getByRole("button", { name: "テストボタン" });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
