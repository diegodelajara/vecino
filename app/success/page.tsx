"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id");
  const status = searchParams.get("status");

  const [phase, setPhase] = useState<"loading" | "ok" | "err">(() => {
    if (!paymentId) return "err";
    if (status && status !== "approved") return "err";
    return "loading";
  });

  const [detail, setDetail] = useState<string | null>(() => {
    if (!paymentId) {
      return "No encontramos el identificador del pago en la URL.";
    }
    if (status && status !== "approved") {
      return "El pago no fue aprobado.";
    }
    return null;
  });

  useEffect(() => {
    if (!paymentId || (status && status !== "approved")) {
      return;
    }

    let cancelled = false;

    const run = async () => {
      try {
        const res = await fetch("/api/confirm-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentId }),
        });
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        if (cancelled) return;
        if (!res.ok) {
          setPhase("err");
          setDetail(data.error ?? "No pudimos confirmar el pago.");
          return;
        }
        setPhase("ok");
      } catch {
        if (!cancelled) {
          setPhase("err");
          setDetail("Error de red al confirmar el pago.");
        }
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [paymentId, status]);

  if (phase === "loading") {
    return <div>Confirmando pago…</div>;
  }

  if (phase === "err") {
    return <div>{detail}</div>;
  }

  return <div>Pago confirmado</div>;
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Cargando…</div>}>
      <SuccessContent />
    </Suspense>
  );
}
