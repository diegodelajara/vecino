import { MercadoPagoConfig, Preference } from "mercadopago";

export async function GET() {
  return Response.json({ message: "Endpoint de pago disponible. Usa POST." });
}

export async function POST() {
  const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const preference = new Preference(client);
  const result = await preference.create({
    body: {
      items: [
        {
          id: "1",
          title: "Gastos comunes",
          quantity: 1,
          unit_price: 100000,
        },
      ],
      external_reference: "user_123_expense_456",
      back_urls: {
        success: `${baseUrl}/success`,
        failure: `${baseUrl}/failure`,
        pending: `${baseUrl}/dashboard`,
      },
    },
  });

  console.log("MP RESULT:", result);

  return Response.json({
    url: result.init_point,
  });
}
