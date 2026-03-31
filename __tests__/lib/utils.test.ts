import { describe, it, expect, vi } from "vitest";
import { cn, handlePay } from "@/lib/utils";

describe("Utils", () => {
  describe("cn function", () => {
    it("merges class names correctly", () => {
      const result = cn("px-2", "py-1");
      expect(result).toBe("px-2 py-1");
    });

    it("handles conflicting tailwind classes", () => {
      const result = cn("px-2 px-4");
      expect(result).toContain("px-4");
    });

    it("handles conditional classes", () => {
      const condition = true;
      const result = cn(condition && "bg-blue-500", "text-white");
      expect(result).toContain("bg-blue-500");
      expect(result).toContain("text-white");
    });

    it("filters out false values", () => {
      const result = cn("px-2", false && "px-4", null, "py-1");
      expect(result).toBe("px-2 py-1");
    });
  });

  describe("handlePay function", () => {
    it("should call alert with the correct message", () => {
      const alertSpy = vi.spyOn(global, "alert").mockImplementation(() => {});
      handlePay();
      expect(alertSpy).toHaveBeenCalledWith(
        "Función de pago no implementada aún.",
      );
      alertSpy.mockRestore();
    });

    it("should be callable without arguments", () => {
      const alertSpy = vi.spyOn(global, "alert").mockImplementation(() => {});
      expect(() => handlePay()).not.toThrow();
      alertSpy.mockRestore();
    });
  });
});
