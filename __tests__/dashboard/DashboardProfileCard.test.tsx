import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DashboardProfileCard } from "@/app/(features)/containers/dashboard/DashboardProfileCard";

describe("DashboardProfileCard Component", () => {
  it("renders the profile card with title", () => {
    render(<DashboardProfileCard />);
    expect(screen.getByText("Mi Perfil")).toBeInTheDocument();
  });

  it("displays name label and value", () => {
    render(<DashboardProfileCard name="Juan Pérez" />);
    expect(screen.getByText("Nombre")).toBeInTheDocument();
    expect(screen.getByText("Juan Pérez")).toBeInTheDocument();
  });

  it("displays default dash when name is not provided", () => {
    render(<DashboardProfileCard />);
    const dashes = screen.getAllByText("—");
    expect(dashes.length).toBeGreaterThan(0);
  });

  it("displays role label and value", () => {
    render(<DashboardProfileCard role="admin" />);
    expect(screen.getByText("Rol")).toBeInTheDocument();
    expect(screen.getByText("admin")).toBeInTheDocument();
  });

  it("capitalizes role text", () => {
    render(<DashboardProfileCard role="usuario" />);
    expect(screen.getByText("usuario")).toBeInTheDocument();
  });

  it("displays email label and value", () => {
    render(<DashboardProfileCard email="juan@example.com" />);
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("juan@example.com")).toBeInTheDocument();
  });

  it("displays all three fields together", () => {
    render(
      <DashboardProfileCard
        name="María López"
        role="user"
        email="maria@example.com"
      />,
    );
    expect(screen.getByText("Nombre")).toBeInTheDocument();
    expect(screen.getByText("María López")).toBeInTheDocument();
    expect(screen.getByText("Rol")).toBeInTheDocument();
    expect(screen.getByText("user")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("maria@example.com")).toBeInTheDocument();
  });

  it("handles null values gracefully", () => {
    render(<DashboardProfileCard name={null} role={null} email={null} />);
    const dashes = screen.getAllByText("—");
    expect(dashes.length).toBe(3);
  });

  it("handles long email addresses with word break", () => {
    const longEmail = "verylongemailaddress@example.com";
    render(<DashboardProfileCard email={longEmail} />);
    expect(screen.getByText(longEmail)).toBeInTheDocument();
  });

  it("displays uppercase labels", () => {
    render(
      <DashboardProfileCard
        name="Test"
        role="admin"
        email="test@example.com"
      />,
    );
    expect(screen.getByText("Nombre")).toBeInTheDocument();
    expect(screen.getByText("Rol")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
  });
});
