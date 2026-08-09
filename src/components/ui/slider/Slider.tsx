import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  showValue?: boolean;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ className, showValue, value, ...props }, ref) => (
    <div className="w-full">
      <input
        ref={ref}
        type="range"
        value={value}
        className={cn(
          "h-1.5 w-full cursor-pointer appearance-none rounded-full bg-surface-elevated accent-primary-700",
          className
        )}
        {...props}
      />
      {showValue && <div className="mt-1 text-right text-xs text-text-muted">{value}</div>}
    </div>
  )
);
Slider.displayName = "Slider";
