import { Columns3 } from "lucide-react";
import { Popover } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export interface ColumnConfig {
  key: string;
  label: string;
  visible: boolean;
}

export interface TableColumnManagerProps {
  columns: ColumnConfig[];
  onToggle: (key: string) => void;
}

/** TableColumnManager — popover with checkboxes to show/hide DataTable columns. */
export function TableColumnManager({ columns, onToggle }: TableColumnManagerProps) {
  return (
    <Popover
      align="end"
      trigger={
        <Button variant="outline" size="sm">
          <Columns3 className="size-4" />
          Columns
        </Button>
      }
    >
      <div className="space-y-2">
        {columns.map((col) => (
          <Checkbox key={col.key} label={col.label} checked={col.visible} onChange={() => onToggle(col.key)} />
        ))}
      </div>
    </Popover>
  );
}
