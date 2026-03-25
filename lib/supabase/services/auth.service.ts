import { supabase } from "../supabaseClient";

export const authService = {
  async signInWithPassword(email: string, password: string) {
    return supabase.auth.signInWithPassword({ email, password });
  },

  async getUser() {
    return supabase.auth.getUser();
  },

  async signOut() {
    return supabase.auth.signOut();
  },
};
