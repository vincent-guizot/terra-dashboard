import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface DropdownButtonOption {
  label: string;
  onClick?: () => void;
  icon?: ReactNode;
}

export interface DropdownButtonProps extends Pick<ButtonProps, "variant" | "size"> {
  label: string;
  options: DropdownButtonOption[];
  className?: string;
}

export function DropdownButton({ label, options, variant = "outline", size = "md", className }: DropdownButtonProps) {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));

  return (
    <div className={cn("relative inline-block", className)} ref={ref}>
      <Button variant={variant} size={size} onClick={() => setOpen((o) => !o)}>
        {label}
        <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} />
      </Button>
      {open && (
        <div className="absolute z-50 mt-2 w-48 overflow-hidden rounded-md border border-border-default bg-surface py-1 shadow-lg">
          {options.map((opt, i) => (
            <button
              key={i}
              onClick={() => {
                opt.onClick?.();
                setOpen(false);
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-text-primary hover:bg-surface-elevated"
            >
              {opt.icon}
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
