import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Expenses } from "@/app/(features)/containers/expenses";

describe("Expenses Component", () => {
  it("renders without crashing", () => {
    render(<Expenses />);
    expect(screen.getByText("Expenses")).toBeInTheDocument();
  });

  it("displays correct text content", () => {
    render(<Expenses />);
    const element = screen.getByText("Expenses");
    expect(element).toBeInTheDocument();
  });

  it("has the correct structure", () => {
    const { container } = render(<Expenses />);
    const div = container.querySelector("div");
    expect(div).toBeInTheDocument();
    expect(div?.textContent).toBe("Expenses");
  });
});
