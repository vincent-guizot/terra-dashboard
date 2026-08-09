import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export interface KpiCardProps {
  label: string;
  value: string;
  target: string;
  progress: number;
  icon?: ReactNode;
  className?: string;
}

/**
 * KpiCard — like StatCard but framed around a goal: current value vs a
 * target, with a progress bar showing how close the KPI is to being hit.
 */
export function KpiCard({ label, value, target, progress, icon, className }: KpiCardProps) {
  return (
    <Card className={cn("p-5", className)}>
      <div className="flex items-start justify-between">
        <p className="text-sm text-text-muted">{label}</p>
        {icon && <div className="flex size-9 items-center justify-center rounded-lg bg-primary-100 text-primary-700">{icon}</div>}
      </div>
      <div className="mt-1.5 flex items-baseline gap-1.5">
        <p className="text-display font-bold text-text-primary">{value}</p>
        <p className="text-sm text-text-muted">/ {target}</p>
      </div>
      <Progress value={progress} showValue={false} className="mt-3" />
      <p className="mt-1.5 text-xs text-text-muted">{progress}% of target</p>
    </Card>
  );
}
