import type { CatalogEntry } from "./types";
import { Overlay } from "@/components/layout/overlay";
import { ScrollArea } from "@/components/layout/scroll-area";
import { Footer } from "@/components/layout/footer";
import { SafeArea } from "@/components/layout/safe-area";

export const layoutUtilityEntries: CatalogEntry[] = [
  {
    slug: "overlay",
    name: "Overlay",
    category: "Utility",
    description: "Standalone dimming backdrop, used by Modal/Drawer/MobileDrawer internally and reusable on its own.",
    render: () => (
      <div className="relative h-24 max-w-xs overflow-hidden rounded-lg border border-border-default bg-surface-elevated">
        <Overlay className="absolute" />
      </div>
    ),
  },
  {
    slug: "scroll-area",
    name: "Scroll Area",
    category: "Utility",
    description: "Thin-scrollbar container for custom scrollable regions.",
    render: () => (
      <ScrollArea className="h-24 max-w-xs rounded-md border border-border-default p-3">
        {Array.from({ length: 8 }, (_, i) => (
          <p key={i} className="py-1 text-sm text-text-secondary">
            Scrollable content goes here...
          </p>
        ))}
      </ScrollArea>
    ),
  },
  {
    slug: "footer",
    name: "Footer",
    category: "Utility",
    description: "Application footer with copyright and social links.",
    render: () => (
      <div className="max-w-xl overflow-hidden rounded-lg border border-border-default">
        <Footer />
      </div>
    ),
  },
  {
    slug: "safe-area",
    name: "Safe Area",
    category: "Utility",
    description: "Pads content to respect device notches / home indicators (iOS safe-area-inset-*) on mobile.",
    render: () => (
      <SafeArea edges={["bottom"]} className="max-w-xs rounded-md border border-dashed border-border-strong p-3">
        <p className="text-sm text-text-secondary">Content with safe-area-aware bottom padding.</p>
      </SafeArea>
    ),
  },
];
