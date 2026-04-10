import { savePayment } from "@/lib/supabase/services";
import { MercadoPagoConfig, Payment } from "mercadopago";

export async function GET() {
  return Response.json({ message: "Webhook de MercadoPago activo." });
}

export async function POST(req: Request) {
  const body = await req.json();

  // MercadoPago envía { type: "payment", data: { id: "..." } }
  if (body.type !== "payment" || !body.data?.id) {
    return Response.json({ ok: true }, { status: 200 });
  }

  const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
  });

  const payment = new Payment(client);
  const paymentData = await payment.get({ id: body.data.id });

  if (paymentData.status !== "approved") {
    return Response.json({ ok: true }, { status: 200 });
  }

  const [userId, expenseId] = (paymentData.external_reference ?? "").split("|");
  const paymentMethod =
    paymentData.payment_method?.type ||
    paymentData.payment_method_id ||
    "unknown";
  const payerEmail = paymentData.payer?.email || null;

  try {
    await savePayment({
      mp_payment_id: String(paymentData.id),
      amount: paymentData.transaction_amount!,
      status: paymentData.status,
      user_id: userId,
      expense_id: expenseId ?? null,
      payment_method: paymentMethod,
      payer_email: payerEmail,
    });
  } catch (err) {
    console.error("❌ Webhook: error al guardar pago:", err);
    return Response.json({ ok: false }, { status: 500 });
  }

  return Response.json({ ok: true }, { status: 200 });
}
