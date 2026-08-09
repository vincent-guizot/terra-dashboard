import { createContext, useContext, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const AccordionContext = createContext<{ open: string[]; toggle: (v: string) => void } | undefined>(
  undefined
);

export function Accordion({
  children,
  type = "single",
  className,
}: {
  children: ReactNode;
  type?: "single" | "multiple";
  className?: string;
}) {
  const [open, setOpen] = useState<string[]>([]);
  const toggle = (v: string) =>
    setOpen((prev) =>
      type === "single"
        ? prev.includes(v)
          ? []
          : [v]
        : prev.includes(v)
        ? prev.filter((x) => x !== v)
        : [...prev, v]
    );
  return (
    <AccordionContext.Provider value={{ open, toggle }}>
      <div className={cn("divide-y divide-border-default border-y border-border-default", className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({ value, title, children }: { value: string; title: string; children: ReactNode }) {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error("AccordionItem must be used within Accordion");
  const isOpen = ctx.open.includes(value);
  return (
    <div>
      <button
        onClick={() => ctx.toggle(value)}
        className="flex w-full items-center justify-between py-3.5 text-left text-sm font-medium text-text-primary"
      >
        {title}
        <ChevronDown className={cn("size-4 text-text-muted transition-transform", isOpen && "rotate-180")} />
      </button>
      {isOpen && <div className="pb-3.5 text-sm text-text-muted">{children}</div>}
    </div>
  );
}
