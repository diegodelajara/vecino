import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { DashboardHeader } from "@/app/(features)/containers/dashboard/DashboardHeader";

// Mock de logout action
vi.mock("@/app/(features)/dashboard/actions", () => ({
  logout: vi.fn(),
}));

// Mock de SidebarTrigger
vi.mock("@/components/ui/sidebar", () => ({
  SidebarTrigger: ({ className }: { className?: string }) => (
    <button className={className}>Menu</button>
  ),
}));

describe("DashboardHeader Component", () => {
  it("renders the header with CondoApp title", () => {
    render(<DashboardHeader />);
    expect(screen.getByText("CondoApp")).toBeInTheDocument();
  });

  it("renders the sidebar trigger button", () => {
    render(<DashboardHeader />);
    const menuButton = screen.getByText("Menu");
    expect(menuButton).toBeInTheDocument();
  });

  it("displays user name when provided", () => {
    render(<DashboardHeader name="Juan Pérez" />);
    expect(screen.getByText("Juan Pérez")).toBeInTheDocument();
  });

  it("displays default user text when name is not provided", () => {
    render(<DashboardHeader />);
    expect(screen.getByText("Usuario")).toBeInTheDocument();
  });

  it("displays user email when provided", () => {
    render(<DashboardHeader email="juan@example.com" />);
    expect(screen.getByText("juan@example.com")).toBeInTheDocument();
  });

  it("renders logout button", () => {
    render(<DashboardHeader />);
    const logoutButton = screen.getByRole("button", {
      name: /cerrar sesión/i,
    });
    expect(logoutButton).toBeInTheDocument();
  });

  it("displays both name and email together", () => {
    render(<DashboardHeader name="María López" email="maria@example.com" />);
    expect(screen.getByText("María López")).toBeInTheDocument();
    expect(screen.getByText("maria@example.com")).toBeInTheDocument();
  });

  it("renders emoji icon", () => {
    render(<DashboardHeader />);
    expect(screen.getByText("🏢")).toBeInTheDocument();
  });

  it("handles null email gracefully", () => {
    render(<DashboardHeader name="Test User" email={null} />);
    expect(screen.getByText("Test User")).toBeInTheDocument();
  });

  it("handles null name gracefully", () => {
    render(<DashboardHeader name={null} email="test@example.com" />);
    expect(screen.getByText("Usuario")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });
});
