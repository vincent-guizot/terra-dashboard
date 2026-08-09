import { useState, type MouseEvent, type ReactNode } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { cn } from "@/lib/utils";

export interface ContextMenuItem {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  destructive?: boolean;
}

export function ContextMenu({ children, items }: { children: ReactNode; items: ContextMenuItem[] }) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const ref = useClickOutside<HTMLDivElement>(() => setPos(null));

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    setPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div onContextMenu={handleContextMenu}>
      {children}
      {pos && (
        <div
          ref={ref}
          style={{ position: "fixed", top: pos.y, left: pos.x }}
          className="z-50 w-48 overflow-hidden rounded-md border border-border-default bg-surface py-1 shadow-lg"
        >
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => {
                item.onClick?.();
                setPos(null);
              }}
              className={cn(
                "flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-surface-elevated",
                item.destructive ? "text-danger-500" : "text-text-primary"
              )}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
