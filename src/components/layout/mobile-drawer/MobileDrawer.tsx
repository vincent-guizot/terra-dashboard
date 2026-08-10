import type { ReactNode } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { Overlay } from "@/components/layout/overlay";
import { cn } from "@/lib/utils";

/**
 * MobileDrawer — a generic full-height slide-over panel used for
 * mobile navigation. Sidebar uses this pattern internally for its
 * mobile breakpoint; exposed standalone here so any off-canvas mobile
 * panel (filters, cart, secondary nav) can reuse the same shell.
 */
export interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  side?: "left" | "right";
  widthClassName?: string;
}

export function MobileDrawer({
  open,
  onClose,
  children,
  side = "left",
  widthClassName = "w-72",
}: MobileDrawerProps) {
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 md:hidden">
      <Overlay onClick={onClose} />
      <div
        className={cn(
          "absolute top-0 z-50 h-full max-w-full animate-in",
          widthClassName,
          side === "left"
            ? "left-0 slide-in-from-left"
            : "right-0 slide-in-from-right",
        )}
      >
        {children}
      </div>
      <button
        onClick={onClose}
        aria-label="Close menu"
        className="absolute right-3 top-3 z-[60] rounded-full bg-black/20 p-1.5 text-white md:hidden"
      >
        <X className="size-4" />
      </button>
    </div>,
    document.body,
  );
}
