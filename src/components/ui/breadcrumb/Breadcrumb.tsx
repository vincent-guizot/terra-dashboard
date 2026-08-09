import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items, className }: { items: BreadcrumbItem[]; className?: string }) {
  return (
    <nav className={cn("flex items-center gap-1.5 text-sm text-text-muted", className)} aria-label="Breadcrumb">
      <Home className="size-3.5" />
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1.5">
            <ChevronRight className="size-3.5" />
            {item.href && !last ? (
              <Link to={item.href} className="hover:text-text-primary">
                {item.label}
              </Link>
            ) : (
              <span className={last ? "font-medium text-text-primary" : ""}>{item.label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
