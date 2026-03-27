import { Card } from "@/components/ui/card";

type Unit = {
  number?: string | null;
  tower?: string | null;
  condominiums?: { name?: string | null } | null;
};

type Props = {
  unit?: Unit | null;
};

export const DashboardUnitCard = ({ unit }: Props) => {
  if (!unit) return null;

  return (
    <Card className="bg-white dark:bg-slate-800">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Mi Unidad
        </h2>
        <div className="space-y-3">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              Departamento
            </p>
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              {unit.number || "—"}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              Torre
            </p>
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              {unit.tower || "—"}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              Condominio
            </p>
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              {unit.condominiums?.name || "—"}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
