import type { HTMLAttributes, ReactNode } from "react";
import { CheckCircle2, Info, AlertTriangle, XCircle, X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const alertVariants = cva("flex items-start gap-3 rounded-md border p-3.5 text-sm", {
  variants: {
    variant: {
      success: "border-success-border bg-success-100 text-success-700",
      info: "border-info-border bg-info-100 text-info-700",
      warning: "border-warning-border bg-warning-100 text-warning-700",
      error: "border-danger-border bg-danger-100 text-danger-700",
    },
  },
  defaultVariants: { variant: "info" },
});

const icons: Record<string, ReactNode> = {
  success: <CheckCircle2 className="size-5" />,
  info: <Info className="size-5" />,
  warning: <AlertTriangle className="size-5" />,
  error: <XCircle className="size-5" />,
};

export interface AlertProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
  title: string;
  description?: string;
  onClose?: () => void;
}

export function Alert({ className, variant = "info", title, description, onClose, ...props }: AlertProps) {
  return (
    <div className={cn(alertVariants({ variant, className }))} {...props}>
      <span className="shrink-0">{icons[variant as string]}</span>
      <div className="flex-1">
        <p className="font-medium">{title}</p>
        {description && <p className="mt-0.5 opacity-90">{description}</p>}
      </div>
      {onClose && (
        <button onClick={onClose} aria-label="Dismiss" className="shrink-0 opacity-70 hover:opacity-100">
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}
