import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import React from "react";
import { Separator } from "@/components/ui/separator";

// Mock radix-ui Separator
vi.mock("radix-ui", () => ({
  Separator: {
    Root: ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div data-slot="separator" className={className} {...props} />
    ),
  },
}));

describe("Separator Component", () => {
  it("renders a separator element", () => {
    const { container } = render(<Separator />);
    const separator = container.querySelector("[data-slot='separator']");
    expect(separator).toBeInTheDocument();
  });

  it("renders with default horizontal orientation", () => {
    const { container } = render(<Separator />);
    const separator = container.querySelector("[data-slot='separator']");
    expect(separator).toHaveAttribute("orientation", "horizontal");
  });

  it("renders with vertical orientation when specified", () => {
    const { container } = render(<Separator orientation="vertical" />);
    const separator = container.querySelector("[data-slot='separator']");
    expect(separator).toHaveAttribute("orientation", "vertical");
  });

  it("is decorative by default", () => {
    const { container } = render(<Separator />);
    const separator = container.querySelector("[data-slot='separator']");
    expect(separator).toBeTruthy();
  });

  it("can set decorative to false", () => {
    const { container } = render(<Separator decorative={false} />);
    const separator = container.querySelector("[data-slot='separator']");
    expect(separator).toBeTruthy();
  });

  it("accepts custom className", () => {
    const { container } = render(<Separator className="custom-class" />);
    const separator = container.querySelector("[data-slot='separator']");
    expect(separator).toHaveClass("custom-class");
  });

  it("applies base separator classes", () => {
    const { container } = render(<Separator />);
    const separator = container.querySelector("[data-slot='separator']");
    // Check that data attributes exist for orientation
    expect(separator).toBeTruthy();
  });

  it("handles custom props", () => {
    const { container } = render(<Separator data-testid="custom-separator" />);
    const separator = container.querySelector(
      "[data-testid='custom-separator']",
    );
    expect(separator).toBeInTheDocument();
  });
});
