import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/supabase/supabaseClient", () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn(),
      getUser: vi.fn(),
      signOut: vi.fn(),
    },
  },
}));

import { authService } from "@/lib/supabase/services/auth.service";
import * as supabaseModule from "@/lib/supabase/supabaseClient";

const mockSignInWithPassword = vi.fn();
const mockGetUser = vi.fn();
const mockSignOut = vi.fn();

describe("authService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    const supabase = (supabaseModule as any).supabase;
    supabase.auth.signInWithPassword = mockSignInWithPassword;
    supabase.auth.getUser = mockGetUser;
    supabase.auth.signOut = mockSignOut;
  });

  describe("signInWithPassword", () => {
    it("calls supabase auth with email and password", async () => {
      mockSignInWithPassword.mockResolvedValue({
        data: { user: { id: "123" } },
        error: null,
      });

      await authService.signInWithPassword("test@example.com", "password");

      expect(mockSignInWithPassword).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password",
      });
    });

    it("returns success response from supabase", async () => {
      const response = { data: { user: { id: "123" } }, error: null };
      mockSignInWithPassword.mockResolvedValue(response);

      const result = await authService.signInWithPassword(
        "test@example.com",
        "password",
      );

      expect(result).toEqual(response);
    });

    it("returns error response from supabase", async () => {
      const error = { message: "Invalid credentials" };
      const response = { data: null, error };
      mockSignInWithPassword.mockResolvedValue(response);

      const result = await authService.signInWithPassword(
        "test@example.com",
        "wrong",
      );

      expect(result).toEqual(response);
    });
  });

  describe("getUser", () => {
    it("calls supabase auth getUser", async () => {
      mockGetUser.mockResolvedValue({
        data: { user: { id: "123", email: "test@example.com" } },
        error: null,
      });

      await authService.getUser();

      expect(mockGetUser).toHaveBeenCalled();
    });

    it("returns user data from supabase", async () => {
      const response = {
        data: { user: { id: "123", email: "test@example.com" } },
        error: null,
      };
      mockGetUser.mockResolvedValue(response);

      const result = await authService.getUser();

      expect(result).toEqual(response);
    });

    it("returns error when user is not found", async () => {
      const error = { message: "User not found" };
      const response = { data: null, error };
      mockGetUser.mockResolvedValue(response);

      const result = await authService.getUser();

      expect(result).toEqual(response);
    });
  });

  describe("signOut", () => {
    it("calls supabase auth signOut", async () => {
      mockSignOut.mockResolvedValue({ error: null });

      await authService.signOut();

      expect(mockSignOut).toHaveBeenCalled();
    });

    it("returns success response from supabase", async () => {
      const response = { error: null };
      mockSignOut.mockResolvedValue(response);

      const result = await authService.signOut();

      expect(result).toEqual(response);
    });

    it("returns error response from supabase", async () => {
      const error = { message: "Sign out failed" };
      const response = { error };
      mockSignOut.mockResolvedValue(response);

      const result = await authService.signOut();

      expect(result).toEqual(response);
    });
  });
});
