import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        primary: "bg-primary-50 text-primary-700 border-primary-200",
        secondary: "bg-surface-elevated text-text-secondary border-border-default",
        success: "bg-success-100 text-success-700 border-success-border",
        warning: "bg-warning-100 text-warning-700 border-warning-border",
        danger: "bg-danger-100 text-danger-700 border-danger-border",
        info: "bg-info-100 text-info-700 border-info-border",
        neutral: "bg-surface-sunken text-text-muted border-border-default",
      },
    },
    defaultVariants: { variant: "neutral" },
  }
);

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}
