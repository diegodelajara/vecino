import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock Supabase SSR
vi.mock("@supabase/ssr", () => ({
  createServerClient: vi.fn(),
}));

// Mock Next.js cookies
vi.mock("next/headers", () => ({
  cookies: vi.fn(),
}));

import { createClient } from "@/lib/supabase/supabaseServer";
import * as supabaseModule from "@supabase/ssr";
import * as headersModule from "next/headers";

const mockCreateServerClient = supabaseModule.createServerClient as ReturnType<
  typeof vi.fn
>;
const mockCookies = headersModule.cookies as ReturnType<typeof vi.fn>;
const mockCookieStore = {
  get: vi.fn(),
  set: vi.fn(),
};

describe("supabaseServer.ts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockCookies.mockResolvedValue(mockCookieStore);
    mockCreateServerClient.mockReturnValue({
      auth: {
        signOut: vi.fn(),
      },
    });
  });

  it("creates a supabase server client", async () => {
    await createClient();
    expect(mockCreateServerClient).toHaveBeenCalled();
  });

  it("initializes cookies", async () => {
    await createClient();
    expect(mockCookies).toHaveBeenCalled();
  });

  it("passes supabase URL and key to createServerClient", async () => {
    await createClient();
    const callArgs = mockCreateServerClient.mock.calls[0];
    expect(callArgs[0]).toBe(process.env.NEXT_PUBLIC_SUPABASE_URL);
    expect(callArgs[1]).toBe(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  });

  it("configures cookies object with get method", async () => {
    await createClient();
    const callArgs = mockCreateServerClient.mock.calls[0];
    const cookiesConfig = callArgs[2].cookies;

    expect(typeof cookiesConfig.get).toBe("function");
  });

  it("configures cookies object with set method", async () => {
    await createClient();
    const callArgs = mockCreateServerClient.mock.calls[0];
    const cookiesConfig = callArgs[2].cookies;

    expect(typeof cookiesConfig.set).toBe("function");
  });

  it("configures cookies object with remove method", async () => {
    await createClient();
    const callArgs = mockCreateServerClient.mock.calls[0];
    const cookiesConfig = callArgs[2].cookies;

    expect(typeof cookiesConfig.remove).toBe("function");
  });

  it("get method retrieves cookie value", async () => {
    mockCookieStore.get.mockReturnValue({ value: "test-value" });

    await createClient();
    const callArgs = mockCreateServerClient.mock.calls[0];
    const cookiesConfig = callArgs[2].cookies;
    const result = cookiesConfig.get("test-name");

    expect(result).toBe("test-value");
    expect(mockCookieStore.get).toHaveBeenCalledWith("test-name");
  });

  it("get method returns undefined when cookie not found", async () => {
    mockCookieStore.get.mockReturnValue(undefined);

    await createClient();
    const callArgs = mockCreateServerClient.mock.calls[0];
    const cookiesConfig = callArgs[2].cookies;
    const result = cookiesConfig.get("nonexistent");

    expect(result).toBeUndefined();
  });

  it("set method sets a cookie value", async () => {
    await createClient();
    const callArgs = mockCreateServerClient.mock.calls[0];
    const cookiesConfig = callArgs[2].cookies;

    cookiesConfig.set("test-name", "test-value", { maxAge: 3600 });

    expect(mockCookieStore.set).toHaveBeenCalledWith(
      "test-name",
      "test-value",
      { maxAge: 3600 },
    );
  });

  it("set method handles errors gracefully", async () => {
    mockCookieStore.set.mockImplementation(() => {
      throw new Error("Cookie set error");
    });

    await createClient();
    const callArgs = mockCreateServerClient.mock.calls[0];
    const cookiesConfig = callArgs[2].cookies;

    // Should not throw
    expect(() => cookiesConfig.set("test", "value")).not.toThrow();
  });

  it("remove method removes a cookie", async () => {
    await createClient();
    const callArgs = mockCreateServerClient.mock.calls[0];
    const cookiesConfig = callArgs[2].cookies;

    cookiesConfig.remove("test-name", { maxAge: 0 });

    expect(mockCookieStore.set).toHaveBeenCalledWith("test-name", "", {
      maxAge: 0,
    });
  });

  it("remove method handles errors gracefully", async () => {
    mockCookieStore.set.mockImplementation(() => {
      throw new Error("Cookie remove error");
    });

    await createClient();
    const callArgs = mockCreateServerClient.mock.calls[0];
    const cookiesConfig = callArgs[2].cookies;

    // Should not throw
    expect(() => cookiesConfig.remove("test-name")).not.toThrow();
  });

  it("returns the created supabase client", async () => {
    const mockClient = { auth: { signOut: vi.fn() } };
    mockCreateServerClient.mockReturnValue(mockClient);

    const result = await createClient();

    expect(result).toBe(mockClient);
  });
});
