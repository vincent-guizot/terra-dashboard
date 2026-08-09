import { useNavigate } from "react-router-dom";
import { useState, type ReactNode } from "react";
import {
  Home,
  Users,
  Package,
  ShoppingCart,
  FolderKanban,
  CheckSquare,
  Receipt,
  BarChart3,
  Calendar,
  MessageSquare,
  UserCircle,
  Bell,
  Settings,
  Type,
  Boxes,
  LayoutTemplate,
  LogIn,
  UserPlus,
  KeyRound,
  Ban,
  AlertOctagon,
} from "lucide-react";
import { Sidebar, type SidebarSectionConfig } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CommandMenu, useCommandMenuShortcut, type CommandMenuItem } from "@/components/ui/command-menu";
import { useSidebar } from "@/context/SidebarContext";
import { cn } from "@/lib/utils";
import { atomicCatalog, layoutCatalog } from "@/lib/catalog";

const componentSubmenus = Object.entries(atomicCatalog).map(([category, entries]) => ({
  label: category,
  icon: <Boxes className="size-[18px]" />,
  children: entries.map((e) => ({ label: e.name, href: `/components/${e.slug}` })),
}));

const layoutSubmenus = Object.entries(layoutCatalog).map(([category, entries]) => ({
  label: category,
  icon: <LayoutTemplate className="size-[18px]" />,
  children: entries.map((e) => ({ label: e.name, href: `/layout-components/${e.slug}` })),
}));

const navSections: SidebarSectionConfig[] = [
  {
    title: "Pages",
    items: [
      { label: "Overview", href: "/dashboard", icon: <Home className="size-[18px]" /> },
      { label: "Analytics", href: "/analytics", icon: <BarChart3 className="size-[18px]" /> },
      { label: "Customers", href: "/customers", icon: <Users className="size-[18px]" /> },
      { label: "Products", href: "/products", icon: <Package className="size-[18px]" /> },
      { label: "Orders", href: "/orders", icon: <ShoppingCart className="size-[18px]" /> },
      { label: "Projects", href: "/projects", icon: <FolderKanban className="size-[18px]" /> },
      { label: "Tasks", href: "/tasks", icon: <CheckSquare className="size-[18px]" /> },
      { label: "Invoices", href: "/invoices", icon: <Receipt className="size-[18px]" /> },
      { label: "Calendar", href: "/calendar", icon: <Calendar className="size-[18px]" /> },
      { label: "Messages", href: "/messages", icon: <MessageSquare className="size-[18px]" />, badge: 3 },
      { label: "Notifications", href: "/notifications", icon: <Bell className="size-[18px]" /> },
      { label: "Profile", href: "/profile", icon: <UserCircle className="size-[18px]" /> },
    ],
  },
  {
    title: "Components",
    items: componentSubmenus,
  },
  {
    title: "Layout",
    items: layoutSubmenus,
  },
  {
    title: "General",
    items: [
      { label: "Settings", href: "/settings/general", icon: <Settings className="size-[18px]" /> },
      { label: "Typography", href: "/typography", icon: <Type className="size-[18px]" /> },
      { label: "Login", href: "/auth/login", icon: <LogIn className="size-[18px]" /> },
      { label: "Register", href: "/auth/register", icon: <UserPlus className="size-[18px]" /> },
      { label: "Forgot Password", href: "/auth/forgot-password", icon: <KeyRound className="size-[18px]" /> },
      { label: "404 Not Found", href: "/this-page-does-not-exist", icon: <Ban className="size-[18px]" /> },
      { label: "Error", href: "/error", icon: <AlertOctagon className="size-[18px]" /> },
    ],
  },
];

export function AppShell({ children }: { children: ReactNode }) {
  const { collapsed } = useSidebar();
  const navigate = useNavigate();
  const [commandOpen, setCommandOpen] = useState(false);

  useCommandMenuShortcut(() => setCommandOpen((o) => !o));

  const commandItems: CommandMenuItem[] = navSections.flatMap((section) =>
    section.items.flatMap((item) => {
      if (item.children) {
        return item.children.map((child) => ({
          id: child.href,
          label: `${item.label} \u2192 ${child.label}`,
          onSelect: () => navigate(child.href),
        }));
      }
      if (!item.href) return [];
      return [{ id: item.href, label: item.label, icon: item.icon, onSelect: () => navigate(item.href!) }];
    })
  );

  return (
    <div className="flex min-h-screen bg-surface-sunken">
      <Sidebar sections={navSections} />
      <div className={cn("flex min-h-screen flex-1 flex-col", collapsed ? "md:w-[calc(100%-72px)]" : "md:w-[calc(100%-256px)]")}>
        <Header onOpenCommandMenu={() => setCommandOpen(true)} />
        <main className="flex-1 [padding-bottom:env(safe-area-inset-bottom)]">{children}</main>
        <Footer />
      </div>
      <CommandMenu open={commandOpen} onClose={() => setCommandOpen(false)} items={commandItems} />
    </div>
  );
}
