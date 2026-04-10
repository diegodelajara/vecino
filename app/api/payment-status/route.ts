import { MercadoPagoConfig, Payment } from "mercadopago";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const paymentId = searchParams.get("paymentId");

  if (!paymentId) {
    return Response.json(
      { ok: false, error: "paymentId es requerido" },
      { status: 400 },
    );
  }

  try {
    const client = new MercadoPagoConfig({
      accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
    });

    const payment = new Payment(client);
    const paymentData = await payment.get({ id: paymentId });
    console.log("✅ Estado del pago consultado:", paymentData);
    return Response.json(
      {
        ok: true,
        payment: {
          id: paymentData.id,
          status: paymentData.status ?? null,
          status_detail: paymentData.status_detail ?? null,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("❌ ERROR al consultar estado del pago:", error);
    return Response.json(
      { ok: false, error: "No se pudo consultar el estado del pago" },
      { status: 500 },
    );
  }
}
