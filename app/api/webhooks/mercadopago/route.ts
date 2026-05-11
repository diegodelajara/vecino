import { verifyMercadoPagoWebhookSignature } from "@/lib/mercadopago/webhook-signature";
import { savePayment } from "@/lib/supabase/services";
import { MercadoPagoConfig, Payment } from "mercadopago";

export async function GET() {
  return Response.json({ message: "Webhook de MercadoPago activo." });
}

function extractPaymentId(body: unknown, url: string) {
  const payload = body as {
    type?: string;
    topic?: string;
    data?: { id?: string | number };
    id?: string | number;
  };
  const searchParams = new URL(url).searchParams;

  const notificationType = payload?.type ?? payload?.topic ?? searchParams.get("type") ?? searchParams.get("topic");
  const candidateId =
    payload?.data?.id ??
    payload?.id ??
    searchParams.get("data.id") ??
    searchParams.get("id");

  const paymentId = candidateId != null ? String(candidateId) : null;

  if (notificationType !== "payment" || !paymentId) {
    return null;
  }

  return paymentId;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const paymentId = extractPaymentId(body, req.url);
    if (!paymentId) {
      return Response.json({ ok: true, ignored: true }, { status: 200 });
    }

    const isValidSignature = verifyMercadoPagoWebhookSignature(req, paymentId);
    if (!isValidSignature) {
      console.warn("⚠️ Webhook rechazado por firma invalida.", { paymentId });
      return Response.json({ ok: false, error: "Firma invalida" }, { status: 401 });
    }

    const client = new MercadoPagoConfig({
      accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
    });
    const payment = new Payment(client);
    const paymentData = await payment.get({ id: paymentId });

    const [userId, expenseId] = (paymentData.external_reference ?? "").split("|");
    if (!userId) {
      console.warn("⚠️ Webhook sin userId en external_reference:", paymentId);
      return Response.json({ ok: true, ignored: true }, { status: 200 });
    }

    const paymentMethod =
      paymentData.payment_method?.type ||
      paymentData.payment_method_id ||
      "unknown";
    const payerEmail = paymentData.payer?.email || null;

    await savePayment({
      mp_payment_id: String(paymentData.id),
      amount: Number(paymentData.transaction_amount ?? 0),
      status: paymentData.status ?? "unknown",
      status_detail: paymentData.status_detail ?? null,
      user_id: userId,
      expense_id: expenseId ?? null,
      payment_method: paymentMethod,
      payer_email: payerEmail,
    });

    console.log(
      "✅ Webhook procesado:",
      JSON.stringify({
        paymentId: paymentData.id,
        status: paymentData.status,
        statusDetail: paymentData.status_detail ?? null,
      }),
    );
  } catch (err) {
    console.error("❌ Webhook: error al guardar pago:", err);
    return Response.json({ ok: false }, { status: 500 });
  }

  return Response.json({ ok: true }, { status: 200 });
}
