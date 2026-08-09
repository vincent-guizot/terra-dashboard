import type { ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TableBulkActionsProps {
  count: number;
  onClear: () => void;
  actions: ReactNode;
  className?: string;
}

/**
 * TableBulkActions — sticky bar that appears above a DataTable once
 * one or more rows are selected, showing the selection count and
 * bulk-operation buttons (delete, export, etc).
 */
export function TableBulkActions({ count, onClear, actions, className }: TableBulkActionsProps) {
  if (count === 0) return null;

  return (
    <div
      className={cn(
        "mb-3 flex items-center justify-between rounded-md border border-primary-200 bg-primary-50 px-4 py-2.5",
        className
      )}
    >
      <div className="flex items-center gap-2 text-sm text-primary-700">
        <button onClick={onClear} aria-label="Clear selection" className="hover:text-primary-900">
          <X className="size-4" />
        </button>
        <span className="font-medium">{count} selected</span>
      </div>
      <div className="flex items-center gap-2">{actions}</div>
    </div>
  );
}
