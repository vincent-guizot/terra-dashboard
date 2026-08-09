import { cn } from "@/lib/utils";

const colorMap = {
  online: "bg-success-500",
  offline: "bg-neutral-500",
  busy: "bg-danger-500",
  away: "bg-warning-500",
};

export function StatusIndicator({
  status,
  label,
  className,
}: {
  status: keyof typeof colorMap;
  label?: string;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-xs text-text-secondary", className)}>
      <span className={cn("size-2 rounded-full", colorMap[status])} />
      {label ?? status}
    </span>
  );
}
