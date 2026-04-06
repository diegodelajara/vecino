"use client";
import React, { useEffect } from "react";

export const ApprovedPayment = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const paymentId = params.get("payment_id");
    const status = params.get("status");

    if (status === "approved" && paymentId) {
      fetch("/api/confirm-payment", {
        method: "POST",
        body: JSON.stringify({ paymentId }),
      });
    }
  }, []);
  return <div>index</div>;
};
