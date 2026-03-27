import { Card } from "@/components/ui/card";

type Expense = {
  amount: number;
};

type Props = {
  expenses: Expense[] | null;
};

export const DashboardSummaryCard = ({ expenses }: Props) => {
  const total = expenses?.reduce((sum, e) => sum + (e.amount || 0), 0) || 0;

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
          Resumen
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-white dark:bg-slate-800 p-3">
            <p className="text-xs text-blue-700 dark:text-blue-300 uppercase tracking-wide">
              Total de Gastos
            </p>
            <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
              ${total.toFixed(2)}
            </p>
          </div>
          <div className="rounded-lg bg-white dark:bg-slate-800 p-3">
            <p className="text-xs text-blue-700 dark:text-blue-300 uppercase tracking-wide">
              Registros
            </p>
            <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
              {expenses?.length || 0}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
