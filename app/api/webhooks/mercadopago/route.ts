export async function POST(req: Request) {
  console.log("🔥 WEBHOOK HIT");

  const body = await req.json();
  console.log("📩 WEBHOOK:", body);
  console.log("CREANDO PAGO CON URL:", process.env.NEXT_PUBLIC_BASE_URL);

  return Response.json({ ok: true });
}
