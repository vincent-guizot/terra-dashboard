import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SectionContainerProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  actions?: ReactNode;
}

export function SectionContainer({
  title,
  description,
  actions,
  className,
  children,
  ...props
}: SectionContainerProps) {
  return (
    <section
      className={cn(
        "rounded-lg border border-border-default bg-surface px-6 py-5",
        className,
      )}
      {...props}
    >
      {(title || actions) && (
        <div className="mb-4 flex items-center justify-between">
          <div>
            {title && (
              <h3 className="text-h3 font-semibold text-text-primary">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-body text-text-muted">{description}</p>
            )}
          </div>
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}
