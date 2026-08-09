import { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { cn } from "@/lib/utils";

export interface DateRange {
  from: Date | null;
  to: Date | null;
}

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function isBetween(d: Date, from: Date, to: Date) {
  return d.getTime() >= from.getTime() && d.getTime() <= to.getTime();
}

function MonthGrid({
  year,
  month,
  range,
  onPick,
}: {
  year: number;
  month: number;
  range: DateRange;
  onPick: (d: Date) => void;
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
        if (!day) return <div key={i} className="invisible size-7" />;
        const date = new Date(year, month, day);
        const isFrom = range.from && date.toDateString() === range.from.toDateString();
        const isTo = range.to && date.toDateString() === range.to.toDateString();
        const inRange = range.from && range.to && isBetween(date, range.from, range.to);
        return (
          <button
            key={i}
            onClick={() => onPick(date)}
            className={cn(
              "flex size-7 items-center justify-center rounded-full text-text-primary hover:bg-surface-elevated",
              inRange && !isFrom && !isTo && "rounded-none bg-primary-100",
              (isFrom || isTo) && "bg-primary-700 text-white hover:bg-primary-700"
            )}
          >
            {day}
          </button>
        );
      })}
    </div>
  );
}

export function DateRangePicker({
  value,
  onChange,
  placeholder = "Select date range",
}: {
  value: DateRange;
  onChange: (r: DateRange) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(value.from ?? new Date());
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));

  const handlePick = (d: Date) => {
    if (!value.from || (value.from && value.to)) {
      onChange({ from: d, to: null });
    } else if (d.getTime() < value.from.getTime()) {
      onChange({ from: d, to: value.from });
    } else {
      onChange({ from: value.from, to: d });
    }
  };

  const label =
    value.from && value.to
      ? `${value.from.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${value.to.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
      : value.from
      ? value.from.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      : placeholder;

  const nextMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex h-9 w-full items-center gap-2 rounded-md border border-border-strong bg-surface px-3 text-sm text-text-primary"
      >
        <CalendarIcon className="size-4 text-text-muted" />
        {label}
      </button>
      {open && (
        <div className="absolute z-50 mt-2 w-[35rem] max-w-[90vw] rounded-lg border border-border-default bg-surface p-3 shadow-lg">
          <div className="mb-2 flex items-center justify-between">
            <button onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}>
              <ChevronLeft className="size-4" />
            </button>
            <div className="flex gap-16 text-sm font-medium text-text-primary sm:gap-24">
              <span>{cursor.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
              <span className="hidden sm:inline">{nextMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
            </div>
            <button onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}>
              <ChevronRight className="size-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <MonthGrid year={cursor.getFullYear()} month={cursor.getMonth()} range={value} onPick={handlePick} />
            <div className="hidden sm:block">
              <MonthGrid year={nextMonth.getFullYear()} month={nextMonth.getMonth()} range={value} onPick={handlePick} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
