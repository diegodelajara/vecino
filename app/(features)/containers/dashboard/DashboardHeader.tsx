"use client";

import { Button } from "@/components/ui/button";
import { logout } from "../../../dashboard/actions";
import { SidebarTrigger } from "@/components/ui/sidebar";

type Props = {
  name?: string | null;
  email?: string | null;
};

export function DashboardHeader({ name, email }: Props) {
  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="-ml-1" />
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">🏢</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            CondoApp
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              {name || "Usuario"}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {email}
            </p>
          </div>
          <form action={logout}>
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
            >
              Cerrar sesión
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}
