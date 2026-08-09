import type { HTMLAttributes } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  onRemove?: () => void;
}

export function Chip({ className, children, onRemove, ...props }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-border-default bg-surface-elevated px-2.5 py-1 text-xs font-medium text-text-primary",
        className
      )}
      {...props}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove"
          className="rounded-full p-0.5 hover:bg-surface-sunken"
        >
          <X className="size-3" />
        </button>
      )}
    </span>
  );
}
