import type { ReactNode } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export interface QuickAction {
  label: string;
  icon: ReactNode;
  onClick?: () => void;
}

export function QuickActions({ title = "Quick Actions", actions }: { title?: string; actions: QuickAction[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {actions.map((action) => (
            <button
              key={action.label}
              onClick={action.onClick}
              className="flex flex-col items-center gap-2 rounded-lg border border-border-default p-4 text-center hover:bg-surface-elevated"
            >
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                {action.icon}
              </span>
              <span className="text-xs font-medium text-text-primary">{action.label}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
