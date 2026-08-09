import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TimelineItem, type TimelineItemProps } from "@/components/ui/timeline-item";

export interface ActivityTimelineProps {
  title?: string;
  entries: Omit<TimelineItemProps, "last">[];
}

/**
 * ActivityTimeline — composes the TimelineItem atomic primitive into a
 * card. Distinct from ActivityFeed (which uses a simpler bullet-list
 * pattern): this one is for entries that benefit from tone-coded dots
 * (success/warning/danger) and a connecting line.
 */
export function ActivityTimeline({ title = "Timeline", entries }: ActivityTimelineProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {entries.map((entry, i) => (
          <TimelineItem key={i} {...entry} last={i === entries.length - 1} />
        ))}
      </CardContent>
    </Card>
  );
}
