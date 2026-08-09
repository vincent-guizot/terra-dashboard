import { useState } from "react";
import { ChevronDown, Check, X } from "lucide-react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { cn } from "@/lib/utils";

export interface MultiSelectOption {
  label: string;
  value: string;
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select options",
}: {
  options: MultiSelectOption[];
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));

  const toggle = (v: string) =>
    onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex min-h-9 w-full flex-wrap items-center gap-1.5 rounded-md border border-border-strong bg-surface px-2.5 py-1.5 text-left text-sm"
      >
        {value.length === 0 && <span className="text-text-muted">{placeholder}</span>}
        {value.map((v) => {
          const opt = options.find((o) => o.value === v);
          return (
            <span
              key={v}
              className="flex items-center gap-1 rounded bg-primary-100 px-1.5 py-0.5 text-xs font-medium text-primary-700"
            >
              {opt?.label}
              <X
                className="size-3 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  toggle(v);
                }}
              />
            </span>
          );
        })}
        <ChevronDown className="ml-auto size-4 text-text-muted" />
      </button>
      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-border-default bg-surface py-1 shadow-lg">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => toggle(opt.value)}
              className={cn(
                "flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-surface-elevated",
                value.includes(opt.value) ? "text-primary-700" : "text-text-primary"
              )}
            >
              {opt.label}
              {value.includes(opt.value) && <Check className="size-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
