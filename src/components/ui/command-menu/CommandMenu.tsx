import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Search } from "lucide-react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

export interface CommandMenuItem {
  id: string;
  label: string;
  group?: string;
  icon?: ReactNode;
  onSelect: () => void;
}

export interface CommandMenuProps {
  open: boolean;
  onClose: () => void;
  items: CommandMenuItem[];
  placeholder?: string;
}

/**
 * Command Menu — a Cmd+K style palette. Mount once near the root and
 * control `open` from a global keyboard shortcut (see useCommandMenu below).
 */
export function CommandMenu({ open, onClose, items, placeholder = "Type a command or search..." }: CommandMenuProps) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const filtered = useMemo(
    () => items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase())),
    [items, query]
  );

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActiveIndex(0);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") setActiveIndex((i) => Math.min(filtered.length - 1, i + 1));
      if (e.key === "ArrowUp") setActiveIndex((i) => Math.max(0, i - 1));
      if (e.key === "Enter" && filtered[activeIndex]) {
        filtered[activeIndex].onSelect();
        onClose();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, filtered, activeIndex, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24">
      <div className="absolute inset-0 bg-primary-950/40" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-lg border border-border-default bg-surface shadow-xl">
        <div className="flex items-center gap-2 border-b border-border-default px-4 py-3">
          <Search className="size-4 text-text-muted" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
          />
        </div>
        <div className="max-h-80 overflow-y-auto p-1.5">
          {filtered.length === 0 && <p className="p-4 text-center text-sm text-text-muted">No results found.</p>}
          {filtered.map((item, i) => (
            <button
              key={item.id}
              onClick={() => {
                item.onSelect();
                onClose();
              }}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm",
                i === activeIndex ? "bg-primary-100 text-primary-700" : "text-text-primary hover:bg-surface-elevated"
              )}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}

export function useCommandMenuShortcut(toggle: () => void) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggle();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [toggle]);
}
