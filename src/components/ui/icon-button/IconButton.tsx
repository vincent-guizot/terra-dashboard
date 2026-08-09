import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  variant?: "default" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  "aria-label": string;
}

const sizeMap = { sm: "size-7", md: "size-9", lg: "size-11" };
const variantMap = {
  default: "border border-border-strong bg-surface hover:bg-surface-elevated text-text-primary",
  ghost: "bg-transparent hover:bg-surface-elevated text-text-primary",
  destructive: "bg-transparent hover:bg-danger-100 text-danger-500",
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, icon, variant = "default", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 disabled:opacity-50 disabled:pointer-events-none",
        sizeMap[size],
        variantMap[variant],
        className
      )}
      {...props}
    >
      {icon}
    </button>
  )
);
IconButton.displayName = "IconButton";
