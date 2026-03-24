"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
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
    setLoading(false);
  };

  return {
    email,
    handleLogin,
    loading,
    password,
    setEmail,
    setPassword,
  };
};
