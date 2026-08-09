import { Home, Users } from "lucide-react";
import type { CatalogEntry } from "./types";
import { Header } from "@/components/layout/header";
import { SidebarContent } from "@/components/layout/sidebar";
import { SidebarSection } from "@/components/layout/sidebar-section";
import { SidebarSubmenu } from "@/components/layout/sidebar-submenu";
import { SidebarProvider } from "@/context/SidebarContext";

export const layoutApplicationEntries: CatalogEntry[] = [
  {
    slug: "app-shell",
    name: "App Shell",
    category: "Application",
    description: "Top-level composition of Sidebar + Header + content outlet + Footer. See it live around this very page.",
    render: () => (
      <p className="max-w-md text-sm text-text-secondary">
        App Shell is the outermost layout wrapping every dashboard page — you're looking at it right now
        (Sidebar on the left, Header above, this content area, Footer below).
      </p>
    ),
  },
  {
    slug: "header",
    name: "Header / Topbar",
    category: "Application",
    description: "Top navigation bar: search / command menu trigger, theme toggle, notifications, avatar.",
    render: () => (
      <div className="overflow-hidden rounded-lg border border-border-default">
        <Header />
      </div>
    ),
  },
  {
    slug: "sidebar",
    name: "Sidebar",
    category: "Application",
    description: "Primary navigation sidebar, supports expanded and icon-only collapsed states.",
    render: () => (
      <SidebarProvider>
        <div className="h-80 max-w-[260px] overflow-hidden rounded-lg border border-border-default">
          <SidebarContent
            collapsed={false}
            sections={[{ title: "Main", items: [{ label: "Overview", href: "/dashboard", icon: <Home className="size-[18px]" /> }] }]}
          />
        </div>
      </SidebarProvider>
    ),
  },
  {
    slug: "sidebar-with-submenu",
    name: "Sidebar with Submenu",
    category: "Application",
    description: "Nested, collapsible nav group — the pattern this very sidebar uses for Components/Layout.",
    render: () => (
      <div className="max-w-[260px] rounded-lg bg-primary-950 p-2">
        <SidebarSubmenu label="Customers" icon={<Users className="size-[18px]" />} defaultOpen>
          {[{ label: "All Customers", href: "/customers" }, { label: "Segments", href: "/customers?view=segments" }]}
        </SidebarSubmenu>
      </div>
    ),
  },
  {
    slug: "mobile-drawer",
    name: "Mobile Drawer",
    category: "Application",
    description: "Full-height off-canvas panel used for mobile navigation. Try shrinking the window and tapping the hamburger icon.",
    render: () => (
      <p className="max-w-md text-sm text-text-secondary">
        Resize your browser below the "lg" breakpoint (1024px) and click the hamburger icon in the header to
        see the Mobile Drawer in action — it reuses the same Sidebar content in a slide-over panel.
      </p>
    ),
  },
  {
    slug: "sidebar-section",
    name: "Sidebar Section",
    category: "Application",
    description: "A labeled group of nav items — every group you see in the sidebar (Components, Layout, Pages...) is one of these.",
    render: () => (
      <div className="max-w-[220px] rounded-lg bg-primary-950 p-2">
        <SidebarSection title="Example Section">
          <p className="px-3 text-xs text-primary-200/70">Section content goes here.</p>
        </SidebarSection>
      </div>
    ),
  },
];
