import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * SafeArea — pads content to respect device notches / home indicators
 * on mobile (iOS safe-area-inset-*). AppShell already applies bottom
 * safe-area padding globally; use this wrapper directly for any
 * full-bleed screen that needs top/bottom/left/right insets too
 * (e.g. a fullscreen modal or a mobile-only view).
 */
export interface SafeAreaProps extends HTMLAttributes<HTMLDivElement> {
  edges?: ("top" | "bottom" | "left" | "right")[];
}

const edgeStyle: Record<string, string> = {
  top: "env(safe-area-inset-top)",
  bottom: "env(safe-area-inset-bottom)",
  left: "env(safe-area-inset-left)",
  right: "env(safe-area-inset-right)",
};

export function SafeArea({
  className,
  edges = ["top", "bottom", "left", "right"],
  style,
  ...props
}: SafeAreaProps) {
  const padding = edges.reduce<Record<string, string>>((acc, edge) => {
    acc[`padding${edge[0].toUpperCase()}${edge.slice(1)}`] = edgeStyle[edge];
    return acc;
  }, {});

  return (
    <div
      className={cn(className)}
      style={{ ...padding, ...style }}
      {...props}
    />
  );
}
