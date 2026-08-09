import { Mail, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Divider } from "@/components/ui/divider";

export interface ProfileCardProps {
  name: string;
  role: string;
  avatarSrc?: string;
  email?: string;
  phone?: string;
  badge?: string;
  stats?: { label: string; value: string }[];
}

export function ProfileCard({ name, role, avatarSrc, email, phone, badge, stats }: ProfileCardProps) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center text-center">
        <Avatar name={name} src={avatarSrc} size="lg" />
        <p className="mt-3 font-semibold text-text-primary">{name}</p>
        <p className="text-sm text-text-muted">{role}</p>
        {badge && (
          <Badge variant="success" className="mt-2">
            {badge}
          </Badge>
        )}
        {(email || phone) && (
          <>
            <Divider className="my-4 w-full" />
            <div className="w-full space-y-2 text-left text-sm">
              {email && (
                <p className="flex items-center gap-2 text-text-secondary">
                  <Mail className="size-4 text-text-muted" /> {email}
                </p>
              )}
              {phone && (
                <p className="flex items-center gap-2 text-text-secondary">
                  <Phone className="size-4 text-text-muted" /> {phone}
                </p>
              )}
            </div>
          </>
        )}
        {stats && (
          <>
            <Divider className="my-4 w-full" />
            <div className="grid w-full grid-cols-3 gap-2">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-sm font-semibold text-text-primary">{stat.value}</p>
                  <p className="text-xs text-text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
