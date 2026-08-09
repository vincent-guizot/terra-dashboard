import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, id, ...props }, ref) => {
    const inputId = id ?? `radio-${Math.random().toString(36).slice(2, 9)}`;
    return (
      <label htmlFor={inputId} className="inline-flex items-center gap-2 cursor-pointer select-none">
        <span className="relative inline-flex size-4 shrink-0">
          <input
            ref={ref}
            id={inputId}
            type="radio"
            className={cn(
              "peer size-4 shrink-0 appearance-none rounded-full border border-border-strong bg-surface checked:border-[5px] checked:border-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600/40 disabled:opacity-50",
              className
            )}
            {...props}
          />
        </span>
        {label && <span className="text-sm text-text-primary">{label}</span>}
      </label>
    );
  }
);
Radio.displayName = "Radio";
