import { savePayment } from "@/lib/supabase/services";
import { MercadoPagoConfig, Payment } from "mercadopago";

export async function POST(req: Request) {
  const { paymentId } = await req.json();

  const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
  });

  const payment = new Payment(client);
  const paymentData = await payment.get({
    id: paymentId,
  });

  if (paymentData.status === "approved") {
    return Response.json(
      { ok: false, error: "Pago aprobado, usar confirm-payment" },
      { status: 400 },
    );
  }

  // Extraer user_id y expense_id del external_reference
  const [userId, expenseId] = (paymentData.external_reference ?? "").split("|");

  // Extraer payment_method y payer_email de MercadoPago
  const paymentMethod =
    paymentData.payment_method?.type ||
    paymentData.payment_method_id ||
    "unknown";
  const payerEmail = paymentData.payer?.email || null;

  try {
    await savePayment({
      mp_payment_id: String(paymentData.id),
      amount: paymentData.transaction_amount!,
      status: paymentData.status ?? "unknown",
      status_detail: paymentData.status_detail ?? null,
      user_id: userId,
      expense_id: expenseId ?? null,
      payment_method: paymentMethod,
      payer_email: payerEmail,
    });
  } catch (err) {
    console.error("❌ ERROR al guardar pago fallido:", err);
    return Response.json(
      { ok: false, error: "Error al guardar el pago fallido en la base de datos" },
      { status: 500 },
    );
  }

  return Response.json({ ok: true, payment: paymentData }, { status: 200 });
}
