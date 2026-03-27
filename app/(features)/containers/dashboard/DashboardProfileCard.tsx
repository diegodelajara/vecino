import { Card } from "@/components/ui/card";

type Props = {
  name?: string | null;
  role?: string | null;
  email?: string | null;
};

export const DashboardProfileCard = ({ name, role, email }: Props) => {
  return (
    <Card className="bg-white dark:bg-slate-800">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Mi Perfil
        </h2>
        <div className="space-y-3">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              Nombre
            </p>
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              {name || "—"}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              Rol
            </p>
            <p className="text-sm font-medium text-slate-900 dark:text-white capitalize">
              {role || "—"}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              Email
            </p>
            <p className="text-sm font-medium text-slate-900 dark:text-white break-all">
              {email || "—"}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
