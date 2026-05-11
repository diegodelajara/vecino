import { createClient } from "@supabase/supabase-js";

export type SavePaymentInput = {
  mp_payment_id: string;
  amount: number;
  status: string;
  status_detail?: string | null;
  user_id: string;
  expense_id?: string | null;
  payment_method?: string | null;
  payer_email?: string | null;
  unit_id?: string | null;
};

export async function savePayment(paymentData: SavePaymentInput) {
  console.log("🔥 SAVE PAYMENT START");

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { data: existing } = await supabase
    .from("payments")
    .select("id")
    .eq("mp_payment_id", paymentData.mp_payment_id)
    .single();

  if (existing) return;

  const insertData: Record<string, unknown> = {
    mp_payment_id: paymentData.mp_payment_id,
    amount: paymentData.amount,
    status: paymentData.status,
    status_detail: paymentData.status_detail ?? null,
    user_id: paymentData.user_id,
    payment_method: paymentData.payment_method ?? null,
    payer_email: paymentData.payer_email ?? null,
  };

  if (paymentData.expense_id) insertData.expense_id = paymentData.expense_id;
  if (paymentData.unit_id) insertData.unit_id = paymentData.unit_id;

  const { data, error } = await supabase.from("payments").upsert(insertData, {
    onConflict: "mp_payment_id",
    ignoreDuplicates: true,
  });
  console.log(
    "💰 PAYMENT SAVED:",
    paymentData.mp_payment_id,
    `(${paymentData.status})`,
  );

  if (error) {
    throw new Error(`Error al guardar el pago: ${error.message}`);
  }

  if (paymentData.expense_id && paymentData.status === "approved") {
    const { data: profile } = await supabase
      .from("profiles")
      .select("unit_id")
      .eq("id", paymentData.user_id)
      .single();

    if (profile?.unit_id) {
      const { error: updateError } = await supabase
        .from("unit_expenses")
        .update({ status: "paid" })
        .eq("expense_id", paymentData.expense_id)
        .eq("unit_id", profile.unit_id);

      if (updateError) {
        console.error(
          "⚠️ No se pudo actualizar unit_expenses:",
          updateError.message,
        );
      }
    }
  }

  return data;
}

export async function getApprovedExpenseIds(
  expenseIds: string[],
): Promise<string[]> {
  if (!expenseIds.length) return [];

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { data } = await supabase
    .from("payments")
    .select("expense_id")
    .in("expense_id", expenseIds)
    .eq("status", "approved");

  return (data ?? []).map((p) => p.expense_id).filter(Boolean);
}
