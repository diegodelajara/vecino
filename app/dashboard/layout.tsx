import { redirect } from "next/navigation";
import {
  serverAuthService,
  serverProfilesService,
} from "@/lib/supabase/services";
import {
  DashboardExpensesTable,
  DashboardProfileCard,
  DashboardSummaryCard,
  DashboardUnitCard,
  DashboardHeader,
} from "../(features)/containers";

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

  const { data: unitData } = await serverProfilesService.getUnit(
    profileData?.unit_id,
  );

  const { data: expensesData } = await serverProfilesService.getExpenses(
    profileData?.unit_id,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <DashboardHeader name={profileData?.name} email={user?.email} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <DashboardProfileCard
            name={profileData?.name}
            role={profileData?.role}
            email={user?.email}
          />
          <DashboardUnitCard unit={unitData ?? null} />
          <DashboardSummaryCard expenses={expensesData ?? null} />
        </div>

        <DashboardExpensesTable expenses={expensesData ?? null} />

        {/* Page Content */}
        <div className="mt-8">{children}</div>
      </main>
    </div>
  );
}
