import type { ReactNode } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export interface ListCardItem {
  id: string | number;
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  trailing?: ReactNode;
}

export function ListCard({ title, items }: { title: string; items: ListCardItem[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="divide-y divide-border-default p-0">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 px-5 py-3">
            {item.icon && <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-surface-elevated">{item.icon}</span>}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-text-primary">{item.title}</p>
              {item.subtitle && <p className="truncate text-xs text-text-muted">{item.subtitle}</p>}
            </div>
            {item.trailing}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
