import { useParams } from "react-router-dom";
import { CheckCircle2, FileText, MessageSquare } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { ContainerCard } from "@/components/layout/container-card";
import { ContentGrid } from "@/components/layout/content-grid";
import { Progress } from "@/components/ui/progress";
import { ActivityTimeline } from "@/components/composite/activity-timeline";
import { ListCard } from "@/components/composite/list-card";
import { projects } from "@/lib/mock-data";

export function ProjectDetailPage() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id) ?? projects[0];

  return (
    <div>
      <PageHeader
        title={project.name}
        description={project.description}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Projects", href: "/projects" },
          { label: project.name },
        ]}
      />
      <ContainerCard className="mb-6">
        <Progress value={project.progress} label="Overall progress" />
      </ContainerCard>

      <ContentGrid cols={2} gap="lg">
        <ActivityTimeline
          title="Recent Activity"
          entries={[
            { icon: <CheckCircle2 className="size-3.5" />, title: "Design review approved", time: "2h ago", tone: "success" },
            { icon: <FileText className="size-3.5" />, title: "Spec document updated", description: "v3 uploaded to Files", time: "Yesterday" },
            { icon: <MessageSquare className="size-3.5" />, title: "New comment from Marco Rossi", time: "2 days ago" },
          ]}
        />
        <ListCard
          title="Files"
          items={[
            { id: 1, icon: <FileText className="size-4 text-text-muted" />, title: "design-spec-v3.pdf", subtitle: "2.4 MB · Updated yesterday" },
            { id: 2, icon: <FileText className="size-4 text-text-muted" />, title: "component-audit.xlsx", subtitle: "890 KB · Updated 3 days ago" },
            { id: 3, icon: <FileText className="size-4 text-text-muted" />, title: "brand-guidelines.pdf", subtitle: "5.1 MB · Updated last week" },
          ]}
        />
      </ContentGrid>
    </div>
  );
}
