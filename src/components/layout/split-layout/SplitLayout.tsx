import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SplitLayout({
  left,
  right,
  leftWidth = "w-72",
  className,
}: {
  left: ReactNode;
  right: ReactNode;
  leftWidth?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-full overflow-hidden rounded-lg border border-border-default",
        className,
      )}
    >
      <div
        className={cn(
          "shrink-0 overflow-y-auto border-r border-border-default bg-surface",
          leftWidth,
        )}
      >
        {left}
      </div>
      <div className="flex-1 overflow-y-auto bg-surface">{right}</div>
    </div>
  );
}
