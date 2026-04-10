import { describe, expect, it } from "vitest";
import { getFailureDescription } from "@/app/failure/page";

describe("getFailureDescription", () => {
  it("returns a friendly message for rejected payments with status detail", () => {
    expect(
      getFailureDescription("rejected", "cc_rejected_insufficient_amount"),
    ).toBe("La tarjeta no tiene fondos suficientes.");
  });

  it("returns the pending message when MercadoPago leaves the payment pending", () => {
    expect(getFailureDescription("pending", null)).toBe(
      "Tu pago quedo pendiente de confirmacion. Revisa mas tarde el estado en tu dashboard.",
    );
  });

  it("returns a generic rejected message when there is no status detail", () => {
    expect(getFailureDescription("rejected", null)).toBe(
      "Tu pago fue rechazado. Puedes volver al dashboard e intentarlo nuevamente.",
    );
  });
});
