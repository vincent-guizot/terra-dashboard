import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { useToast } from "@/components/ui/toast";

/**
 * "Add Task" form.
 *
 * TasksPage's Kanban columns are local component state (not exported from
 * mock-data.ts), so this page doesn't mutate them directly — it collects the
 * task, shows a confirmation toast, and returns to the board. Wire the
 * `onSubmit` handler to your real task-creation mutation / column state
 * when you connect a backend.
 */
export function TaskCreatePage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [tag, setTag] = useState("Design");
  const [column, setColumn] = useState("To Do");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Task name is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast({ title: "Task created", description: `"${name.trim()}" was added to ${column}.`, variant: "success" });
      navigate("/tasks");
    }, 400);
  }

  return (
    <div>
      <PageHeader
        title="Add Task"
        description="Create a new task on the board."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Tasks", href: "/tasks" },
          { label: "Add Task" },
        ]}
        actions={
          <Button variant="outline" onClick={() => navigate("/tasks")}>
            <ArrowLeft className="size-4" /> Back to Tasks
          </Button>
        }
      />

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Task details</CardTitle>
            <CardDescription>What needs to be done, and where it starts on the board.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="task-name">Task name</Label>
              <Input id="task-name" placeholder="e.g. Design onboarding flow" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="task-column">Column</Label>
                <Select id="task-column" value={column} onChange={(e) => setColumn(e.target.value)}>
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="task-tag">Tag</Label>
                <Select id="task-tag" value={tag} onChange={(e) => setTag(e.target.value)}>
                  <option value="Design">Design</option>
                  <option value="Docs">Docs</option>
                  <option value="Frontend">Frontend</option>
                  <option value="DevOps">DevOps</option>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="task-notes">Notes (optional)</Label>
              <Textarea id="task-notes" placeholder="Any extra context for this task..." rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex gap-2">
          <Button type="submit" loading={submitting}>
            <Save className="size-4" /> Save Task
          </Button>
          <Button type="button" variant="ghost" onClick={() => navigate("/tasks")}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
