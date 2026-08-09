import type { ReactNode } from "react";
import { SearchInput } from "@/components/ui/search-input";
import { cn } from "@/lib/utils";

export interface TableToolbarProps {
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  filters?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

/**
 * TableToolbar — the bar above a DataTable: search on the left,
 * filter controls + primary actions on the right. Compose with
 * Select/MultiSelect/DatePicker for `filters` and Button/DropdownButton
 * for `actions`.
 */
export function TableToolbar({ searchPlaceholder = "Search...", onSearchChange, filters, actions, className }: TableToolbarProps) {
  return (
    <div className={cn("mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="sm:w-64">
          <SearchInput placeholder={searchPlaceholder} onChange={(e) => onSearchChange?.(e.target.value)} />
        </div>
        {filters && <div className="flex items-center gap-2">{filters}</div>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
