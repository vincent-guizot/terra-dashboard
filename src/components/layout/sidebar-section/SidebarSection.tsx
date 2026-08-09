import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * SidebarSection — a labeled group of nav items. Sidebar composes
 * several of these internally (see components/layout/sidebar), but
 * it's exposed standalone so custom sidebars/panels can reuse the
 * same grouping + label styling outside the default Sidebar shell.
 */
export interface SidebarSectionProps {
  title?: string;
  children: ReactNode;
  collapsed?: boolean;
  className?: string;
}

export function SidebarSection({ title, children, collapsed, className }: SidebarSectionProps) {
  return (
    <div className={cn("space-y-1", className)}>
      {title && !collapsed && (
        <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-400/70">{title}</p>
      )}
      {children}
    </div>
  );
}
