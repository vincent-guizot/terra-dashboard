import { cn } from "@/lib/utils";

export interface DividerProps {
  orientation?: "horizontal" | "vertical";
  variant?: "solid" | "dashed" | "dotted" | "inset";
  label?: string;
  className?: string;
}

export function Divider({ orientation = "horizontal", variant = "solid", label, className }: DividerProps) {
  if (orientation === "vertical") {
    return <div className={cn("w-px self-stretch bg-border-default", className)} />;
  }
  if (label) {
    return (
      <div className={cn("flex items-center gap-3 text-xs text-text-muted", className)}>
        <span className="h-px flex-1 bg-border-default" />
        {label}
        <span className="h-px flex-1 bg-border-default" />
      </div>
    );
  }
  return (
    <hr
      className={cn(
        "border-border-default",
        variant === "dashed" && "border-dashed",
        variant === "dotted" && "border-dotted",
        variant === "inset" && "mx-4",
        className
      )}
    />
  );
}
