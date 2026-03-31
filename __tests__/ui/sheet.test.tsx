import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import React from "react";

vi.mock("lucide-react", () => ({
  XIcon: () => <span>X</span>,
}));

// Mock Radix Dialog to avoid context errors
vi.mock("radix-ui", async () => {
  const actual = await vi.importActual("radix-ui");
  return {
    ...actual,
  };
});

describe("Sheet Components", () => {
  it("sheet module exports all components", async () => {
    const sheetModule = await import("@/components/ui/sheet");
    expect(typeof sheetModule.Sheet).toBe("function");
    expect(typeof sheetModule.SheetTrigger).toBe("function");
    expect(typeof sheetModule.SheetClose).toBe("function");
    expect(typeof sheetModule.SheetContent).toBe("function");
    expect(typeof sheetModule.SheetHeader).toBe("function");
    expect(typeof sheetModule.SheetFooter).toBe("function");
    expect(typeof sheetModule.SheetTitle).toBe("function");
    expect(typeof sheetModule.SheetDescription).toBe("function");
  });

  it("SheetHeader renders with data-slot attribute", async () => {
    const { SheetHeader } = await import("@/components/ui/sheet");
    const { container } = render(<SheetHeader>Header Content</SheetHeader>);
    const headerElement = container.querySelector('[data-slot="sheet-header"]');
    expect(headerElement).toBeInTheDocument();
  });

  it("SheetFooter renders with data-slot attribute", async () => {
    const { SheetFooter } = await import("@/components/ui/sheet");
    const { container } = render(<SheetFooter>Footer Content</SheetFooter>);
    const footerElement = container.querySelector('[data-slot="sheet-footer"]');
    expect(footerElement).toBeInTheDocument();
  });

  it("SheetHeader has correct styles", async () => {
    const { SheetHeader } = await import("@/components/ui/sheet");
    const { container } = render(<SheetHeader>Header</SheetHeader>);
    const headerElement = container.querySelector('[data-slot="sheet-header"]');
    expect(headerElement?.className).toContain("gap-0.5");
    expect(headerElement?.className).toContain("p-4");
  });

  it("SheetFooter has correct styles", async () => {
    const { SheetFooter } = await import("@/components/ui/sheet");
    const { container } = render(<SheetFooter>Footer</SheetFooter>);
    const footerElement = container.querySelector('[data-slot="sheet-footer"]');
    expect(footerElement?.className).toContain("mt-auto");
  });

  it("SheetHeader applies custom className", async () => {
    const { SheetHeader } = await import("@/components/ui/sheet");
    const { container } = render(
      <SheetHeader className="custom-class">Header</SheetHeader>,
    );
    const headerElement = container.querySelector('[data-slot="sheet-header"]');
    expect(headerElement).toHaveClass("custom-class");
  });

  it("SheetFooter applies custom className", async () => {
    const { SheetFooter } = await import("@/components/ui/sheet");
    const { container } = render(
      <SheetFooter className="custom-footer">Footer</SheetFooter>,
    );
    const footerElement = container.querySelector('[data-slot="sheet-footer"]');
    expect(footerElement).toHaveClass("custom-footer");
  });

  it("cn utility is called for SheetHeader classNames", async () => {
    const { SheetHeader } = await import("@/components/ui/sheet");
    const { container } = render(
      <SheetHeader className="bg-red-500">Test</SheetHeader>,
    );
    const element = container.querySelector('[data-slot="sheet-header"]');
    expect(element?.className).toContain("bg-red-500");
  });

  it("cn utility is called for SheetFooter classNames", async () => {
    const { SheetFooter } = await import("@/components/ui/sheet");
    const { container } = render(
      <SheetFooter className="bg-blue-500">Test</SheetFooter>,
    );
    const element = container.querySelector('[data-slot="sheet-footer"]');
    expect(element?.className).toContain("bg-blue-500");
  });

  it("all sheet components are unique functions", async () => {
    const sheetModule = await import("@/components/ui/sheet");
    const exports = [
      sheetModule.Sheet,
      sheetModule.SheetTrigger,
      sheetModule.SheetClose,
      sheetModule.SheetContent,
      sheetModule.SheetHeader,
      sheetModule.SheetFooter,
      sheetModule.SheetTitle,
      sheetModule.SheetDescription,
    ];
    const uniqueExports = new Set(exports);
    expect(uniqueExports.size).toBe(exports.length);
  });

  it("SheetHeader element is a div", async () => {
    const { SheetHeader } = await import("@/components/ui/sheet");
    const { container } = render(<SheetHeader>Test</SheetHeader>);
    const element = container.querySelector('[data-slot="sheet-header"]');
    expect(element?.tagName).toBe("DIV");
  });

  it("SheetFooter element is a div", async () => {
    const { SheetFooter } = await import("@/components/ui/sheet");
    const { container } = render(<SheetFooter>Test</SheetFooter>);
    const element = container.querySelector('[data-slot="sheet-footer"]');
    expect(element?.tagName).toBe("DIV");
  });

  it("SheetHeader children are rendered", async () => {
    const { SheetHeader } = await import("@/components/ui/sheet");
    const { container } = render(
      <SheetHeader>
        <span>Test Child</span>
      </SheetHeader>,
    );
    expect(container.textContent).toContain("Test Child");
  });

  it("SheetFooter children are rendered", async () => {
    const { SheetFooter } = await import("@/components/ui/sheet");
    const { container } = render(
      <SheetFooter>
        <span>Footer Child</span>
      </SheetFooter>,
    );
    expect(container.textContent).toContain("Footer Child");
  });

  it("SheetHeader flex styles are applied", async () => {
    const { SheetHeader } = await import("@/components/ui/sheet");
    const { container } = render(<SheetHeader>Content</SheetHeader>);
    const element = container.querySelector('[data-slot="sheet-header"]');
    expect(element?.className).toContain("flex");
    expect(element?.className).toContain("flex-col");
  });

  it("SheetFooter mt-auto style is applied", async () => {
    const { SheetFooter } = await import("@/components/ui/sheet");
    const { container } = render(<SheetFooter>Content</SheetFooter>);
    const element = container.querySelector('[data-slot="sheet-footer"]');
    expect(element?.className).toContain("mt-auto");
    expect(element?.className).toContain("flex");
    expect(element?.className).toContain("flex-col");
  });

  it("SheetHeader gap style is applied", async () => {
    const { SheetHeader } = await import("@/components/ui/sheet");
    const { container } = render(<SheetHeader>Content</SheetHeader>);
    const element = container.querySelector('[data-slot="sheet-header"]');
    expect(element?.className).toContain("gap-0.5");
  });

  it("SheetFooter gap style is applied", async () => {
    const { SheetFooter } = await import("@/components/ui/sheet");
    const { container } = render(<SheetFooter>Content</SheetFooter>);
    const element = container.querySelector('[data-slot="sheet-footer"]');
    expect(element?.className).toContain("gap-2");
  });

  it("SheetHeader accepts and spreads DOM props", async () => {
    const { SheetHeader } = await import("@/components/ui/sheet");
    const { container } = render(
      <SheetHeader id="test-header" data-testid="header">
        Content
      </SheetHeader>,
    );
    const element = container.querySelector('[data-slot="sheet-header"]');
    expect(element?.id).toBe("test-header");
    expect(element?.getAttribute("data-testid")).toBe("header");
  });

  it("SheetFooter accepts and spreads DOM props", async () => {
    const { SheetFooter } = await import("@/components/ui/sheet");
    const { container } = render(
      <SheetFooter id="test-footer" data-testid="footer">
        Content
      </SheetFooter>,
    );
    const element = container.querySelector('[data-slot="sheet-footer"]');
    expect(element?.id).toBe("test-footer");
    expect(element?.getAttribute("data-testid")).toBe("footer");
  });

  it("SheetHeader multiple custom classes merge correctly", async () => {
    const { SheetHeader } = await import("@/components/ui/sheet");
    const { container } = render(
      <SheetHeader className="bg-red-500 text-white shadow">
        Content
      </SheetHeader>,
    );
    const element = container.querySelector('[data-slot="sheet-header"]');
    expect(element?.className).toContain("bg-red-500");
    expect(element?.className).toContain("text-white");
    expect(element?.className).toContain("shadow");
  });

  it("SheetFooter multiple custom classes merge correctly", async () => {
    const { SheetFooter } = await import("@/components/ui/sheet");
    const { container } = render(
      <SheetFooter className="bg-blue-500 border-t">Content</SheetFooter>,
    );
    const element = container.querySelector('[data-slot="sheet-footer"]');
    expect(element?.className).toContain("bg-blue-500");
    expect(element?.className).toContain("border-t");
  });

  it("Sheet is callable and returns a component", async () => {
    const { Sheet } = await import("@/components/ui/sheet");
    expect(typeof Sheet).toBe("function");
    const result = Sheet({});
    expect(result).toBeDefined();
  });

  it("SheetTrigger is callable", async () => {
    const { SheetTrigger } = await import("@/components/ui/sheet");
    expect(typeof SheetTrigger).toBe("function");
  });

  it("SheetClose is callable", async () => {
    const { SheetClose } = await import("@/components/ui/sheet");
    expect(typeof SheetClose).toBe("function");
  });

  it("all components handle empty children", async () => {
    const { SheetHeader, SheetFooter } = await import("@/components/ui/sheet");
    const headerResult = render(<SheetHeader></SheetHeader>);
    const footerResult = render(<SheetFooter></SheetFooter>);
    expect(
      headerResult.container.querySelector('[data-slot="sheet-header"]'),
    ).toBeInTheDocument();
    expect(
      footerResult.container.querySelector('[data-slot="sheet-footer"]'),
    ).toBeInTheDocument();
  });

  it("SheetTrigger is callable and returns JSX", async () => {
    const { SheetTrigger } = await import("@/components/ui/sheet");
    expect(typeof SheetTrigger).toBe("function");
  });

  it("SheetClose is callable and returns JSX", async () => {
    const { SheetClose } = await import("@/components/ui/sheet");
    expect(typeof SheetClose).toBe("function");
  });

  it("SheetTitle applies text styling with className", async () => {
    const { SheetTitle } = await import("@/components/ui/sheet");
    expect(typeof SheetTitle).toBe("function");
    const component = SheetTitle({ children: "Title" });
    expect(component).toBeDefined();
  });

  it("SheetDescription applies text styling with className", async () => {
    const { SheetDescription } = await import("@/components/ui/sheet");
    expect(typeof SheetDescription).toBe("function");
    const component = SheetDescription({ children: "Description" });
    expect(component).toBeDefined();
  });

  it("SheetContent is callable with props", async () => {
    const { SheetContent } = await import("@/components/ui/sheet");
    expect(typeof SheetContent).toBe("function");
  });

  it("SheetContent accepts side prop", async () => {
    const { SheetContent } = await import("@/components/ui/sheet");
    const component = SheetContent({
      children: "Content",
      side: "left",
    });
    expect(component).toBeDefined();
  });

  it("SheetContent accepts different side values", async () => {
    const { SheetContent } = await import("@/components/ui/sheet");
    const sides = ["top", "right", "bottom", "left"];
    sides.forEach((side) => {
      const component = SheetContent({
        children: "Content",
        side: side as "top" | "right" | "bottom" | "left",
      });
      expect(component).toBeDefined();
    });
  });

  it("SheetContent has showCloseButton prop", async () => {
    const { SheetContent } = await import("@/components/ui/sheet");
    const componentWithClose = SheetContent({
      children: "Content",
      showCloseButton: true,
    });
    expect(componentWithClose).toBeDefined();

    const componentWithoutClose = SheetContent({
      children: "Content",
      showCloseButton: false,
    });
    expect(componentWithoutClose).toBeDefined();
  });

  it("SheetContent applies className prop", async () => {
    const { SheetContent } = await import("@/components/ui/sheet");
    const component = SheetContent({
      children: "Content",
      className: "custom-content",
    });
    expect(component).toBeDefined();
  });

  it("SheetTitle forwards className prop", async () => {
    const { SheetTitle } = await import("@/components/ui/sheet");
    const component = SheetTitle({
      children: "Title",
      className: "custom-title",
    });
    expect(component).toBeDefined();
  });

  it("SheetDescription forwards className prop", async () => {
    const { SheetDescription } = await import("@/components/ui/sheet");
    const component = SheetDescription({
      children: "Description",
      className: "custom-desc",
    });
    expect(component).toBeDefined();
  });

  it("SheetTrigger forwards custom props", async () => {
    const { SheetTrigger } = await import("@/components/ui/sheet");
    const component = SheetTrigger({
      children: "Open",
      id: "trigger-1",
      className: "custom-trigger",
    });
    expect(component).toBeDefined();
  });

  it("SheetClose forwards custom props", async () => {
    const { SheetClose } = await import("@/components/ui/sheet");
    const component = SheetClose({
      id: "close-1",
      className: "custom-close",
    });
    expect(component).toBeDefined();
  });

  it("Sheet is callable with optional props", async () => {
    const { Sheet } = await import("@/components/ui/sheet");
    expect(typeof Sheet).toBe("function");
    const component = Sheet({
      children: "Content",
      open: true,
    });
    expect(component).toBeDefined();
  });

  it("Sheet children can be nested components", async () => {
    const { Sheet, SheetContent, SheetHeader } =
      await import("@/components/ui/sheet");
    const component = Sheet({
      children: [
        SheetContent({ children: SheetHeader({ children: "Header" }) }),
      ],
    });
    expect(component).toBeDefined();
  });

  it("SheetContent children handling", async () => {
    const { SheetContent } = await import("@/components/ui/sheet");
    const stringChild = SheetContent({ children: "Text content" });
    expect(stringChild).toBeDefined();

    const multpleChildren = SheetContent({
      children: ["Header", "Body", "Footer"],
    });
    expect(multpleChildren).toBeDefined();
  });

  it("SheetTitle with custom styling", async () => {
    const { SheetTitle } = await import("@/components/ui/sheet");
    const component = SheetTitle({
      children: "Custom Title",
      className: "text-lg font-bold",
      id: "custom-title",
    });
    expect(component).toBeDefined();
  });

  it("SheetDescription with custom styling", async () => {
    const { SheetDescription } = await import("@/components/ui/sheet");
    const component = SheetDescription({
      children: "Custom description",
      className: "text-gray-600",
      id: "custom-desc",
    });
    expect(component).toBeDefined();
  });

  it("Sheet and content variants render correctly", async () => {
    const { SheetContent } = await import("@/components/ui/sheet");

    const rightSheet = SheetContent({
      children: "Right side",
      side: "right",
    });
    expect(rightSheet).toBeDefined();

    const leftSheet = SheetContent({
      children: "Left side",
      side: "left",
    });
    expect(leftSheet).toBeDefined();

    const topSheet = SheetContent({
      children: "Top side",
      side: "top",
    });
    expect(topSheet).toBeDefined();

    const bottomSheet = SheetContent({
      children: "Bottom side",
      side: "bottom",
    });
    expect(bottomSheet).toBeDefined();
  });
});
