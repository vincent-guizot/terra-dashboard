import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

/**
 * NavigationItem — a single, reusable nav row (icon + label + optional
 * badge) with active-route styling. Used by Sidebar internally, and
 * exposed standalone for building custom nav lists elsewhere (e.g.
 * secondary nav, in-page tab rails, footer nav).
 */
export interface NavigationItemProps {
  href: string;
  icon?: ReactNode;
  label: string;
  badge?: string | number;
  className?: string;
}

export function NavigationItem({ href, icon, label, badge, className }: NavigationItemProps) {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-text-secondary hover:bg-surface-elevated hover:text-text-primary",
          isActive && "bg-primary-100 text-primary-700 hover:bg-primary-100 hover:text-primary-700",
          className
        )
      }
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="flex-1 truncate">{label}</span>
      {badge && (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-danger-500 px-1 text-[10px] font-semibold text-white">
          {badge}
        </span>
      )}
    </NavLink>
  );
}
