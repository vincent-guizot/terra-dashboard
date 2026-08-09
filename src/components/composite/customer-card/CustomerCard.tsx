import { Mail, Building2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge, type BadgeProps } from "@/components/ui/badge";

export interface CustomerCardProps {
  name: string;
  email: string;
  company: string;
  status: string;
  statusVariant: BadgeProps["variant"];
  spent: string;
  onClick?: () => void;
}

/** CustomerCard — compact business-pattern card for a customer, used in grid views of the Customers page. */
export function CustomerCard({ name, email, company, status, statusVariant, spent, onClick }: CustomerCardProps) {
  return (
    <Card className="cursor-pointer p-5 transition-shadow hover:shadow-md" onClick={onClick}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar name={name} size="md" />
          <div>
            <p className="font-medium text-text-primary">{name}</p>
            <p className="flex items-center gap-1 text-xs text-text-muted">
              <Mail className="size-3" /> {email}
            </p>
          </div>
        </div>
        <Badge variant={statusVariant}>{status}</Badge>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-border-default pt-3 text-sm">
        <span className="flex items-center gap-1.5 text-text-muted">
          <Building2 className="size-3.5" /> {company}
        </span>
        <span className="font-medium text-text-primary">{spent}</span>
      </div>
    </Card>
  );
}
