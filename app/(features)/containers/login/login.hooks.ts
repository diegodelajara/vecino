"use client";

import { useState } from "react";
import { useAuth } from "@/lib/supabase/hooks";
import { redirect } from "next/navigation";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, loading, error } = useAuth();

  const handleLogin = async () => {
    const result = await signIn(email, password);

    if (result.success) {
      redirect("/dashboard");
    }
  };

  return {
    email,
    handleLogin,
    loading,
    password,
    setEmail,
    setPassword,
    error,
  };
};
