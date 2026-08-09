import { Plus } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { UserList } from "@/components/composite/user-list";

const columns = [
  { title: "To Do", tasks: [
    { id: 1, name: "Design onboarding flow", tag: "Design" },
    { id: 2, name: "Write API docs", tag: "Docs" },
  ]},
  { title: "In Progress", tasks: [
    { id: 3, name: "Implement DataTable sorting", tag: "Frontend" },
    { id: 4, name: "Set up CI pipeline", tag: "DevOps" },
  ]},
  { title: "Done", tasks: [
    { id: 5, name: "Foundations token system", tag: "Design" },
  ]},
];

const tagVariant: Record<string, "info" | "primary" | "warning"> = {
  Design: "primary",
  Docs: "info",
  Frontend: "info",
  DevOps: "warning",
};

const team = [
  { id: 1, name: "Sarah Chen", role: "Product Designer", status: "online" as const },
  { id: 2, name: "Marco Rossi", role: "Frontend Engineer", status: "online" as const },
  { id: 3, name: "Aiko Tanaka", role: "Backend Engineer", status: "away" as const },
  { id: 4, name: "Liam O'Connor", role: "DevOps", status: "offline" as const },
];

export function TasksPage() {
  return (
    <div>
      <PageHeader
        title="Tasks"
        description="Kanban board for day-to-day work."
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Tasks" }]}
        actions={
          <Button>
            <Plus className="size-4" /> New Task
          </Button>
        }
      />
      <div className="grid gap-6 lg:grid-cols-4">
        <div className="grid gap-4 sm:grid-cols-3 lg:col-span-3">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-text-muted">
                {col.title} <span className="text-text-muted/60">({col.tasks.length})</span>
              </p>
              <div className="space-y-3">
                {col.tasks.map((task) => (
                  <Card key={task.id} className="p-4">
                    <div className="flex items-start gap-2.5">
                      <Checkbox />
                      <div>
                        <p className="text-sm font-medium text-text-primary">{task.name}</p>
                        <Badge variant={tagVariant[task.tag]} className="mt-2">
                          {task.tag}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-1">
          <UserList title="Team" users={team} />
        </div>
      </div>
    </div>
  );
}
