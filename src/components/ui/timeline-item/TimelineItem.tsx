import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * TimelineItem — one entry in a vertical timeline (dot + connecting
 * line + content). Compose a list of these to build an activity
 * timeline; ActivityFeed (composite) uses a similar pattern but this
 * is the reusable atomic primitive for any timeline UI.
 */
export interface TimelineItemProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  time?: string;
  last?: boolean;
  tone?: "default" | "success" | "warning" | "danger";
}

const toneMap = {
  default: "bg-primary-100 text-primary-700",
  success: "bg-success-100 text-success-700",
  warning: "bg-warning-100 text-warning-700",
  danger: "bg-danger-100 text-danger-700",
};

export function TimelineItem({ icon, title, description, time, last, tone = "default" }: TimelineItemProps) {
  return (
    <div className="relative flex gap-3">
      <div className="flex flex-col items-center">
        <span className={cn("flex size-6 shrink-0 items-center justify-center rounded-full", toneMap[tone])}>
          {icon}
        </span>
        {!last && <span className="my-1 w-px flex-1 bg-border-default" />}
      </div>
      <div className={cn("pb-5", last && "pb-0")}>
        <p className="text-sm font-medium text-text-primary">{title}</p>
        {description && <p className="text-sm text-text-muted">{description}</p>}
        {time && <p className="mt-0.5 text-xs text-text-muted">{time}</p>}
      </div>
    </div>
  );
}
