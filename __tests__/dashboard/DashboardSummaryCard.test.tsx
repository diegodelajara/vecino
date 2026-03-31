import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DashboardSummaryCard } from "@/app/(features)/containers/dashboard/DashboardSummaryCard";

describe("DashboardSummaryCard Component", () => {
  it("renders the summary card with title", () => {
    render(<DashboardSummaryCard expenses={null} />);
    expect(screen.getByText("Resumen")).toBeInTheDocument();
  });

  it("displays 0 total when expenses is null", () => {
    render(<DashboardSummaryCard expenses={null} />);
    expect(screen.getByText("$0.00")).toBeInTheDocument();
  });

  it("displays 0 records when expenses is null", () => {
    render(<DashboardSummaryCard expenses={null} />);
    const recordCount = screen.getByText("0");
    expect(recordCount).toBeInTheDocument();
  });

  it("displays 0 total when expenses array is empty", () => {
    render(<DashboardSummaryCard expenses={[]} />);
    expect(screen.getByText("$0.00")).toBeInTheDocument();
  });

  it("displays correct total with single expense", () => {
    const expenses = [{ amount: 100 }];
    render(<DashboardSummaryCard expenses={expenses} />);
    expect(screen.getByText("$100.00")).toBeInTheDocument();
  });

  it("displays correct total with multiple expenses", () => {
    const expenses = [{ amount: 100 }, { amount: 50 }, { amount: 25 }];
    render(<DashboardSummaryCard expenses={expenses} />);
    expect(screen.getByText("$175.00")).toBeInTheDocument();
  });

  it("displays correct expense count", () => {
    const expenses = [{ amount: 100 }, { amount: 50 }, { amount: 25 }];
    render(<DashboardSummaryCard expenses={expenses} />);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("handles expenses with 0 amount", () => {
    const expenses = [{ amount: 0 }, { amount: 100 }];
    render(<DashboardSummaryCard expenses={expenses} />);
    expect(screen.getByText("$100.00")).toBeInTheDocument();
  });

  it("displays Total de Gastos label", () => {
    render(<DashboardSummaryCard expenses={null} />);
    expect(screen.getByText("Total de Gastos")).toBeInTheDocument();
  });

  it("displays Registros label", () => {
    render(<DashboardSummaryCard expenses={null} />);
    expect(screen.getByText("Registros")).toBeInTheDocument();
  });

  it("formats currency correctly with decimals", () => {
    const expenses = [{ amount: 99.99 }, { amount: 100.01 }];
    render(<DashboardSummaryCard expenses={expenses} />);
    expect(screen.getByText("$200.00")).toBeInTheDocument();
  });

  it("handles large expense amounts", () => {
    const expenses = [{ amount: 999999.99 }];
    render(<DashboardSummaryCard expenses={expenses} />);
    expect(screen.getByText("$999999.99")).toBeInTheDocument();
  });
});
