import type { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface StatCardProps {
  label: string;
  value: string;
  icon?: ReactNode;
  change?: { value: string; trend: "up" | "down" };
  className?: string;
}

export function StatCard({ label, value, icon, change, className }: StatCardProps) {
  return (
    <Card className={cn("p-5", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-text-muted">{label}</p>
          <p className="mt-1.5 text-display font-bold text-text-primary">{value}</p>
        </div>
        {icon && (
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
            {icon}
          </div>
        )}
      </div>
      {change && (
        <div
          className={cn(
            "mt-3 inline-flex items-center gap-1 text-xs font-medium",
            change.trend === "up" ? "text-success-500" : "text-danger-500"
          )}
        >
          {change.trend === "up" ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
          {change.value}
          <span className="font-normal text-text-muted">vs last month</span>
        </div>
      )}
    </Card>
  );
}
