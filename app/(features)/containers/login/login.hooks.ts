"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log("SESSION:", data.session);

    if (!error) {
      const { data: userData } = await supabase.auth.getUser();
      console.log("USER AFTER LOGIN:", userData);

      window.location.href = "/dashboard";
    }
  };

  return {
    error,
    email,
    handleLogin,
    loading,
    password,
    setEmail,
    setPassword,
  };
};
