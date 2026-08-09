import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AvatarGroup, Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { BadgeProps } from "@/components/ui/badge";

export interface ProjectCardProps {
  name: string;
  description: string;
  status: string;
  statusVariant: BadgeProps["variant"];
  progress: number;
  members: string[];
  dueDate: string;
}

export function ProjectCard({ name, description, status, statusVariant, progress, members, dueDate }: ProjectCardProps) {
  return (
    <Card className="p-5">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <p className="font-semibold text-text-primary">{name}</p>
          <p className="mt-0.5 text-sm text-text-muted line-clamp-2">{description}</p>
        </div>
        <Badge variant={statusVariant}>{status}</Badge>
      </div>
      <Progress value={progress} label="Progress" className="mb-4" />
      <div className="flex items-center justify-between">
        <AvatarGroup max={3}>
          {members.map((m) => (
            <Avatar key={m} name={m} size="xs" />
          ))}
        </AvatarGroup>
        <span className="text-xs text-text-muted">Due {dueDate}</span>
      </div>
    </Card>
  );
}
