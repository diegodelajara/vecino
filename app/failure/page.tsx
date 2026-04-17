"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const statusDetailMessages: Record<string, string> = {
  cc_rejected_bad_filled_card_number:
    "El numero de tarjeta ingresado no es valido.",
  cc_rejected_bad_filled_date:
    "La fecha de vencimiento ingresada no es valida.",
  cc_rejected_bad_filled_other:
    "Revisa los datos de pago ingresados e intentalo nuevamente.",
  cc_rejected_bad_filled_security_code:
    "El codigo de seguridad ingresado no es valido.",
  cc_rejected_blacklist:
    "No fue posible procesar el pago con este medio de pago.",
  cc_rejected_call_for_authorize:
    "Debes autorizar el pago con el banco emisor de la tarjeta.",
  cc_rejected_card_disabled:
    "La tarjeta esta inactiva. Contacta a tu banco o usa otro medio de pago.",
  cc_rejected_card_error:
    "No fue posible procesar la tarjeta. Intenta nuevamente.",
  cc_rejected_duplicated_payment:
    "Ya existe un pago muy similar reciente. Espera unos minutos antes de reintentar.",
  cc_rejected_high_risk:
    "MercadoPago rechazo el pago por validaciones de seguridad.",
  cc_rejected_insufficient_amount: "La tarjeta no tiene fondos suficientes.",
  cc_rejected_invalid_installments:
    "La cantidad de cuotas seleccionada no es valida para este medio de pago.",
  cc_rejected_max_attempts:
    "Se alcanzo el maximo de intentos permitidos. Prueba mas tarde.",
  cc_rejected_other_reason:
    "El pago fue rechazado. Intenta con otro medio de pago.",
};

export function getFailureDescription(
  status: string | null,
  statusDetail: string | null,
) {
  if (status === "pending") {
    return "Tu pago quedo pendiente de confirmacion. Revisa mas tarde el estado en tu dashboard.";
  }

  if (statusDetail && statusDetailMessages[statusDetail]) {
    return statusDetailMessages[statusDetail];
  }

  if (status === "rejected") {
    return "Tu pago fue rechazado. Puedes volver al dashboard e intentarlo nuevamente.";
  }

  return "No pudimos confirmar tu pago. Vuelve al dashboard para revisar el estado del gasto.";
}

export function FailureContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialStatus = searchParams.get("status");
  const initialStatusDetail = searchParams.get("status_detail");
  const paymentId = searchParams.get("payment_id");
  const [status, setStatus] = useState(initialStatus);
  const [statusDetail, setStatusDetail] = useState(initialStatusDetail);

  useEffect(() => {
    if (!paymentId || initialStatusDetail) {
      return;
    }

    let cancelled = false;

    const fetchPaymentStatus = async () => {
      try {
        const res = await fetch(
          `/api/payment-status?paymentId=${encodeURIComponent(paymentId)}`,
        );

        if (!res.ok) {
          return;
        }

        const data = await res.json();

        if (!cancelled) {
          setStatus(data.payment?.status ?? initialStatus);
          setStatusDetail(data.payment?.status_detail ?? null);
        }
      } catch {
        // Si falla la consulta, mantenemos el mensaje generico de rechazo.
      }
    };

    void fetchPaymentStatus();

    return () => {
      cancelled = true;
    };
  }, [initialStatus, initialStatusDetail, paymentId]);

  useEffect(() => {
    if (!paymentId || status === "approved") {
      return;
    }

    const saveFailedPayment = async () => {
      try {
        await fetch("/api/confirm-failure-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentId }),
        });
      } catch {
        // Si falla, mantenemos la UX de pantalla de fallo y evitamos romper la navegación.
      }
    };

    void saveFailedPayment();
  }, [paymentId, status]);

  const description = getFailureDescription(status, statusDetail);

  return (
    <div className="min-h-screen bg-linear-to-br from-rose-50 via-white to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center px-6 py-16">
        <div className="w-full rounded-3xl border border-rose-100 bg-white/90 p-8 shadow-xl shadow-rose-100/50 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-none">
          <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300">
            <AlertCircle className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
            No se pudo completar el pago
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            {description}
          </p>
          {paymentId ? (
            <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
              Referencia de pago: {paymentId}
            </p>
          ) : null}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              className="bg-slate-900 text-white hover:bg-slate-800"
              onClick={() => router.push("/dashboard")}
            >
              Volver al inicio
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FailurePage() {
  return (
    <Suspense
      fallback={<div className="min-h-screen bg-white dark:bg-slate-950" />}
    >
      <FailureContent />
    </Suspense>
  );
}
