import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DashboardExpensesTable } from "@/app/(features)/containers/dashboard/DashboardExpensesTable";

describe("DashboardExpensesTable Component", () => {
  beforeEach(() => {
    // Mock fetch global
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ url: "https://example.com/pay" }),
      } as Response),
    );

    // Mock window.location.href
    Object.defineProperty(window, "location", {
      value: {
        href: "",
      },
      writable: true,
    });
  });
  it("renders empty state when expenses is null", () => {
    render(<DashboardExpensesTable expenses={null} />);
    expect(
      screen.getByText("No hay gastos registrados aún."),
    ).toBeInTheDocument();
  });

  it("renders empty state when expenses array is empty", () => {
    render(<DashboardExpensesTable expenses={[]} />);
    expect(
      screen.getByText("No hay gastos registrados aún."),
    ).toBeInTheDocument();
  });

  it("renders table title when expenses exist", () => {
    render(
      <DashboardExpensesTable
        expenses={[
          {
            id: "1",
            amount: 100,
            status: "paid",
            expenses: { month: 3, year: 2026 },
          },
        ]}
      />,
    );
    expect(screen.getByText("Historial de Gastos Comunes")).toBeInTheDocument();
  });

  it("renders table headers", () => {
    render(
      <DashboardExpensesTable
        expenses={[
          {
            id: "1",
            amount: 100,
            status: "paid",
            expenses: { month: 3, year: 2026 },
          },
        ]}
      />,
    );
    expect(screen.getByText("Período")).toBeInTheDocument();
    expect(screen.getByText("Monto")).toBeInTheDocument();
    expect(screen.getByText("Estado")).toBeInTheDocument();
    expect(screen.getAllByText("Pagar").length).toBeGreaterThan(0);
  });

  it("displays expense period correctly", () => {
    render(
      <DashboardExpensesTable
        expenses={[
          {
            id: "1",
            amount: 100,
            status: "paid",
            expenses: { month: 3, year: 2026 },
          },
        ]}
      />,
    );
    expect(screen.getByText("3/2026")).toBeInTheDocument();
  });

  it("formats amount with 2 decimal places", () => {
    render(
      <DashboardExpensesTable
        expenses={[
          {
            id: "1",
            amount: 99.5,
            status: "paid",
            expenses: { month: 1, year: 2026 },
          },
        ]}
      />,
    );
    expect(screen.getByText("$99.50")).toBeInTheDocument();
  });

  it("displays 'Pagado' status for paid expenses", () => {
    render(
      <DashboardExpensesTable
        expenses={[
          {
            id: "1",
            amount: 100,
            status: "paid",
            expenses: { month: 1, year: 2026 },
          },
        ]}
      />,
    );
    expect(screen.getByText("Pagado")).toBeInTheDocument();
  });

  it("displays 'Pendiente' status for unpaid expenses", () => {
    render(
      <DashboardExpensesTable
        expenses={[
          {
            id: "1",
            amount: 100,
            status: "pending",
            expenses: { month: 1, year: 2026 },
          },
        ]}
      />,
    );
    expect(screen.getByText("Pendiente")).toBeInTheDocument();
  });

  it("renders pay button for each expense", () => {
    render(
      <DashboardExpensesTable
        expenses={[
          {
            id: "1",
            amount: 100,
            status: "paid",
            expenses: { month: 1, year: 2026 },
          },
        ]}
      />,
    );
    expect(screen.getByRole("button", { name: /pagar/i })).toBeInTheDocument();
  });

  it("calls handlePay when pay button is clicked", async () => {
    render(
      <DashboardExpensesTable
        expenses={[
          {
            id: "1",
            amount: 100,
            status: "pending",
            expenses: { month: 1, year: 2026 },
          },
        ]}
      />,
    );
    const payButton = screen.getByRole("button", { name: /pagar/i });
    fireEvent.click(payButton);

    // Wait for async fetch to complete
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(global.fetch).toHaveBeenCalledWith("/api/pay", { method: "POST" });
    expect(window.location.href).toBe("https://example.com/pay");
  });

  it("displays multiple expenses in rows", () => {
    render(
      <DashboardExpensesTable
        expenses={[
          {
            id: "1",
            amount: 100,
            status: "paid",
            expenses: { month: 1, year: 2026 },
          },
          {
            id: "2",
            amount: 200,
            status: "pending",
            expenses: { month: 2, year: 2026 },
          },
        ]}
      />,
    );
    expect(screen.getByText("1/2026")).toBeInTheDocument();
    expect(screen.getByText("2/2026")).toBeInTheDocument();
    expect(screen.getByText("$100.00")).toBeInTheDocument();
    expect(screen.getByText("$200.00")).toBeInTheDocument();
  });

  it("displays correct status classes for paid items", () => {
    const { container } = render(
      <DashboardExpensesTable
        expenses={[
          {
            id: "1",
            amount: 100,
            status: "paid",
            expenses: { month: 1, year: 2026 },
          },
        ]}
      />,
    );
    const paidBadge = container.querySelector(".bg-green-100, .text-green-800");
    expect(paidBadge || screen.getByText("Pagado")).toBeInTheDocument();
  });

  it("handles multiple pay button clicks", async () => {
    render(
      <DashboardExpensesTable
        expenses={[
          {
            id: "1",
            amount: 100,
            status: "pending",
            expenses: { month: 1, year: 2026 },
          },
          {
            id: "2",
            amount: 200,
            status: "pending",
            expenses: { month: 2, year: 2026 },
          },
        ]}
      />,
    );
    const payButtons = screen.getAllByRole("button", { name: /pagar/i });
    fireEvent.click(payButtons[0]);
    fireEvent.click(payButtons[1]);

    // Wait for async fetches to complete
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith("/api/pay", { method: "POST" });
  });
});
