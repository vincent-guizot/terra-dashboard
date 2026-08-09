import { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { cn } from "@/lib/utils";

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function MonthGrid({
  year,
  month,
  selected,
  onSelect,
}: {
  year: number;
  month: number;
  selected: Date | null;
  onSelect: (d: Date) => void;
}) {
  const total = daysInMonth(year, month);
  const firstDay = new Date(year, month, 1).getDay();
  const cells = [...Array(firstDay).fill(null), ...Array.from({ length: total }, (_, i) => i + 1)];
  return (
    <div className="grid grid-cols-7 gap-1 text-center text-xs">
      {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
        <div key={d} className="py-1 font-medium text-text-muted">
          {d}
        </div>
      ))}
      {cells.map((day, i) => {
        const isSelected =
          day && selected && selected.getFullYear() === year && selected.getMonth() === month && selected.getDate() === day;
        return (
          <button
            key={i}
            disabled={!day}
            onClick={() => day && onSelect(new Date(year, month, day))}
            className={cn(
              "flex size-7 items-center justify-center rounded-full",
              !day && "invisible",
              isSelected ? "bg-primary-700 text-white" : "hover:bg-surface-elevated text-text-primary"
            )}
          >
            {day}
          </button>
        );
      })}
    </div>
  );
}

export function DatePicker({ value, onChange, placeholder = "Select date" }: { value?: Date | null; onChange?: (d: Date) => void; placeholder?: string }) {
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(value ?? new Date());
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex h-9 w-full items-center gap-2 rounded-md border border-border-strong bg-surface px-3 text-sm text-text-primary"
      >
        <CalendarIcon className="size-4 text-text-muted" />
        {value ? value.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : placeholder}
      </button>
      {open && (
        <div className="absolute z-50 mt-2 w-64 rounded-lg border border-border-default bg-surface p-3 shadow-lg">
          <div className="mb-2 flex items-center justify-between">
            <button onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}>
              <ChevronLeft className="size-4" />
            </button>
            <span className="text-sm font-medium text-text-primary">
              {cursor.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </span>
            <button onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}>
              <ChevronRight className="size-4" />
            </button>
          </div>
          <MonthGrid
            year={cursor.getFullYear()}
            month={cursor.getMonth()}
            selected={value ?? null}
            onSelect={(d) => {
              onChange?.(d);
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
