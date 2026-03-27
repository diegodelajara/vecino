import { createClient } from "../supabaseServer";
import { UnitWithCondominium, UnitExpenseWithExpense } from "../database.types";
import { PostgrestError } from "@supabase/supabase-js";

export const serverAuthService = {
  async createClient() {
    return createClient();
  },

  async getUser() {
    const supabase = await createClient();
    return supabase.auth.getUser();
  },
};

export const serverProfilesService = {
  async getProfiles(id: string) {
    const supabase = await createClient();
    return supabase.from("profiles").select("*").eq("id", id).single();
  },

  async getProfileById(id: string) {
    const supabase = await createClient();
    return supabase.from("profiles").select("*").eq("id", id).single();
  },

  async createProfile(profile: Record<string, unknown>) {
    const supabase = await createClient();
    return supabase.from("profiles").insert([profile]).single();
  },

  async updateProfile(id: string, profile: Record<string, unknown>) {
    const supabase = await createClient();
    return supabase.from("profiles").update(profile).eq("id", id).single();
  },

  async deleteProfile(id: string) {
    const supabase = await createClient();
    return supabase.from("profiles").delete().eq("id", id);
  },

  async getUnit(id: string): Promise<{
    data: UnitWithCondominium | null;
    error: PostgrestError | null;
  }> {
    const supabase = await createClient();
    return supabase
      .from("units")
      .select(`*,condominiums (*)`)
      .eq("id", id)
      .single();
  },

  async getExpenses(id: string): Promise<{
    data: UnitExpenseWithExpense[] | null;
    error: PostgrestError | null;
  }> {
    const supabase = await createClient();
    return supabase
      .from("unit_expenses")
      .select(`amount,status,expenses (month, year)`)
      .eq("unit_id", id)
      .single();
  },
};
