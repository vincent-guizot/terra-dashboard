import type { ReactNode } from "react";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";

export interface DataTableColumn<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  emptyLabel?: string;
  className?: string;
}

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  emptyLabel = "No data found",
  className,
}: DataTableProps<T>) {
  if (data.length === 0) {
    return <EmptyState title={emptyLabel} description="There is nothing to show here." />;
  }

  return (
    <div className={cn("w-full overflow-x-auto rounded-lg border border-border-default", className)}>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border-default bg-surface-elevated">
            {columns.map((col) => (
              <th key={col.key} className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border-default">
          {data.map((row) => (
            <tr key={row.id} className="bg-surface hover:bg-surface-elevated/60">
              {columns.map((col) => (
                <td key={col.key} className={cn("whitespace-nowrap px-4 py-3 text-text-primary", col.className)}>
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
