import { PageHeader } from "@/components/layout/page-header";
import { ContainerCard } from "@/components/layout/container-card";
import { Badge } from "@/components/ui/badge";

const days = Array.from({ length: 30 }, (_, i) => i + 1);
const eventsByDay: Record<number, { label: string; variant: "primary" | "success" | "warning" }> = {
  4: { label: "Team sync", variant: "primary" },
  12: { label: "Product launch", variant: "success" },
  20: { label: "Invoice due", variant: "warning" },
};

export function CalendarPage() {
  return (
    <div>
      <PageHeader
        title="Calendar"
        description="Your team's schedule at a glance."
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Calendar" }]}
      />
      <ContainerCard>
        <p className="mb-4 text-sm font-semibold text-text-primary">August 2026</p>
        <div className="grid grid-cols-7 gap-2 text-center text-xs font-medium text-text-muted">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-7 gap-2">
          {days.map((day) => (
            <div key={day} className="flex min-h-20 flex-col gap-1 rounded-md border border-border-default p-1.5 text-xs">
              <span className="text-text-muted">{day}</span>
              {eventsByDay[day] && <Badge variant={eventsByDay[day].variant}>{eventsByDay[day].label}</Badge>}
            </div>
          ))}
        </div>
      </ContainerCard>
    </div>
  );
}
