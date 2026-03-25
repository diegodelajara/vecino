"use client";

import { useState } from "react";
import { authService } from "../services/auth.service";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: supabaseError } =
        await authService.signInWithPassword(email, password);

      if (supabaseError) {
        setError(supabaseError.message);
        return { success: false, error: supabaseError };
      }

      // Get updated user info
      const { data: userData, error: userError } = await authService.getUser();

      if (userError) {
        setError(userError.message);
        return { success: false, error: userError };
      }

      return { success: true, data: userData };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    setError(null);
    try {
      const { error: supabaseError } = await authService.signOut();

      if (supabaseError) {
        setError(supabaseError.message);
        return { success: false, error: supabaseError };
      }

      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  return {
    signIn,
    signOut,
    loading,
    error,
  };
};
