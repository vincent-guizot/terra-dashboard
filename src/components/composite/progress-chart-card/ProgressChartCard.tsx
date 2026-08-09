import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export interface ProgressChartEntry {
  label: string;
  value: number;
}

export interface ProgressChartCardProps {
  title: string;
  description?: string;
  entries: ProgressChartEntry[];
}

/** ProgressChartCard — a card of stacked progress bars, one per metric (e.g. goal completion by team). */
export function ProgressChartCard({ title, description, entries }: ProgressChartCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">
        {entries.map((entry) => (
          <Progress key={entry.label} value={entry.value} label={entry.label} />
        ))}
      </CardContent>
    </Card>
  );
}
