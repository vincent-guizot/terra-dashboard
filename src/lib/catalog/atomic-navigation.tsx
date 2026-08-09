import { Settings, LogOut } from "lucide-react";
import type { CatalogEntry } from "./types";
import { Menu } from "@/components/ui/menu";
import { NavigationItem } from "@/components/ui/navigation-item";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Pagination } from "@/components/ui/pagination";
import { Stepper } from "@/components/ui/stepper";
import { TimelineItem } from "@/components/ui/timeline-item";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { useState } from "react";
import { Home } from "lucide-react";

function PaginationDemo() {
  const [page, setPage] = useState(1);
  return <Pagination page={page} totalPages={5} onPageChange={setPage} />;
}

export const navigationEntries: CatalogEntry[] = [
  {
    slug: "menu",
    name: "Menu",
    category: "Navigation",
    description: "Generic static (always-visible) vertical list of actionable items.",
    render: () => (
      <div className="max-w-[220px]">
        <Menu items={[{ label: "Settings", icon: <Settings className="size-4" />, active: true }, { label: "Log out", icon: <LogOut className="size-4" />, destructive: true }]} />
      </div>
    ),
  },
  {
    slug: "navigation-item",
    name: "Navigation Item",
    category: "Navigation",
    description: "Single reusable nav row (icon + label + badge) with active-route styling.",
    render: () => (
      <div className="max-w-[220px] rounded-md bg-primary-950 p-2">
        <NavigationItem href="/dashboard" icon={<Home className="size-4" />} label="Overview" badge={3} />
      </div>
    ),
  },
  {
    slug: "tabs",
    name: "Tabs",
    category: "Navigation",
    description: "Tabbed content switcher.",
    render: () => (
      <Tabs defaultValue="one">
        <TabsList>
          <TabsTrigger value="one">Tab One</TabsTrigger>
          <TabsTrigger value="two">Tab Two</TabsTrigger>
        </TabsList>
        <TabsContent value="one">Content for tab one.</TabsContent>
        <TabsContent value="two">Content for tab two.</TabsContent>
      </Tabs>
    ),
  },
  {
    slug: "breadcrumb",
    name: "Breadcrumb",
    category: "Navigation",
    description: "Trail of links showing the current page's position in the hierarchy.",
    render: () => <Breadcrumb items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Analytics", href: "/analytics" }, { label: "Overview" }]} />,
  },
  {
    slug: "pagination",
    name: "Pagination",
    category: "Navigation",
    description: "Page navigation control with ellipsis truncation for large page counts.",
    render: () => <PaginationDemo />,
  },
  {
    slug: "stepper",
    name: "Stepper",
    category: "Navigation",
    description: "Vertical multi-step progress indicator.",
    render: () => <Stepper current={1} steps={[{ label: "Information" }, { label: "Details" }, { label: "Review" }]} />,
  },
  {
    slug: "timeline-item",
    name: "Timeline Item",
    category: "Navigation",
    description: "One entry in a vertical timeline: dot + connecting line + content.",
    render: () => (
      <div>
        <TimelineItem title="Order placed" time="2h ago" tone="success" />
        <TimelineItem title="Shipped" time="1h ago" last />
      </div>
    ),
  },
  {
    slug: "accordion",
    name: "Accordion",
    category: "Navigation",
    description: "Expand/collapse panels, single or multiple open at once.",
    render: () => (
      <Accordion type="single" className="max-w-md">
        <AccordionItem value="a" title="What is Terra Dashboard?">
          A reusable dashboard design system built with React, TypeScript and Tailwind CSS.
        </AccordionItem>
        <AccordionItem value="b" title="Can I rebrand it?">
          Yes — edit src/config/site.ts and the whole app updates.
        </AccordionItem>
      </Accordion>
    ),
  },
];
