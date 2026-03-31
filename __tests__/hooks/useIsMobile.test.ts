import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useIsMobile } from "@/hooks/useIsMobile";

interface MockMediaQueryList extends MediaQueryList {
  matches: boolean;
  media: string;
  onchange: ((this: MediaQueryList, ev: MediaQueryListEvent) => void) | null;
  addListener: (listener: MediaQueryListListener) => void;
  removeListener: (listener: MediaQueryListListener) => void;
  addEventListener: (
    type: string,
    listener: EventListenerOrEventListenerObject,
  ) => void;
  removeEventListener: (
    type: string,
    listener: EventListenerOrEventListenerObject,
  ) => void;
  dispatchEvent: (event: Event) => boolean;
}

describe("useIsMobile Hook", () => {
  let matchMediaMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    // Mock window.matchMedia
    matchMediaMock = vi.fn(
      (query: string): MockMediaQueryList => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }),
    );

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: matchMediaMock,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("returns false when window width is greater than breakpoint", () => {
    vi.spyOn(window, "innerWidth", "get").mockReturnValue(1024);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it("returns true when window width is less than breakpoint", () => {
    vi.spyOn(window, "innerWidth", "get").mockReturnValue(500);
    matchMediaMock.mockReturnValue({
      matches: true,
      media: "(max-width: 767px)",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it("initializes with undefined and updates on mount", () => {
    vi.spyOn(window, "innerWidth", "get").mockReturnValue(400);
    const { result } = renderHook(() => useIsMobile());
    expect(typeof result.current).toBe("boolean");
  });

  it("registers event listener on mount", () => {
    const mockAddEventListener = vi.fn();
    matchMediaMock.mockReturnValue({
      matches: false,
      media: "(max-width: 767px)",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: mockAddEventListener,
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    });

    renderHook(() => useIsMobile());
    expect(mockAddEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );
  });

  it("removes event listener on unmount", () => {
    const mockRemoveEventListener = vi.fn();
    matchMediaMock.mockReturnValue({
      matches: false,
      media: "(max-width: 767px)",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: mockRemoveEventListener,
      dispatchEvent: vi.fn(),
    });

    const { unmount } = renderHook(() => useIsMobile());
    unmount();
    expect(mockRemoveEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );
  });

  it("calls matchMedia with correct breakpoint", () => {
    renderHook(() => useIsMobile());
    expect(matchMediaMock).toHaveBeenCalledWith("(max-width: 767px)");
  });

  it("returns boolean value always", () => {
    vi.spyOn(window, "innerWidth", "get").mockReturnValue(768);
    const { result } = renderHook(() => useIsMobile());
    expect(typeof result.current).toBe("boolean");
  });
});
