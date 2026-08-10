import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function ScrollArea({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "terra-scrollbar overflow-y-auto [scrollbar-width:thin] [scrollbar-color:var(--color-primary-300)_transparent]",
        className,
      )}
      {...props}
    />
  );
}
