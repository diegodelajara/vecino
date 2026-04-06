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

  if (paymentData.status !== "approved") {
    return Response.json(
      { ok: false, error: "Pago no aprobado" },
      { status: 400 },
    );
  }

  await savePayment({
    mp_payment_id: String(paymentData.id),
    amount: paymentData.transaction_amount!,
    status: paymentData.status,
    user_id: paymentData.external_reference!,
  });

  console.log("paymentData", paymentData);

  return Response.json({ ok: true, payment: paymentData }, { status: 200 });
}
