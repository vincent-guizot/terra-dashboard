import { useParams, Navigate } from "react-router-dom";
import { PageHeader } from "@/components/layout/page-header";
import { ContainerCard } from "@/components/layout/container-card";
import { Badge } from "@/components/ui/badge";
import { findAtomicEntry, findLayoutEntry } from "@/lib/catalog";

export function ComponentCatalogPage({ kind }: { kind: "atomic" | "layout" }) {
  const { slug } = useParams();
  const entry = slug ? (kind === "atomic" ? findAtomicEntry(slug) : findLayoutEntry(slug)) : undefined;

  if (!entry) return <Navigate to="/dashboard" replace />;

  return (
    <div>
      <PageHeader
        title={entry.name}
        description={entry.description}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: kind === "atomic" ? "Components" : "Layout" },
          { label: entry.name },
        ]}
        actions={<Badge variant="primary">{entry.category}</Badge>}
      />
      <ContainerCard className="flex min-h-[220px] items-center justify-center p-8">
        <div className="w-full">{entry.render()}</div>
      </ContainerCard>
    </div>
  );
}
