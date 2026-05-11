import { createHmac, timingSafeEqual } from "crypto";

type SignatureParts = {
  ts: string | null;
  v1: string | null;
};

function parseSignatureHeader(signatureHeader: string | null): SignatureParts {
  if (!signatureHeader) {
    return { ts: null, v1: null };
  }

  const values = signatureHeader
    .split(",")
    .map((part) => part.trim())
    .reduce<Record<string, string>>((acc, entry) => {
      const [rawKey, rawValue] = entry.split("=");
      if (!rawKey || !rawValue) return acc;
      acc[rawKey.trim()] = rawValue.trim();
      return acc;
    }, {});

  return {
    ts: values.ts ?? null,
    v1: values.v1 ?? null,
  };
}

function safeCompareHex(a: string, b: string) {
  try {
    const aBuffer = Buffer.from(a, "hex");
    const bBuffer = Buffer.from(b, "hex");
    if (aBuffer.length !== bBuffer.length) return false;
    return timingSafeEqual(aBuffer, bBuffer);
  } catch {
    return false;
  }
}

export function verifyMercadoPagoWebhookSignature(
  req: Request,
  paymentId: string,
) {
  const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "⚠️ MERCADOPAGO_WEBHOOK_SECRET no definido. Se omite validacion de firma en development.",
      );
      return true;
    }
    return false;
  }

  const signatureHeader = req.headers.get("x-signature");
  const requestId = req.headers.get("x-request-id");
  const { ts, v1 } = parseSignatureHeader(signatureHeader);

  if (!ts || !v1 || !requestId) {
    return false;
  }

  const manifest = `id:${paymentId};request-id:${requestId};ts:${ts};`;
  const expected = createHmac("sha256", secret).update(manifest).digest("hex");

  return safeCompareHex(v1, expected);
}
