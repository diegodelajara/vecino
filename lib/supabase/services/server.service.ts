import { createClient } from "../supabaseServer";

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
};
