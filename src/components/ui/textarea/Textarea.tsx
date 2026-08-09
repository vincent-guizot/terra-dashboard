import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => (
    <div className="w-full">
      <textarea
        ref={ref}
        className={cn(
          "min-h-24 w-full rounded-md border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary-600/40",
          error ? "border-danger-500" : "border-border-strong focus:border-primary-500",
          className
        )}
        {...props}
      />
      {error && <p className="mt-1.5 text-xs text-danger-500">{error}</p>}
    </div>
  )
);
Textarea.displayName = "Textarea";
