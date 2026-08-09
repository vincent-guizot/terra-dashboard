import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface ContentGridProps extends HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
}

const colsMap = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};
const gapMap = { sm: "gap-3", md: "gap-4", lg: "gap-6" };

export function ContentGrid({ className, cols = 3, gap = "md", ...props }: ContentGridProps) {
  return <div className={cn("grid", colsMap[cols], gapMap[gap], className)} {...props} />;
}

export function AutoGrid({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]", className)}
      {...props}
    />
  );
}
