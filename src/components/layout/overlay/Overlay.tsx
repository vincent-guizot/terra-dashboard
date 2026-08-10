import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * Overlay — a standalone backdrop/scrim. Modal and Drawer render their
 * own internal backdrop for convenience, but this is the reusable
 * primitive for any custom full-screen dimming layer (image lightbox,
 * loading blocker, custom slide-over, etc).
 */
export interface OverlayProps extends HTMLAttributes<HTMLDivElement> {
  blur?: boolean;
}

export function Overlay({ className, blur = false, ...props }: OverlayProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-40 bg-primary-950/40",
        blur && "backdrop-blur-sm",
        className,
      )}
      {...props}
    />
  );
}
