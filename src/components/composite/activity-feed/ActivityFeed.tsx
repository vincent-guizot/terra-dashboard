import type { ReactNode } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface ActivityItem {
  id: string | number;
  icon: ReactNode;
  title: string;
  description?: string;
  time: string;
  iconColor?: string;
}

export function ActivityFeed({ title = "Recent Activity", items }: { title?: string; items: ActivityItem[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="relative space-y-5 border-l border-border-default pl-6">
          {items.map((item) => (
            <li key={item.id} className="relative">
              <span
                className={cn(
                  "absolute -left-[29px] flex size-6 items-center justify-center rounded-full bg-primary-100 text-primary-700 ring-4 ring-surface",
                  item.iconColor
                )}
              >
                {item.icon}
              </span>
              <p className="text-sm font-medium text-text-primary">{item.title}</p>
              {item.description && <p className="text-sm text-text-muted">{item.description}</p>}
              <p className="mt-0.5 text-xs text-text-muted">{item.time}</p>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
