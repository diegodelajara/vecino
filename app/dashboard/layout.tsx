import { redirect } from "next/navigation";
import {
  serverAuthService,
  serverProfilesService,
} from "@/lib/supabase/services";
import { UnitWithCondominium, UnitExpenseWithExpense } from "@/app/types";

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

  console.log(expensesData);

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 border-r p-4">
        <h2 className="font-bold">CondoApp</h2>

        <p className="text-sm mt-2">{profileData?.name || "Usuario"}</p>
        <p className="text-xs text-gray-500">{user?.email}</p>
        <p className="text-xs text-gray-500">{profileData?.role}</p>
      </aside>

      <main className="flex-1 p-6">{children}</main>

      <p>{profileData?.name}</p>
      <p>{user.email}</p>

      {unitData && (
        <>
          <p>Depto: {unitData.number}</p>
          <p>Torre: {unitData.tower}</p>
          <p>Condominio: {unitData.condominiums?.name}</p>
        </>
      )}
      {expensesData && expensesData.length > 0 ? (
        <div>
          <h3>Gastos del mes:</h3>
          <ul>
            {expensesData.map((expense) => (
              <li key={expense.id}>
                {expense.expenses?.month}/{expense.expenses?.year}: $
                {expense.amount} - {expense.status}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No hay gastos registrados.</p>
      )}
    </div>
  );
}
