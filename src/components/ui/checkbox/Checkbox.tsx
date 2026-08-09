import { forwardRef, type InputHTMLAttributes } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const inputId = id ?? `checkbox-${Math.random().toString(36).slice(2, 9)}`;
    return (
      <label htmlFor={inputId} className="inline-flex items-center gap-2 cursor-pointer select-none">
        <span className="relative inline-flex size-4 shrink-0">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            className={cn(
              "peer size-4 shrink-0 appearance-none rounded border border-border-strong bg-surface checked:border-primary-700 checked:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600/40 disabled:opacity-50",
              className
            )}
            {...props}
          />
          <Check className="pointer-events-none absolute inset-0 m-auto size-3 text-white opacity-0 peer-checked:opacity-100" />
        </span>
        {label && <span className="text-sm text-text-primary">{label}</span>}
      </label>
    );
  }
);
Checkbox.displayName = "Checkbox";
