import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { ChevronsLeft, ChevronsRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/context/SidebarContext";
import { LogoBox } from "@/components/layout/logo-box";
import { SidebarSection } from "@/components/layout/sidebar-section";
import {
  SidebarSubmenu,
  type SidebarSubmenuChild,
} from "@/components/layout/sidebar-submenu";
import { MobileDrawer } from "@/components/layout/mobile-drawer";

export interface SidebarNavItem {
  label: string;
  href?: string;
  icon: ReactNode;
  badge?: string | number;
  children?: SidebarSubmenuChild[];
}

export interface SidebarSectionConfig {
  title?: string;
  items: SidebarNavItem[];
}

function NavItem({
  item,
  collapsed,
}: {
  item: SidebarNavItem;
  collapsed: boolean;
}) {
  if (item.children) {
    // "Sidebar with Submenu" pattern — delegated to the standalone SidebarSubmenu component.
    if (collapsed) return null;
    return (
      <SidebarSubmenu label={item.label} icon={item.icon}>
        {item.children}
      </SidebarSubmenu>
    );
  }

  return (
    <NavLink
      to={item.href ?? "#"}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-neutral-50/90 hover:bg-[var(--sidebar-hover)] hover:text-white",
          isActive && "bg-primary-700 text-white shadow-sm",
        )
      }
    >
      <span className="shrink-0">{item.icon}</span>
      {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
      {!collapsed && item.badge && (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-danger-500 px-1 text-[10px] font-semibold text-white">
          {item.badge}
        </span>
      )}
    </NavLink>
  );
}

export function SidebarContent({
  sections,
  collapsed,
}: {
  sections: SidebarSectionConfig[];
  collapsed: boolean;
}) {
  const { toggleCollapsed, setMobileOpen } = useSidebar();
  return (
    <div className="flex h-full flex-col bg-primary-950 text-white">
      <div className="flex items-center justify-between gap-2 px-4 py-4">
        <LogoBox variant={collapsed ? "icon" : "full"} tone="dark" />
        <button
          onClick={() => setMobileOpen(false)}
          className="text-neutral-400 hover:text-white md:hidden"
          aria-label="Close menu"
        >
          <X className="size-5" />
        </button>
      </div>
      <nav className="min-h-0 flex-1 space-y-6 overflow-y-auto px-2 pb-4">
        {sections.map((section, i) => (
          <SidebarSection key={i} title={section.title} collapsed={collapsed}>
            <div className="space-y-1">
              {section.items.map((item) => (
                <NavItem key={item.label} item={item} collapsed={collapsed} />
              ))}
            </div>
          </SidebarSection>
        ))}
      </nav>
      <button
        onClick={toggleCollapsed}
        className="hidden items-center gap-2 border-t border-neutral-800 px-4 py-3 text-xs text-neutral-400 hover:text-white md:flex"
      >
        {collapsed ? (
          <ChevronsRight className="size-4" />
        ) : (
          <ChevronsLeft className="size-4" />
        )}
        {!collapsed && "Collapse"}
      </button>
    </div>
  );
}

export function Sidebar({ sections }: { sections: SidebarSectionConfig[] }) {
  const { collapsed, mobileOpen, setMobileOpen } = useSidebar();

  return (
    <>
      {/* Desktop sidebar (expanded / collapsed) */}
      <aside
        className={cn(
          "sticky top-0 hidden h-screen shrink-0 transition-[width] duration-200 md:block",
          collapsed ? "w-[72px]" : "w-64",
        )}
      >
        <SidebarContent sections={sections} collapsed={collapsed} />
      </aside>

      {/* Mobile navigation — built on the standalone MobileDrawer primitive */}
      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        widthClassName="w-72"
      >
        <SidebarContent sections={sections} collapsed={false} />
      </MobileDrawer>
    </>
  );
}
