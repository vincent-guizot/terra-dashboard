import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ContentGrid } from "@/components/layout/content-grid";
import { ProjectCard } from "@/components/composite/project-card";
import { projects } from "@/lib/mock-data";

export function ProjectsPage() {
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader
        title="Projects"
        description="Track progress across all active projects."
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Projects" }]}
        actions={
          <Button>
            <Plus className="size-4" /> New Project
          </Button>
        }
      />
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <ContentGrid cols={3}>
            {projects.map((p) => (
              <div key={p.id} onClick={() => navigate(`/projects/${p.id}`)} className="cursor-pointer">
                <ProjectCard {...p} />
              </div>
            ))}
          </ContentGrid>
        </TabsContent>
        <TabsContent value="active">
          <ContentGrid cols={3}>
            {projects.filter((p) => p.status === "In Progress").map((p) => (
              <ProjectCard key={p.id} {...p} />
            ))}
          </ContentGrid>
        </TabsContent>
        <TabsContent value="completed">
          <ContentGrid cols={3}>
            {projects.filter((p) => p.status === "Completed").map((p) => (
              <ProjectCard key={p.id} {...p} />
            ))}
          </ContentGrid>
        </TabsContent>
      </Tabs>
    </div>
  );
}
