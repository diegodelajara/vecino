import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Menu } from "../menu";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardProfileCard } from "./DashboardProfileCard";
import { redirect } from "next/navigation";
import {
  serverAuthService,
  serverProfilesService,
} from "@/lib/supabase/services";
import { DashboardUnitCard } from "./DashboardUnitCard";
import { DashboardSummaryCard } from "./DashboardSummaryCard";
import { DashboardExpensesTable } from "./DashboardExpensesTable";
import { ApprovedPayment } from "../payment/approved";

export const DashboardContainer = async () => {
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
    <SidebarProvider>
      <Menu />
      <SidebarInset>
        <DashboardHeader name={profileData?.name} email={user?.email} />
        <div className="flex flex-1 flex-col gap-4 p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
          <div className="max-w-7xl mx-auto w-full">
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
          </div>
        </div>
      </SidebarInset>
      <ApprovedPayment />
    </SidebarProvider>
  );
};
