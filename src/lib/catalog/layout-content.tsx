import type { CatalogEntry } from "./types";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { SectionContainer } from "@/components/layout/section-container";
import { ContentGrid } from "@/components/layout/content-grid";
import { Stack } from "@/components/layout/stack";
import { SplitLayout } from "@/components/layout/split-layout";
import { ContainerCard } from "@/components/layout/container-card";

export const layoutContentEntries: CatalogEntry[] = [
  {
    slug: "page-container",
    name: "Page Container",
    category: "Content",
    description: "Max width: 1440px. Margins: auto. Padding: responsive (px-6 py-6, lg:px-8 lg:py-8).",
    render: () => (
      <div className="rounded-lg border border-dashed border-border-strong">
        <PageContainer className="bg-surface-elevated/40 !py-4">
          <p className="text-sm text-text-secondary">Page content sits inside here, centered with max-width 1440px.</p>
        </PageContainer>
      </div>
    ),
  },
  {
    slug: "page-header",
    name: "Page Header",
    category: "Content",
    description: "Title + description + breadcrumbs + action buttons row, used at the top of every page.",
    render: () => (
      <PageHeader
        title="Example Page"
        description="A short description of this page."
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Example" }]}
      />
    ),
  },
  {
    slug: "section-container",
    name: "Section Container",
    category: "Content",
    description: "Card-like bordered section with an optional title/description/actions header.",
    render: () => (
      <SectionContainer title="Section Title" description="Section description goes here.">
        <p className="text-sm text-text-secondary">Section content.</p>
      </SectionContainer>
    ),
  },
  {
    slug: "content-grid",
    name: "Content Grid",
    category: "Content",
    description: "Responsive CSS grid with 1/2/3/4 preset columns.",
    render: () => (
      <ContentGrid cols={3} gap="sm">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 rounded-md bg-surface-elevated" />
        ))}
      </ContentGrid>
    ),
  },
  {
    slug: "stack",
    name: "Stack / Flex",
    category: "Content",
    description: "Flexbox row/column wrapper with gap, align and justify presets.",
    render: () => (
      <Stack direction="horizontal" gap={3}>
        <div className="h-10 w-16 rounded-md bg-surface-elevated" />
        <div className="h-10 w-16 rounded-md bg-surface-elevated" />
        <div className="h-10 w-16 rounded-md bg-surface-elevated" />
      </Stack>
    ),
  },
  {
    slug: "spacer",
    name: "Spacer",
    category: "Content",
    description: "Fixed-size blank box for manual spacing: xs(4px), sm(8px), md(16px), lg(24px), xl(32px), 2xl(48px), 3xl(64px).",
    render: () => (
      <div className="space-y-2.5">
        {(["xs", "sm", "md", "lg", "xl", "2xl", "3xl"] as const).map((size) => (
          <div key={size} className="flex items-center gap-3 text-xs text-text-muted">
            <span className="w-8 font-medium text-text-secondary">{size}</span>
            <div className="h-3 rounded bg-primary-200" style={{ width: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, "2xl": 48, "3xl": 64 }[size] }} />
          </div>
        ))}
      </div>
    ),
  },
  {
    slug: "split-layout",
    name: "Split Layout",
    category: "Content",
    description: "Two-pane layout with a fixed-width left panel and a flexible right panel.",
    render: () => (
      <SplitLayout
        className="h-32"
        left={<div className="flex h-full items-center justify-center text-sm text-text-muted">Left Pane</div>}
        right={<div className="flex h-full items-center justify-center text-sm text-text-muted">Right Pane</div>}
      />
    ),
  },
  {
    slug: "container-card",
    name: "Container Card",
    category: "Content",
    description: "Plain section wrapper (padding + border, no header/footer chrome) — lighter than Card.",
    render: () => <ContainerCard>Card content goes here.</ContainerCard>,
  },
];
