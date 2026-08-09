import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface MetricComparisonProps {
  label: string;
  current: { period: string; value: string };
  previous: { period: string; value: string };
  delta: string;
  trend: "up" | "down";
  className?: string;
}

/** MetricComparison — this-period-vs-last-period, side by side with a delta badge. */
export function MetricComparison({ label, current, previous, delta, trend, className }: MetricComparisonProps) {
  return (
    <Card className={cn("p-5", className)}>
      <p className="text-sm text-text-muted">{label}</p>
      <div className="mt-3 flex items-end justify-between">
        <div>
          <p className="text-xs text-text-muted">{current.period}</p>
          <p className="text-xl font-semibold text-text-primary">{current.value}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-text-muted">{previous.period}</p>
          <p className="text-sm text-text-muted">{previous.value}</p>
        </div>
      </div>
      <div
        className={cn(
          "mt-3 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
          trend === "up" ? "bg-success-100 text-success-700" : "bg-danger-100 text-danger-700"
        )}
      >
        {trend === "up" ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
        {delta}
      </div>
    </Card>
  );
}
