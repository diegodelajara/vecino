import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/supabaseServer";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  //   const { data: expenses } = await supabase
  //     .from("unit_expenses")
  //     .select("*")
  //     .eq("unit_id", profile.unit_id);

  const { data } = await supabase.from("profiles").select("*");

  //   console.log("expenses", expenses);
  console.log("profile", data);

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 border-r p-4">
        <h2 className="font-bold">CondoApp</h2>

        {/* <p className="text-sm mt-2">{data.profile?.name || "Usuario"}</p> */}
        {/* <p className="text-xs text-gray-500">{user?.email}</p> */}
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
