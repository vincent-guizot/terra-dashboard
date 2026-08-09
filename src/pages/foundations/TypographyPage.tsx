import { PageHeader } from "@/components/layout/page-header";
import { ContainerCard } from "@/components/layout/container-card";
import { Divider } from "@/components/ui/divider";

const scale = [
  { name: "Display", size: "36px", lineHeight: "40px", weight: "700", className: "text-display font-bold" },
  { name: "H1", size: "30px", lineHeight: "36px", weight: "700", className: "text-h1 font-bold" },
  { name: "H2", size: "24px", lineHeight: "32px", weight: "700", className: "text-h2 font-bold" },
  { name: "H3", size: "20px", lineHeight: "28px", weight: "600", className: "text-h3 font-semibold" },
  { name: "H4", size: "18px", lineHeight: "24px", weight: "600", className: "text-h4 font-semibold" },
  { name: "Body", size: "14px", lineHeight: "20px", weight: "400", className: "text-body font-normal" },
  { name: "Body Small", size: "13px", lineHeight: "18px", weight: "400", className: "text-body-sm font-normal" },
  { name: "Label", size: "12px", lineHeight: "16px", weight: "500", className: "text-label font-medium" },
  { name: "Caption", size: "11px", lineHeight: "16px", weight: "400", className: "text-caption font-normal" },
];

export function TypographyPage() {
  return (
    <div>
      <PageHeader
        title="Typography"
        description="The Terra Dashboard type scale — Display through Caption, each with a fixed size, line-height, and weight."
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Typography" }]}
      />
      <ContainerCard className="divide-y divide-border-default">
        {scale.map((level, i) => (
          <div key={level.name} className={`flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:justify-between ${i === 0 ? "pt-0" : ""}`}>
            <p className={`${level.className} text-text-primary`}>{level.name} — The quick brown fox</p>
            <p className="shrink-0 font-mono text-caption text-text-muted">
              {level.size} / {level.lineHeight} / {level.weight}
            </p>
          </div>
        ))}
      </ContainerCard>
      <Divider className="my-6" />
      <p className="text-body-sm text-text-muted">
        Use these via Tailwind utilities: <code className="rounded bg-surface-elevated px-1.5 py-0.5">text-display</code>,{" "}
        <code className="rounded bg-surface-elevated px-1.5 py-0.5">text-h1</code> ...{" "}
        <code className="rounded bg-surface-elevated px-1.5 py-0.5">text-caption</code>, paired with a font-weight
        utility (<code className="rounded bg-surface-elevated px-1.5 py-0.5">font-bold</code>,{" "}
        <code className="rounded bg-surface-elevated px-1.5 py-0.5">font-semibold</code>,{" "}
        <code className="rounded bg-surface-elevated px-1.5 py-0.5">font-medium</code>,{" "}
        <code className="rounded bg-surface-elevated px-1.5 py-0.5">font-normal</code>).
      </p>
    </div>
  );
}
