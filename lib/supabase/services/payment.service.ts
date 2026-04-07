import { createClient } from "@supabase/supabase-js";

export type SavePaymentInput = {
  mp_payment_id: string;
  amount: number;
  status: string;
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

  const insertData: Record<string, unknown> = {
    mp_payment_id: paymentData.mp_payment_id,
    amount: paymentData.amount,
    status: paymentData.status,
    user_id: paymentData.user_id,
    payment_method: paymentData.payment_method ?? null,
    payer_email: paymentData.payer_email ?? null,
  };

  if (paymentData.expense_id) insertData.expense_id = paymentData.expense_id;
  if (paymentData.unit_id) insertData.unit_id = paymentData.unit_id;

  const { data, error } = await supabase.from("payments").insert(insertData);

  console.log("💾 INSERT RESULT:", { data, error });

  if (error) {
    throw new Error(`Error al guardar el pago: ${error.message}`);
  }

  return data;
}
