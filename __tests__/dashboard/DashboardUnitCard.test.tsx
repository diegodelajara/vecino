import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DashboardUnitCard } from "@/app/(features)/containers/dashboard/DashboardUnitCard";

describe("DashboardUnitCard Component", () => {
  it("returns null when unit is not provided", () => {
    const { container } = render(<DashboardUnitCard />);
    expect(container.firstChild).toBeNull();
  });

  it("returns null when unit is null", () => {
    const { container } = render(<DashboardUnitCard unit={null} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders the unit card with title when unit exists", () => {
    render(<DashboardUnitCard unit={{}} />);
    expect(screen.getByText("Mi Unidad")).toBeInTheDocument();
  });

  it("displays unit number when provided", () => {
    render(<DashboardUnitCard unit={{ number: "101" }} />);
    expect(screen.getByText("Departamento")).toBeInTheDocument();
    expect(screen.getByText("101")).toBeInTheDocument();
  });

  it("displays default dash when unit number is not provided", () => {
    render(<DashboardUnitCard unit={{}} />);
    const dashes = screen.getAllByText("—");
    expect(dashes.length).toBeGreaterThan(0);
  });

  it("displays tower when provided", () => {
    render(<DashboardUnitCard unit={{ tower: "A" }} />);
    expect(screen.getByText("Torre")).toBeInTheDocument();
    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("displays condominium name when provided", () => {
    render(
      <DashboardUnitCard
        unit={{ condominiums: { name: "Condominio Sunset" } }}
      />,
    );
    expect(screen.getByText("Condominio")).toBeInTheDocument();
    expect(screen.getByText("Condominio Sunset")).toBeInTheDocument();
  });

  it("displays all three fields together", () => {
    render(
      <DashboardUnitCard
        unit={{
          number: "202",
          tower: "B",
          condominiums: { name: "Condominio Verde" },
        }}
      />,
    );
    expect(screen.getByText("202")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.getByText("Condominio Verde")).toBeInTheDocument();
  });

  it("displays dash for missing unit number", () => {
    render(<DashboardUnitCard unit={{ tower: "A" }} />);
    const dashes = screen.getAllByText("—");
    expect(dashes.length).toBeGreaterThan(0);
  });

  it("displays dash for missing tower", () => {
    render(<DashboardUnitCard unit={{ number: "101" }} />);
    const dashes = screen.getAllByText("—");
    expect(dashes.length).toBeGreaterThan(0);
  });

  it("displays dash when condominiums is null", () => {
    render(<DashboardUnitCard unit={{ number: "101", condominiums: null }} />);
    const dashes = screen.getAllByText("—");
    expect(dashes.length).toBeGreaterThan(0);
  });

  it("displays dash when condominiums.name is null", () => {
    render(
      <DashboardUnitCard
        unit={{ number: "101", condominiums: { name: null } }}
      />,
    );
    const dashes = screen.getAllByText("—");
    expect(dashes.length).toBeGreaterThan(0);
  });

  it("displays uppercase labels", () => {
    render(
      <DashboardUnitCard
        unit={{
          number: "101",
          tower: "A",
          condominiums: { name: "TestCondo" },
        }}
      />,
    );
    expect(screen.getByText("Departamento")).toBeInTheDocument();
    expect(screen.getByText("Torre")).toBeInTheDocument();
    expect(screen.getByText("TestCondo")).toBeInTheDocument();
  });
});
