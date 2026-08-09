import { Link } from "react-router-dom";
import { PageHeader } from "@/components/layout/page-header";
import { layoutCatalog } from "@/lib/catalog";

export function LayoutIndexPage() {
  return (
    <div>
      <PageHeader title="Layout" description="All 18 layout components in the Terra Dashboard design system." />
      <div className="space-y-8">
        {Object.entries(layoutCatalog).map(([category, entries]) => (
          <div key={category}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-text-muted">{category}</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {entries.map((entry) => (
                <Link
                  key={entry.slug}
                  to={`/layout-components/${entry.slug}`}
                  className="rounded-lg border border-border-default bg-surface p-4 text-sm font-medium text-text-primary hover:border-primary-300 hover:bg-surface-elevated"
                >
                  {entry.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
