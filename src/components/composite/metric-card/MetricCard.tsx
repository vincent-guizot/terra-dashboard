import { cn } from "@/lib/utils";

export interface MetricCardProps {
  label: string;
  value: string;
  className?: string;
}

/**
 * MetricCard — the simplest composite: a plain label + big number, no
 * icon, no trend, no border/shadow. Use for dense metric strips where
 * StatCard (which has icon + trend + Card chrome) would be too heavy.
 */
export function MetricCard({ label, value, className }: MetricCardProps) {
  return (
    <div className={cn("border-l-2 border-primary-700 pl-3", className)}>
      <p className="text-xs uppercase tracking-wide text-text-muted">{label}</p>
      <p className="mt-0.5 text-xl font-semibold text-text-primary">{value}</p>
    </div>
  );
}
