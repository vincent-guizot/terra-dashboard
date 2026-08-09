import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * Container Card — plain section wrapper (padding + max-width),
 * lighter than the Card atomic component: no shadow/header/footer
 * structure, just a consistent content boundary for page sections.
 */
export function ContainerCard({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("w-full rounded-lg border border-border-default bg-surface p-5", className)}
      {...props}
    />
  );
}
