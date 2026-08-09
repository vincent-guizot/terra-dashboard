import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Generic static Menu — a plain vertical list of actionable items,
 * always visible (no trigger/overlay). Use DropdownMenu when the list
 * needs to open from a trigger button instead.
 */
export interface MenuItem {
  label: string;
  icon?: ReactNode;
  active?: boolean;
  destructive?: boolean;
  onClick?: () => void;
}

export function Menu({ items, className }: { items: MenuItem[]; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-0.5 rounded-md border border-border-default bg-surface p-1.5", className)}>
      {items.map((item, i) => (
        <button
          key={i}
          onClick={item.onClick}
          className={cn(
            "flex items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm transition-colors",
            item.active
              ? "bg-primary-100 text-primary-700"
              : item.destructive
              ? "text-danger-500 hover:bg-danger-100"
              : "text-text-primary hover:bg-surface-elevated"
          )}
        >
          {item.icon}
          {item.label}
        </button>
      ))}
    </div>
  );
}
