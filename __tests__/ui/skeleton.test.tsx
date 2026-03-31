import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Skeleton } from "@/components/ui/skeleton";

describe("Skeleton Component", () => {
  it("renders a skeleton element", () => {
    const { container } = render(<Skeleton />);
    const skeleton = container.querySelector("[data-slot='skeleton']");
    expect(skeleton).toBeInTheDocument();
  });

  it("applies default skeleton classes", () => {
    const { container } = render(<Skeleton />);
    const skeleton = container.querySelector("[data-slot='skeleton']");
    expect(skeleton).toHaveClass("animate-pulse", "rounded-md", "bg-muted");
  });

  it("applies custom className along with default classes", () => {
    const { container } = render(<Skeleton className="h-12 w-12" />);
    const skeleton = container.querySelector("[data-slot='skeleton']");
    expect(skeleton).toHaveClass(
      "animate-pulse",
      "rounded-md",
      "bg-muted",
      "h-12",
      "w-12",
    );
  });

  it("can override default classes with custom ones", () => {
    const { container } = render(<Skeleton className="bg-blue-500" />);
    const skeleton = container.querySelector("[data-slot='skeleton']");
    expect(skeleton).toHaveClass("bg-blue-500");
  });

  it("accepts html div attributes", () => {
    const { container } = render(
      <Skeleton data-testid="custom-skeleton" aria-label="Loading" />,
    );
    const skeleton = container.querySelector("[data-testid='custom-skeleton']");
    expect(skeleton).toHaveAttribute("aria-label", "Loading");
  });

  it("renders as a div element", () => {
    const { container } = render(<Skeleton />);
    const skeleton = container.querySelector("[data-slot='skeleton']");
    expect(skeleton?.tagName).toBe("DIV");
  });

  it("can be used for loading states", () => {
    const { container } = render(
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>,
    );
    const skeletons = container.querySelectorAll("[data-slot='skeleton']");
    expect(skeletons).toHaveLength(3);
  });

  it("maintains animation class with custom styling", () => {
    const { container } = render(
      <Skeleton className="rounded-full h-12 w-12" />,
    );
    const skeleton = container.querySelector("[data-slot='skeleton']");
    expect(skeleton).toHaveClass("animate-pulse");
    expect(skeleton).toHaveClass("rounded-full");
  });

  it("supports all standard div props", () => {
    const { container, rerender } = render(<Skeleton id="skeleton-1" />);
    const skeleton = container.querySelector("#skeleton-1");
    expect(skeleton).toBeInTheDocument();

    rerender(<Skeleton id="skeleton-2" />);
    const updatedSkeleton = container.querySelector("#skeleton-2");
    expect(updatedSkeleton).toBeInTheDocument();
  });
});
