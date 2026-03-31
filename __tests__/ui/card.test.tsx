import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
} from "@/components/ui/card";

describe("Card Components", () => {
  describe("Card", () => {
    it("renders a card element", () => {
      const { container } = render(<Card>Test</Card>);
      const card = container.querySelector("[data-slot='card']");
      expect(card).toBeInTheDocument();
    });

    it("applies default size", () => {
      const { container } = render(<Card>Test</Card>);
      const card = container.querySelector("[data-slot='card']");
      expect(card).toHaveAttribute("data-size", "default");
    });

    it("applies custom size", () => {
      const { container } = render(<Card size="sm">Test</Card>);
      const card = container.querySelector("[data-slot='card']");
      expect(card).toHaveAttribute("data-size", "sm");
    });

    it("accepts custom className", () => {
      const { container } = render(<Card className="custom-class">Test</Card>);
      const card = container.querySelector("[data-slot='card']");
      expect(card).toHaveClass("custom-class");
    });

    it("renders children", () => {
      const { container } = render(
        <Card>
          <div>Child content</div>
        </Card>,
      );
      expect(container.textContent).toContain("Child content");
    });
  });

  describe("CardHeader", () => {
    it("renders a card header element", () => {
      const { container } = render(<CardHeader>Header</CardHeader>);
      const header = container.querySelector("[data-slot='card-header']");
      expect(header).toBeInTheDocument();
    });

    it("accepts custom className", () => {
      const { container } = render(
        <CardHeader className="custom-header">Header</CardHeader>,
      );
      const header = container.querySelector("[data-slot='card-header']");
      expect(header).toHaveClass("custom-header");
    });
  });

  describe("CardTitle", () => {
    it("renders a card title element", () => {
      const { container } = render(<CardTitle>Title</CardTitle>);
      const title = container.querySelector("[data-slot='card-title']");
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent("Title");
    });

    it("accepts custom className", () => {
      const { container } = render(
        <CardTitle className="custom-title">Title</CardTitle>,
      );
      const title = container.querySelector("[data-slot='card-title']");
      expect(title).toHaveClass("custom-title");
    });
  });

  describe("CardDescription", () => {
    it("renders a card description element", () => {
      const { container } = render(
        <CardDescription>Description</CardDescription>,
      );
      const description = container.querySelector(
        "[data-slot='card-description']",
      );
      expect(description).toBeInTheDocument();
      expect(description).toHaveTextContent("Description");
    });

    it("accepts custom className", () => {
      const { container } = render(
        <CardDescription className="custom-desc">Description</CardDescription>,
      );
      const description = container.querySelector(
        "[data-slot='card-description']",
      );
      expect(description).toHaveClass("custom-desc");
    });
  });

  describe("CardContent", () => {
    it("renders a card content element", () => {
      const { container } = render(<CardContent>Content</CardContent>);
      const content = container.querySelector("[data-slot='card-content']");
      expect(content).toBeInTheDocument();
      expect(content).toHaveTextContent("Content");
    });

    it("accepts custom className", () => {
      const { container } = render(
        <CardContent className="custom-content">Content</CardContent>,
      );
      const content = container.querySelector("[data-slot='card-content']");
      expect(content).toHaveClass("custom-content");
    });
  });

  describe("CardFooter", () => {
    it("renders a card footer element", () => {
      const { container } = render(<CardFooter>Footer</CardFooter>);
      const footer = container.querySelector("[data-slot='card-footer']");
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveTextContent("Footer");
    });

    it("accepts custom className", () => {
      const { container } = render(
        <CardFooter className="custom-footer">Footer</CardFooter>,
      );
      const footer = container.querySelector("[data-slot='card-footer']");
      expect(footer).toHaveClass("custom-footer");
    });
  });

  describe("CardAction", () => {
    it("renders a card action element", () => {
      const { container } = render(<CardAction>Action</CardAction>);
      const action = container.querySelector("[data-slot='card-action']");
      expect(action).toBeInTheDocument();
      expect(action).toHaveTextContent("Action");
    });

    it("accepts custom className", () => {
      const { container } = render(
        <CardAction className="custom-action">Action</CardAction>,
      );
      const action = container.querySelector("[data-slot='card-action']");
      expect(action).toHaveClass("custom-action");
    });
  });
});
