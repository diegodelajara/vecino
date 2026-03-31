import { describe, it, expect, vi } from "vitest";

// Mock all dependencies
vi.mock("@/lib/supabase/supabaseClient", () => ({
  supabase: {},
}));

vi.mock("@/lib/supabase/supabaseServer", () => ({
  createClient: vi.fn(),
}));

vi.mock("@/lib/supabase/hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

vi.mock("@/lib/supabase/services/auth.service", () => ({
  authService: {
    signInWithPassword: vi.fn(),
  },
}));

describe("Containers barrel export", () => {
  it("exports all container components and hooks", async () => {
    // eslint-disable-next-line @next/next/no-assign-module-variable
    const module = await import("@/app/(features)/containers");

    expect(typeof module.Login).toBe("function");
    expect(typeof module.useLogin).toBe("function");
    expect(typeof module.DashboardProfileCard).toBe("function");
    expect(typeof module.DashboardUnitCard).toBe("function");
    expect(typeof module.DashboardSummaryCard).toBe("function");
    expect(typeof module.DashboardExpensesTable).toBe("function");
    expect(typeof module.DashboardHeader).toBe("function");
    expect(typeof module.Menu).toBe("function");
    expect(typeof module.Expenses).toBe("function");
  });

  it("all exports are distinct functions", async () => {
    // eslint-disable-next-line @next/next/no-assign-module-variable
    const module = await import("@/app/(features)/containers");
    const exports = [
      module.Login,
      module.useLogin,
      module.DashboardProfileCard,
      module.DashboardUnitCard,
      module.DashboardSummaryCard,
      module.DashboardExpensesTable,
      module.DashboardHeader,
      module.Menu,
      module.Expenses,
    ];

    // Verify all are distinct
    const uniqueExports = new Set(exports);
    expect(uniqueExports.size).toBe(exports.length);
  });

  it("can import all named exports from barrel", async () => {
    const {
      Login,
      useLogin,
      DashboardProfileCard,
      DashboardUnitCard,
      DashboardSummaryCard,
      DashboardExpensesTable,
      DashboardHeader,
      Menu,
      Expenses,
    } = await import("@/app/(features)/containers");

    expect(Login).toBeDefined();
    expect(useLogin).toBeDefined();
    expect(DashboardProfileCard).toBeDefined();
    expect(DashboardUnitCard).toBeDefined();
    expect(DashboardSummaryCard).toBeDefined();
    expect(DashboardExpensesTable).toBeDefined();
    expect(DashboardHeader).toBeDefined();
    expect(Menu).toBeDefined();
    expect(Expenses).toBeDefined();
  });
});
