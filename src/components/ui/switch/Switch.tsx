import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, id, ...props }, ref) => {
    const inputId = id ?? `switch-${Math.random().toString(36).slice(2, 9)}`;
    return (
      <label htmlFor={inputId} className="inline-flex cursor-pointer items-center">
        <input ref={ref} id={inputId} type="checkbox" className="peer sr-only" {...props} />
        <span
          className={cn(
            "relative h-5 w-9 rounded-full bg-border-strong transition-colors duration-150",
            "after:absolute after:left-0.5 after:top-0.5 after:size-4 after:rounded-full after:bg-white after:transition-transform after:duration-150 after:content-['']",
            "peer-checked:bg-primary-700 peer-checked:after:translate-x-4",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-primary-600/40",
            "peer-disabled:opacity-50",
            className
          )}
        />
      </label>
    );
  }
);
Switch.displayName = "Switch";
