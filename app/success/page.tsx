"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id");
  const status = searchParams.get("status");
  const router = useRouter();

  useEffect(() => {
    if (!paymentId || (status && status !== "approved")) {
      router.replace("/dashboard");
      return;
    }

    let cancelled = false;

    const run = async () => {
      try {
        await fetch("/api/confirm-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentId }),
        });
      } finally {
        if (!cancelled) router.replace("/dashboard");
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [paymentId, status, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Loader2 className="h-10 w-10 animate-spin text-slate-600 dark:text-slate-300" />
      <p className="text-slate-600 dark:text-slate-300 text-sm">
        Confirmando tu pago…
      </p>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-slate-600" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
