import { Filter, X } from "lucide-react";
import { Popover } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

export interface TableFilterField {
  key: string;
  label: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
}

export interface TableFilterProps {
  fields: TableFilterField[];
  onClear?: () => void;
  activeCount?: number;
}

/** TableFilter — a filter popover with several field selects and a clear action. */
export function TableFilter({ fields, onClear, activeCount = 0 }: TableFilterProps) {
  return (
    <Popover
      align="start"
      trigger={
        <Button variant="outline" size="sm">
          <Filter className="size-4" />
          Filters
          {activeCount > 0 && (
            <span className="ml-1 flex size-4 items-center justify-center rounded-full bg-primary-700 text-[10px] text-white">
              {activeCount}
            </span>
          )}
        </Button>
      }
    >
      <div className="space-y-3">
        {fields.map((field) => (
          <div key={field.key}>
            <Label htmlFor={field.key}>{field.label}</Label>
            <Select id={field.key} value={field.value} onChange={(e) => field.onChange(e.target.value)}>
              {field.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
          </div>
        ))}
        {onClear && (
          <button onClick={onClear} className="flex items-center gap-1 text-xs text-text-muted hover:text-danger-500">
            <X className="size-3" /> Clear filters
          </button>
        )}
      </div>
    </Popover>
  );
}
