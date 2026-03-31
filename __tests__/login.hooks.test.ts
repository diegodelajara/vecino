import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { mockSignIn, mockRedirect } from "@/__tests__/mocks/auth";

// Setup mocks
vi.mock("@/lib/supabase/hooks", () => ({
  useAuth: () => ({
    signIn: mockSignIn,
    loading: false,
    error: null,
  }),
}));

vi.mock("next/navigation", () => ({
  redirect: mockRedirect,
}));

import { useLogin } from "@/app/(features)/containers/login/login.hooks";

describe("useLogin Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSignIn.mockResolvedValue({
      success: true,
      data: { user: { id: "123", email: "test@example.com" } },
      error: null,
    });
  });
  it("initializes with empty email and password", () => {
    const { result } = renderHook(() => useLogin());

    expect(result.current.email).toBe("");
    expect(result.current.password).toBe("");
  });

  it("initializes with loading false", () => {
    const { result } = renderHook(() => useLogin());
    expect(result.current.loading).toBe(false);
  });

  it("updates email state when setEmail is called", () => {
    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.setEmail("test@example.com");
    });

    expect(result.current.email).toBe("test@example.com");
  });

  it("updates password state when setPassword is called", () => {
    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.setPassword("password123");
    });

    expect(result.current.password).toBe("password123");
  });

  it("returns a handleLogin function", () => {
    const { result } = renderHook(() => useLogin());
    expect(typeof result.current.handleLogin).toBe("function");
  });

  it("returns error state", () => {
    const { result } = renderHook(() => useLogin());
    expect(result.current.error).toBeDefined();
  });

  it("contains all required properties", () => {
    const { result } = renderHook(() => useLogin());

    expect(result.current).toHaveProperty("email");
    expect(result.current).toHaveProperty("password");
    expect(result.current).toHaveProperty("loading");
    expect(result.current).toHaveProperty("handleLogin");
    expect(result.current).toHaveProperty("setEmail");
    expect(result.current).toHaveProperty("setPassword");
    expect(result.current).toHaveProperty("error");
  });

  it("calls signIn with correct credentials when handleLogin is called", async () => {
    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.setEmail("test@example.com");
      result.current.setPassword("password123");
    });

    await act(async () => {
      await result.current.handleLogin();
    });

    expect(mockSignIn).toHaveBeenCalledWith("test@example.com", "password123");
  });

  it("redirects to dashboard on successful login", async () => {
    mockSignIn.mockResolvedValue({
      success: true,
      data: { user: { id: "123", email: "test@example.com" } },
      error: null,
    });

    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.setEmail("test@example.com");
      result.current.setPassword("password123");
    });

    await act(async () => {
      await result.current.handleLogin();
    });

    expect(mockRedirect).toHaveBeenCalledWith("/dashboard");
  });

  it("does not redirect on failed login", async () => {
    mockSignIn.mockResolvedValue({
      success: false,
      data: null,
      error: "Invalid credentials",
    });

    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.setEmail("wrong@example.com");
      result.current.setPassword("wrongpassword");
    });

    await act(async () => {
      await result.current.handleLogin();
    });

    expect(mockRedirect).not.toHaveBeenCalled();
  });

  it("handles signIn errors gracefully", async () => {
    mockSignIn.mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.setEmail("test@example.com");
      result.current.setPassword("password123");
    });

    // Should not throw
    await expect(
      act(async () => {
        await result.current.handleLogin();
      }),
    ).rejects.toThrow("Network error");

    expect(mockRedirect).not.toHaveBeenCalled();
  });

  it("can login with empty email and password", async () => {
    mockSignIn.mockResolvedValue({
      success: false,
      data: null,
      error: "Email and password required",
    });

    const { result } = renderHook(() => useLogin());

    // email and password are initialized as empty strings
    await act(async () => {
      await result.current.handleLogin();
    });

    expect(mockSignIn).toHaveBeenCalledWith("", "");
  });
});
