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
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/toast";
import { projects } from "@/lib/mock-data";

type ProjectStatus = "Planning" | "In Progress" | "Review" | "Completed";

const statusVariantMap: Record<ProjectStatus, "neutral" | "info" | "warning" | "success"> = {
  Planning: "neutral",
  "In Progress": "info",
  Review: "warning",
  Completed: "success",
};

/** "Add Project" form. Pushes into the in-memory mock `projects` array. */
export function ProjectCreatePage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<ProjectStatus>("Planning");
  const [members, setMembers] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Project name is required.";
    if (!description.trim()) next.description = "A short description is required.";
    if (!dueDate.trim()) next.dueDate = "Due date is required, e.g. Sep 15.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    const newProject = {
      id: `pr${projects.length + 1}`,
      name: name.trim(),
      description: description.trim(),
      status,
      statusVariant: statusVariantMap[status],
      progress,
      members: members
        .split(",")
        .map((m) => m.trim())
        .filter(Boolean),
      dueDate: dueDate.trim(),
    };
    projects.unshift(newProject);

    setTimeout(() => {
      setSubmitting(false);
      toast({ title: "Project created", description: `${newProject.name} was added to your projects.`, variant: "success" });
      navigate("/projects");
    }, 400);
  }

  return (
    <div>
      <PageHeader
        title="Add Project"
        description="Start tracking a new project."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Projects", href: "/projects" },
          { label: "Add Project" },
        ]}
        actions={
          <Button variant="outline" onClick={() => navigate("/projects")}>
            <ArrowLeft className="size-4" /> Back to Projects
          </Button>
        }
      />

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Project details</CardTitle>
              <CardDescription>Name, description, and who's working on it.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="project-name">Project name</Label>
                <Input id="project-name" placeholder="e.g. Website Redesign" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} />
              </div>
              <div>
                <Label htmlFor="project-description">Description</Label>
                <Textarea id="project-description" placeholder="What is this project about?" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} error={errors.description} />
              </div>
              <div>
                <Label htmlFor="project-members">Team members</Label>
                <Input id="project-members" placeholder="Sarah Chen, Marco Rossi" value={members} onChange={(e) => setMembers(e.target.value)} />
                <p className="mt-1.5 text-xs text-text-muted">Comma-separated names.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Status &amp; timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="project-status">Status</Label>
                <Select id="project-status" value={status} onChange={(e) => setStatus(e.target.value as ProjectStatus)}>
                  <option value="Planning">Planning</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Review">Review</option>
                  <option value="Completed">Completed</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="project-due">Due date</Label>
                <Input id="project-due" placeholder="e.g. Sep 15" value={dueDate} onChange={(e) => setDueDate(e.target.value)} error={errors.dueDate} />
              </div>
              <div>
                <Label>Initial progress: {progress}%</Label>
                <Slider value={progress} onChange={(e) => setProgress(Number(e.target.value))} min={0} max={100} />
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-2">
            <Button type="submit" loading={submitting}>
              <Save className="size-4" /> Save Project
            </Button>
            <Button type="button" variant="ghost" onClick={() => navigate("/projects")}>
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
