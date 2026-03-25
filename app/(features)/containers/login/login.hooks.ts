"use client";

import { useState } from "react";
import { useAuth } from "@/lib/supabase/hooks";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, loading, error } = useAuth();

  const handleLogin = async () => {
    const result = await signIn(email, password);

    if (result.success) {
      window.location.href = "/dashboard";
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
