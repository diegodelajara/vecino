import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock next/navigation FIRST - before any other code
vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

// Mock Supabase
vi.mock("@/lib/supabase/supabaseServer", () => ({
  createClient: vi.fn(),
}));

import { logout } from "@/app/dashboard/actions";
import * as navigationModule from "next/navigation";
import * as supabaseModule from "@/lib/supabase/supabaseServer";

const mockRedirect = navigationModule.redirect as ReturnType<typeof vi.fn>;
const mockCreateClient = supabaseModule.createClient as ReturnType<
  typeof vi.fn
>;
const mockSignOut = vi.fn();

describe("logout action", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockCreateClient.mockResolvedValue({
      auth: {
        signOut: mockSignOut,
      },
    });
    mockSignOut.mockResolvedValue({ data: null, error: null });
  });

  it("creates a supabase client", async () => {
    await logout();
    expect(mockCreateClient).toHaveBeenCalled();
  });

  it("calls signOut on the supabase auth", async () => {
    await logout();
    expect(mockSignOut).toHaveBeenCalled();
  });

  it("redirects to home page after logout", async () => {
    await logout();
    expect(mockRedirect).toHaveBeenCalledWith("/");
  });

  it("handles supabase client creation error", async () => {
    mockCreateClient.mockRejectedValue(new Error("Supabase error"));

    await expect(logout()).rejects.toThrow("Supabase error");
  });

  it("handles signOut error", async () => {
    mockSignOut.mockRejectedValue(new Error("Sign out failed"));

    await expect(logout()).rejects.toThrow("Sign out failed");
  });

  it("calls functions in correct order", async () => {
    const callOrder: string[] = [];

    mockCreateClient.mockImplementation(() => {
      callOrder.push("createClient");
      return Promise.resolve({
        auth: {
          signOut: () => {
            callOrder.push("signOut");
            return Promise.resolve({ data: null, error: null });
          },
        },
      });
    });

    mockRedirect.mockImplementation(() => {
      callOrder.push("redirect");
    });

    await logout();

    expect(callOrder).toEqual(["createClient", "signOut", "redirect"]);
  });

  it("returns undefined (redirect is called)", async () => {
    mockRedirect.mockImplementation(() => {
      throw new Error("Redirect called");
    });

    await expect(logout()).rejects.toThrow("Redirect called");
  });
});
