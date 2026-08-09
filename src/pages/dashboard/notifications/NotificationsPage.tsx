import { Bell, CheckCircle2, AlertTriangle, Info } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const notifications = [
  { id: 1, icon: <CheckCircle2 className="size-4 text-success-500" />, title: "Invoice INV-1001 paid", time: "2h ago" },
  { id: 2, icon: <Info className="size-4 text-info-500" />, title: "New comment on Website Redesign", time: "5h ago" },
  { id: 3, icon: <AlertTriangle className="size-4 text-warning-500" />, title: "Invoice INV-1003 is overdue", time: "1d ago" },
];

export function NotificationsPage() {
  return (
    <div>
      <PageHeader
        title="Notifications"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Notifications" }]}
        actions={<Button variant="outline">Mark all as read</Button>}
      />
      <Card className="divide-y divide-border-default">
        {notifications.map((n) => (
          <div key={n.id} className="flex items-center gap-3 p-4">
            <span className="flex size-8 items-center justify-center rounded-full bg-surface-elevated">
              {n.icon}
            </span>
            <p className="flex-1 text-sm text-text-primary">{n.title}</p>
            <span className="text-xs text-text-muted">{n.time}</span>
          </div>
        ))}
      </Card>
      {notifications.length === 0 && (
        <div className="py-12 text-center text-text-muted">
          <Bell className="mx-auto size-8" />
        </div>
      )}
    </div>
  );
}
