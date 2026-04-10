"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";

type ExpenseRow = {
  id: string;
  amount: number;
  status: string;
  expenses?: { month: number; year: number };
};

type Props = {
  expenses: ExpenseRow[] | null;
  paidExpenseIds?: string[];
};

export const DashboardExpensesTable = ({
  expenses,
  paidExpenseIds = [],
}: Props) => {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handlePay = async (expenseId: string, amount: number) => {
    setLoadingId(expenseId);
    try {
      const res = await fetch("/api/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expenseId, amount }),
      });

      if (!res.ok) {
        router.refresh();
        return;
      }

      const data = await res.json();
      router.push(data.url);
    } finally {
      setLoadingId(null);
    }
  };

  if (!expenses || expenses.length === 0) {
    return (
      <Card className="bg-white dark:bg-slate-800 border-dashed">
        <div className="p-12 text-center">
          <p className="text-slate-500 dark:text-slate-400">
            No hay gastos registrados aún.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-white dark:bg-slate-800 overflow-hidden">
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Historial de Gastos Comunes
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-700/50">
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                Período
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                Monto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                Pagar
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {expenses.map((expense) => (
              <tr
                key={expense.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                  {expense.expenses?.month}/{expense.expenses?.year}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                  ${expense.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-3 py-1 inline-flex items-center rounded-full text-xs font-medium ${
                      expense.status === "paid"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}
                  >
                    {expense.status === "paid" ? "Pagado" : "Pendiente"}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                  {paidExpenseIds.includes(expense.id) ? (
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      Pagado
                    </span>
                  ) : (
                    <button
                      onClick={() => handlePay(expense.id, expense.amount)}
                      disabled={loadingId === expense.id}
                      className="bg-black text-white px-4 py-2 rounded flex items-center gap-2 disabled:opacity-60"
                    >
                      Pagar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
