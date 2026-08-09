import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Kbd({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <kbd
      className={cn(
        "inline-flex h-6 min-w-6 items-center justify-center rounded border border-border-strong bg-surface-elevated px-1.5 text-xs font-medium text-text-secondary shadow-xs",
        className
      )}
      {...props}
    />
  );
}
