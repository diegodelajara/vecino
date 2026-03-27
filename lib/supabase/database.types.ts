// Database types for Supabase tables
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name?: string;
          role?: string;
          unit_id?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name?: string;
          role?: string;
          unit_id?: string;
        };
        Update: {
          name?: string;
          role?: string;
          unit_id?: string;
        };
      };
      units: {
        Row: {
          id: string;
          number: string;
          tower: string;
          condominium_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          number: string;
          tower: string;
          condominium_id: string;
        };
        Update: {
          number?: string;
          tower?: string;
          condominium_id?: string;
        };
      };
      condominiums: {
        Row: {
          id: string;
          name: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
        };
        Update: {
          name?: string;
        };
      };
      expenses: {
        Row: {
          id: string;
          month: number;
          year: number;
          description?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          month: number;
          year: number;
          description?: string;
        };
        Update: {
          month?: number;
          year?: number;
          description?: string;
        };
      };
      unit_expenses: {
        Row: {
          id: string;
          unit_id: string;
          expense_id: string;
          amount: number;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          unit_id: string;
          expense_id: string;
          amount: number;
          status: string;
        };
        Update: {
          amount?: number;
          status?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Type helpers
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];

// Specific types for your app
export type Profile = Tables<"profiles">;
export type Unit = Tables<"units">;
export type Condominium = Tables<"condominiums">;
export type Expense = Tables<"expenses">;
export type UnitExpense = Tables<"unit_expenses">;

// Extended types for joins
export interface UnitWithCondominium extends Unit {
  condominiums?: Condominium;
}

export interface UnitExpenseWithExpense extends UnitExpense {
  expenses?: Pick<Expense, "month" | "year">;
}
