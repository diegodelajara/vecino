import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Menu } from "@/app/(features)/containers/menu";

// Mock Sidebar components
vi.mock("@/components/ui/sidebar", () => ({
  Sidebar: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar">{children}</div>
  ),
  SidebarHeader: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-header">{children}</div>
  ),
  SidebarContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-content">{children}</div>
  ),
  SidebarGroup: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-group">{children}</div>
  ),
  SidebarGroupContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-group-content">{children}</div>
  ),
  SidebarGroupLabel: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-group-label">{children}</div>
  ),
  SidebarMenu: ({ children }: { children: React.ReactNode }) => (
    <ul data-testid="sidebar-menu">{children}</ul>
  ),
  SidebarMenuItem: ({ children }: { children: React.ReactNode }) => (
    <li data-testid="sidebar-menu-item">{children}</li>
  ),
  SidebarMenuButton: ({ children }: { children: React.ReactNode }) => (
    <button data-testid="sidebar-menu-button">{children}</button>
  ),
}));

describe("Menu Component", () => {
  it("renders without crashing", () => {
    render(<Menu />);
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
  });

  it("renders the sidebar header", () => {
    render(<Menu />);
    expect(screen.getByTestId("sidebar-header")).toBeInTheDocument();
  });

  it("renders the CondoApp branding", () => {
    render(<Menu />);
    expect(screen.getByText("CondoApp")).toBeInTheDocument();
  });

  it("renders the logo emoji", () => {
    render(<Menu />);
    expect(screen.getByText("🏢")).toBeInTheDocument();
  });

  it("renders the sidebar content", () => {
    render(<Menu />);
    expect(screen.getByTestId("sidebar-content")).toBeInTheDocument();
  });

  it("renders the sidebar group", () => {
    render(<Menu />);
    expect(screen.getByTestId("sidebar-group")).toBeInTheDocument();
  });

  it("renders the sidebar menu", () => {
    render(<Menu />);
    expect(screen.getByTestId("sidebar-menu")).toBeInTheDocument();
  });

  it("renders Dashboard menu item", () => {
    render(<Menu />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("renders Expenses menu item", () => {
    render(<Menu />);
    expect(screen.getByText("Expenses")).toBeInTheDocument();
  });

  it("renders two menu items", () => {
    render(<Menu />);
    const menuItems = screen.getAllByTestId("sidebar-menu-item");
    expect(menuItems).toHaveLength(2);
  });

  it("renders two menu buttons", () => {
    render(<Menu />);
    const menuButtons = screen.getAllByTestId("sidebar-menu-button");
    expect(menuButtons).toHaveLength(2);
  });

  it("renders menu buttons in correct order", () => {
    render(<Menu />);
    const menuButtons = screen.getAllByTestId("sidebar-menu-button");
    expect(menuButtons[0]).toHaveTextContent("Dashboard");
    expect(menuButtons[1]).toHaveTextContent("Expenses");
  });

  it("has proper styling classes on logo container", () => {
    const { container } = render(<Menu />);
    const logoContainer = container.querySelector(".w-8.h-8");
    expect(logoContainer).toBeInTheDocument();
    expect(logoContainer).toHaveClass(
      "bg-gradient-to-br",
      "from-blue-500",
      "to-blue-600",
      "rounded-lg",
      "flex",
      "items-center",
      "justify-center",
    );
  });

  it("has proper styling on branding header", () => {
    const { container } = render(<Menu />);
    const brandingDiv = container.querySelector(".flex.items-center.gap-2");
    expect(brandingDiv).toBeInTheDocument();
    expect(brandingDiv).toHaveClass(
      "flex",
      "items-center",
      "gap-2",
      "px-4",
      "py-2",
    );
  });

  it("renders CondoApp text with semibold font", () => {
    render(<Menu />);
    const condoAppText = screen.getByText("CondoApp");
    expect(condoAppText).toHaveClass("font-semibold");
  });

  it("renders all sidebar component structure", () => {
    render(<Menu />);
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar-header")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar-content")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar-group")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar-group-content")).toBeInTheDocument();
  });
});
