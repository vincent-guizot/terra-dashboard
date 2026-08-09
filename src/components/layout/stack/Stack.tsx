import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: "vertical" | "horizontal";
  gap?: 1 | 2 | 3 | 4 | 6 | 8;
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between";
  wrap?: boolean;
}

const gapMap = { 1: "gap-1", 2: "gap-2", 3: "gap-3", 4: "gap-4", 6: "gap-6", 8: "gap-8" };
const alignMap = { start: "items-start", center: "items-center", end: "items-end", stretch: "items-stretch" };
const justifyMap = { start: "justify-start", center: "justify-center", end: "justify-end", between: "justify-between" };

export function Stack({
  className,
  direction = "vertical",
  gap = 4,
  align,
  justify,
  wrap,
  ...props
}: StackProps) {
  return (
    <div
      className={cn(
        "flex",
        direction === "vertical" ? "flex-col" : "flex-row",
        gapMap[gap],
        align && alignMap[align],
        justify && justifyMap[justify],
        wrap && "flex-wrap",
        className
      )}
      {...props}
    />
  );
}

export { Spacer } from "@/components/layout/spacer";
