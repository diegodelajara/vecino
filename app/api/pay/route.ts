// src/app/api/pay/route.ts

import { MercadoPagoConfig, Preference } from "mercadopago";

export async function POST() {
  const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
  });

  const preference = new Preference(client);
  const result = await preference.create({
    body: {
      items: [
        {
          id: "1",
          title: "Gastos comunes",
          quantity: 1,
          unit_price: 85000,
        },
      ],
      back_urls: {
        success: "http://localhost:3000/dashboard",
        failure: "http://localhost:3000/dashboard",
        pending: "http://localhost:3000/dashboard",
      },
    },
  });

  return Response.json({
    url: result.init_point,
  });
}
