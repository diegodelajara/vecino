import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";

vi.mock("@/lib/supabase/supabaseClient", () => ({
  supabase: {},
}));

describe("Supabase hooks barrel export", () => {
  it("exports useAuth hook", async () => {
    // eslint-disable-next-line @next/next/no-assign-module-variable
    const module = await import("@/lib/supabase/hooks");
    expect(typeof module.useAuth).toBe("function");
  });

  it("useAuth is a valid hook function", async () => {
    // eslint-disable-next-line @next/next/no-assign-module-variable
    const module = await import("@/lib/supabase/hooks");
    const hookName = module.useAuth.name;
    expect(hookName).toBe("useAuth");
  });

  it("useAuth hook can be imported directly", async () => {
    // eslint-disable-next-line @next/next/no-assign-module-variable
    const module = await import("@/lib/supabase/hooks");
    expect(module.useAuth).toBeDefined();
  });

  it("can render useAuth hook from barrel export", async () => {
    const { useAuth } = await import("@/lib/supabase/hooks");
    const { result } = renderHook(() => useAuth());

    expect(result.current).toBeDefined();
    expect(typeof result.current).toBe("object");
  });

  it("barrel export useAuth has expected properties", async () => {
    const { useAuth } = await import("@/lib/supabase/hooks");
    const { result } = renderHook(() => useAuth());

    expect(result.current).toHaveProperty("signIn");
    expect(result.current).toHaveProperty("signOut");
    expect(result.current).toHaveProperty("loading");
    expect(result.current).toHaveProperty("error");
  });
});
