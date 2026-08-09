import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function ButtonGroup({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex overflow-hidden rounded-md border border-border-strong [&>button]:rounded-none [&>button]:border-0 [&>button:not(:last-child)]:border-r [&>button:not(:last-child)]:border-border-strong",
        className
      )}
    >
      {children}
    </div>
  );
}
