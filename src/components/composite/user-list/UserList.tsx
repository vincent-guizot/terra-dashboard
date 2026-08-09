import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { Badge } from "@/components/ui/badge";

export interface UserListEntry {
  id: string | number;
  name: string;
  role: string;
  avatarSrc?: string;
  status?: "online" | "offline" | "away";
  badge?: string;
}

export function UserList({ title = "Team", users }: { title?: string; users: UserListEntry[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="divide-y divide-border-default p-0">
        {users.map((user) => (
          <div key={user.id} className="flex items-center gap-3 px-5 py-3">
            <Avatar name={user.name} src={user.avatarSrc} size="sm" status={user.status} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-text-primary">{user.name}</p>
              <p className="truncate text-xs text-text-muted">{user.role}</p>
            </div>
            {user.badge && <Badge variant="neutral">{user.badge}</Badge>}
            {user.status && <StatusIndicator status={user.status} className="hidden sm:flex" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
