// src/app/api/pay/route.ts

import { serverAuthService, serverProfilesService } from "@/lib/supabase/services";
import { MercadoPagoConfig, Preference } from "mercadopago";

export async function POST(req: Request) {
  const { expenseId, amount } = await req.json();

  const {
    data: { user },
  } = await serverAuthService.getUser();

  // Verificar si el gasto ya está pagado
  const { data: profile } = await serverProfilesService.getProfileById(user!.id);

  if (profile?.unit_id) {
    const { status } = await serverProfilesService.getUnitExpenseStatus(expenseId, profile.unit_id);

    if (status === "paid") {
      return Response.json(
        { error: "Este gasto ya fue pagado" },
        { status: 400 },
      );
    }
  }

  const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const preference = new Preference(client);
  const result = await preference.create({
    body: {
      items: [
        {
          id: expenseId,
          title: "Gastos comunes",
          quantity: 1,
          unit_price: amount,
        },
      ],
      external_reference: `${user?.id}|${expenseId}`,
      back_urls: {
        success: `${baseUrl}/success`,
        failure: `${baseUrl}/failure`,
        pending: `${baseUrl}/dashboard`,
      },
      auto_return: "approved",
      notification_url: `${baseUrl}/api/webhooks/mercadopago`,
    },
  });

  return Response.json({
    url: result.init_point,
  });
}
