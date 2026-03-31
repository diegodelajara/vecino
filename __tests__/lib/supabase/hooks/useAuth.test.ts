import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";

vi.mock("@/lib/supabase/services/auth.service", () => ({
  authService: {
    signInWithPassword: vi.fn(),
    getUser: vi.fn(),
    signOut: vi.fn(),
  },
}));

import { useAuth } from "@/lib/supabase/hooks/useAuth";
import * as authServiceModule from "@/lib/supabase/services/auth.service";

const mockSignInWithPassword = vi.fn();
const mockGetUser = vi.fn();
const mockSignOut = vi.fn();

describe("useAuth hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    const authService = (
      authServiceModule as typeof authServiceModule.authService
    ).authService;
    authService.signInWithPassword = mockSignInWithPassword;
    authService.getUser = mockGetUser;
    authService.signOut = mockSignOut;
  });

  it("returns hook with signIn, signOut, loading, and error", () => {
    const { result } = renderHook(() => useAuth());

    expect(typeof result.current.signIn).toBe("function");
    expect(typeof result.current.signOut).toBe("function");
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("initializes with loading false and error null", () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("handles successful sign in", async () => {
    mockSignInWithPassword.mockResolvedValue({
      data: { user: { id: "123" } },
      error: null,
    });
    mockGetUser.mockResolvedValue({
      data: { user: { id: "123", email: "test@example.com" } },
      error: null,
    });

    const { result } = renderHook(() => useAuth());

    let signInResult;
    await act(async () => {
      signInResult = await result.current.signIn(
        "test@example.com",
        "password",
      );
    });

    expect(signInResult).toEqual({
      success: true,
      data: { user: { id: "123", email: "test@example.com" } },
    });
    expect(result.current.error).toBeNull();
  });

  it("handles sign in error from authService", async () => {
    const error = { message: "Invalid credentials" };
    mockSignInWithPassword.mockResolvedValue({
      data: null,
      error: error,
    });

    const { result } = renderHook(() => useAuth());

    let signInResult;
    await act(async () => {
      signInResult = await result.current.signIn(
        "test@example.com",
        "wrongpassword",
      );
    });

    expect(signInResult).toEqual({
      success: false,
      error: error,
    });
    expect(result.current.error).toBe("Invalid credentials");
  });

  it("handles error when getting user", async () => {
    mockSignInWithPassword.mockResolvedValue({
      data: { user: { id: "123" } },
      error: null,
    });
    const getUserError = { message: "Failed to get user" };
    mockGetUser.mockResolvedValue({
      data: null,
      error: getUserError,
    });

    const { result } = renderHook(() => useAuth());

    let signInResult;
    await act(async () => {
      signInResult = await result.current.signIn(
        "test@example.com",
        "password",
      );
    });

    expect(signInResult).toEqual({
      success: false,
      error: getUserError,
    });
    expect(result.current.error).toBe("Failed to get user");
  });

  it("handles caught exception during sign in", async () => {
    mockSignInWithPassword.mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useAuth());

    let signInResult;
    await act(async () => {
      signInResult = await result.current.signIn(
        "test@example.com",
        "password",
      );
    });

    expect(signInResult?.success).toBe(false);
    expect(result.current.error).toBe("Network error");
  });

  it("handles caught exception with non-Error object", async () => {
    mockSignInWithPassword.mockRejectedValue("String error");

    const { result } = renderHook(() => useAuth());

    let signInResult;
    await act(async () => {
      signInResult = await result.current.signIn(
        "test@example.com",
        "password",
      );
    });

    expect(signInResult?.success).toBe(false);
    expect(result.current.error).toBe("Unknown error");
  });

  it("handles successful sign out", async () => {
    mockSignOut.mockResolvedValue({
      data: null,
      error: null,
    });

    const { result } = renderHook(() => useAuth());

    let signOutResult;
    await act(async () => {
      signOutResult = await result.current.signOut();
    });

    expect(signOutResult).toEqual({ success: true });
    expect(result.current.error).toBeNull();
  });

  it("handles sign out error", async () => {
    const error = { message: "Sign out failed" };
    mockSignOut.mockResolvedValue({
      data: null,
      error: error,
    });

    const { result } = renderHook(() => useAuth());

    let signOutResult;
    await act(async () => {
      signOutResult = await result.current.signOut();
    });

    expect(signOutResult).toEqual({
      success: false,
      error: error,
    });
    expect(result.current.error).toBe("Sign out failed");
  });

  it("handles caught exception during sign out", async () => {
    mockSignOut.mockRejectedValue(new Error("Sign out network error"));

    const { result } = renderHook(() => useAuth());

    let signOutResult;
    await act(async () => {
      signOutResult = await result.current.signOut();
    });

    expect(signOutResult?.success).toBe(false);
    expect(result.current.error).toBe("Sign out network error");
  });

  it("sets loading to true during async operations", async () => {
    mockSignInWithPassword.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ data: null, error: null }), 10),
        ),
    );
    mockGetUser.mockResolvedValue({ data: null, error: null });

    const { result } = renderHook(() => useAuth());

    expect(result.current.loading).toBe(false);

    act(() => {
      result.current.signIn("test@example.com", "password");
    });

    expect(result.current.loading).toBe(true);

    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(result.current.loading).toBe(false);
  });
});
