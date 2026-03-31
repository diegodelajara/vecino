import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";

// Mock radix-ui
vi.mock("radix-ui", () => ({
  Tooltip: {
    Provider: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div data-testid="tooltip-provider" {...props}>
        {children}
      </div>
    ),
    Root: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div data-testid="tooltip" {...props}>
        {children}
      </div>
    ),
    Trigger: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <button data-testid="tooltip-trigger" {...props}>
        {children}
      </button>
    ),
    Content: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div data-testid="tooltip-content" {...props}>
        {children}
      </div>
    ),
    Portal: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div data-testid="tooltip-portal" {...props}>
        {children}
      </div>
    ),
    Arrow: ({ ...props }: Record<string, unknown>) => (
      <div data-testid="tooltip-arrow" {...props} />
    ),
  },
}));

import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

describe("Tooltip Components", () => {
  describe("TooltipProvider", () => {
    it("renders a tooltip provider", () => {
      render(
        <TooltipProvider>
          <div>Content</div>
        </TooltipProvider>,
      );
      expect(screen.getByTestId("tooltip-provider")).toBeInTheDocument();
    });

    it("has default delay duration of 0", () => {
      render(
        <TooltipProvider>
          <div>Content</div>
        </TooltipProvider>,
      );
      expect(screen.getByTestId("tooltip-provider")).toHaveAttribute(
        "delayDuration",
        "0",
      );
    });

    it("allows custom delay duration", () => {
      render(
        <TooltipProvider delayDuration={200}>
          <div>Content</div>
        </TooltipProvider>,
      );
      expect(screen.getByTestId("tooltip-provider")).toHaveAttribute(
        "delayDuration",
        "200",
      );
    });

    it("has data-slot attribute", () => {
      render(
        <TooltipProvider>
          <div>Content</div>
        </TooltipProvider>,
      );
      expect(screen.getByTestId("tooltip-provider")).toHaveAttribute(
        "data-slot",
        "tooltip-provider",
      );
    });

    it("renders children", () => {
      render(
        <TooltipProvider>
          <span>Child Content</span>
        </TooltipProvider>,
      );
      expect(screen.getByText("Child Content")).toBeInTheDocument();
    });
  });

  describe("Tooltip", () => {
    it("renders a tooltip root element", () => {
      render(<Tooltip />);
      expect(screen.getByTestId("tooltip")).toBeInTheDocument();
    });

    it("has data-slot attribute", () => {
      render(<Tooltip />);
      expect(screen.getByTestId("tooltip")).toHaveAttribute(
        "data-slot",
        "tooltip",
      );
    });

    it("renders children", () => {
      render(
        <Tooltip>
          <div>Tooltip Content</div>
        </Tooltip>,
      );
      expect(screen.getByText("Tooltip Content")).toBeInTheDocument();
    });
  });

  describe("TooltipTrigger", () => {
    it("renders a trigger button", () => {
      render(<TooltipTrigger>Hover me</TooltipTrigger>);
      expect(screen.getByTestId("tooltip-trigger")).toBeInTheDocument();
      expect(screen.getByText("Hover me")).toBeInTheDocument();
    });

    it("has data-slot attribute", () => {
      render(<TooltipTrigger />);
      expect(screen.getByTestId("tooltip-trigger")).toHaveAttribute(
        "data-slot",
        "tooltip-trigger",
      );
    });

    it("is a button element", () => {
      render(<TooltipTrigger />);
      expect(screen.getByTestId("tooltip-trigger").tagName).toBe("BUTTON");
    });
  });

  describe("TooltipContent", () => {
    it("renders tooltip content in a portal", () => {
      render(<TooltipContent>Tooltip Text</TooltipContent>);
      expect(screen.getByTestId("tooltip-portal")).toBeInTheDocument();
      expect(screen.getByTestId("tooltip-content")).toBeInTheDocument();
      expect(screen.getByText("Tooltip Text")).toBeInTheDocument();
    });

    it("has data-slot attribute", () => {
      render(<TooltipContent />);
      expect(screen.getByTestId("tooltip-content")).toHaveAttribute(
        "data-slot",
        "tooltip-content",
      );
    });

    it("has default side offset of 0", () => {
      render(<TooltipContent />);
      expect(screen.getByTestId("tooltip-content")).toHaveAttribute(
        "sideOffset",
        "0",
      );
    });

    it("allows custom side offset", () => {
      render(<TooltipContent sideOffset={8} />);
      expect(screen.getByTestId("tooltip-content")).toHaveAttribute(
        "sideOffset",
        "8",
      );
    });

    it("applies custom className", () => {
      render(<TooltipContent className="custom-tooltip" />);
      expect(screen.getByTestId("tooltip-content")).toHaveClass(
        "custom-tooltip",
      );
    });

    it("renders with default styling classes", () => {
      render(<TooltipContent />);
      const content = screen.getByTestId("tooltip-content");
      expect(content.className).toContain("z-50");
      expect(content.className).toContain("rounded-md");
    });

    it("renders arrow element", () => {
      render(<TooltipContent />);
      expect(screen.getByTestId("tooltip-arrow")).toBeInTheDocument();
    });

    it("renders children", () => {
      render(<TooltipContent>Help Text</TooltipContent>);
      expect(screen.getByText("Help Text")).toBeInTheDocument();
    });
  });

  describe("Tooltip Integration", () => {
    it("renders complete tooltip structure", () => {
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>Icon</TooltipTrigger>
            <TooltipContent>Help text for icon</TooltipContent>
          </Tooltip>
        </TooltipProvider>,
      );

      expect(screen.getByTestId("tooltip-provider")).toBeInTheDocument();
      expect(screen.getByTestId("tooltip")).toBeInTheDocument();
      expect(screen.getByTestId("tooltip-trigger")).toBeInTheDocument();
      expect(screen.getByTestId("tooltip-portal")).toBeInTheDocument();
      expect(screen.getByTestId("tooltip-content")).toBeInTheDocument();
      expect(screen.getByText("Help text for icon")).toBeInTheDocument();
    });

    it("works with multiple tooltips", () => {
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>Help 1</TooltipTrigger>
            <TooltipContent>Tooltip 1</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>Help 2</TooltipTrigger>
            <TooltipContent>Tooltip 2</TooltipContent>
          </Tooltip>
        </TooltipProvider>,
      );

      expect(screen.getByText("Help 1")).toBeInTheDocument();
      expect(screen.getByText("Help 2")).toBeInTheDocument();
      expect(screen.getByText("Tooltip 1")).toBeInTheDocument();
      expect(screen.getByText("Tooltip 2")).toBeInTheDocument();
    });
  });
});
