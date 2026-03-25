import { supabase } from "../supabaseClient";

export const profilesService = {
  async getProfiles() {
    return supabase.from("profiles").select("*");
  },

  async getProfileById(id: string) {
    return supabase.from("profiles").select("*").eq("id", id).single();
  },

  async createProfile(profile: Record<string, unknown>) {
    return supabase.from("profiles").insert([profile]).single();
  },

  async updateProfile(id: string, profile: Record<string, unknown>) {
    return supabase.from("profiles").update(profile).eq("id", id).single();
  },

  async deleteProfile(id: string) {
    return supabase.from("profiles").delete().eq("id", id);
  },
};
