import { createClient } from "@/lib/supabase/supabaseServer";

export type SavePaymentInput = {
  mp_payment_id: string;
  amount: number;
  status: string;
  user_id: string;
  payment_method?: string | null;
  payer_email?: string | null;
};

export async function savePayment(paymentData: SavePaymentInput) {
  console.log("🔥 SAVE PAYMENT START");

  const supabase = await createClient();

  const { data, error } = await supabase.from("payments").insert({
    mp_payment_id: paymentData.mp_payment_id,
    amount: paymentData.amount,
    status: paymentData.status,
    payment_method: paymentData.payment_method ?? null,
    payer_email: paymentData.payer_email ?? null,
    user_id: paymentData.user_id,
  });

  console.log("💾 INSERT RESULT:", { data, error });
}
