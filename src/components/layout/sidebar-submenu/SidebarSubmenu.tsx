import { useState, type ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * SidebarSubmenu — a nested, collapsible nav group (parent trigger +
 * indented children), i.e. the "Sidebar with Submenu" pattern from the
 * design system. Sidebar's NavItem includes this behavior inline for
 * items with `children`; this standalone version lets you build a
 * multi-level nav list outside the default Sidebar shell too.
 */
export interface SidebarSubmenuChild {
  label: string;
  href: string;
}

export interface SidebarSubmenuProps {
  label: string;
  icon?: ReactNode;
  children: SidebarSubmenuChild[];
  defaultOpen?: boolean;
}

export function SidebarSubmenu({ label, icon, children, defaultOpen = false }: SidebarSubmenuProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-neutral-50/90 hover:bg-[var(--sidebar-hover)]"
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span className="flex-1 text-left">{label}</span>
        <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="ml-8 mt-1 flex flex-col gap-0.5 border-l border-neutral-800 pl-3">
          {children.map((child) => (
            <NavLink
              key={child.href}
              to={child.href}
              className={({ isActive }) =>
                cn(
                  "rounded-md px-2 py-1.5 text-sm text-neutral-400 hover:bg-[var(--sidebar-hover)] hover:text-white",
                  isActive && "bg-primary-700 text-white"
                )
              }
            >
              {child.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}
