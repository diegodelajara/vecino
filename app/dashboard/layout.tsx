import { redirect } from "next/navigation";
import {
  serverAuthService,
  serverProfilesService,
} from "@/lib/supabase/services";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    data: { user },
  } = await serverAuthService.getUser();

  if (!user) {
    redirect("/");
  }

  const { data: profileData } = await serverProfilesService.getProfiles(
    user.id,
  );

  console.log("data", profileData);

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 border-r p-4">
        <h2 className="font-bold">CondoApp</h2>

        <p className="text-sm mt-2">{profileData?.name || "Usuario"}</p>
        <p className="text-xs text-gray-500">{user?.email}</p>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
