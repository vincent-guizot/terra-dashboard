import { Card, CardContent } from "@/components/ui/card";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Divider } from "@/components/ui/divider";

export interface InvoiceSummaryProps {
  invoiceId: string;
  customer: string;
  issued: string;
  due: string;
  amount: string;
  status: string;
  statusVariant: BadgeProps["variant"];
}

/** InvoiceSummary — reusable billed-to / amount / status card for invoice detail views. */
export function InvoiceSummary({ invoiceId, customer, issued, due, amount, status, statusVariant }: InvoiceSummaryProps) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-text-muted">{invoiceId}</p>
            <p className="font-semibold text-text-primary">{customer}</p>
          </div>
          <Badge variant={statusVariant}>{status}</Badge>
        </div>
        <Divider className="my-4" />
        <dl className="space-y-2.5 text-sm">
          <div className="flex justify-between">
            <dt className="text-text-muted">Issued</dt>
            <dd className="text-text-primary">{issued}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-text-muted">Due</dt>
            <dd className="text-text-primary">{due}</dd>
          </div>
          <div className="flex justify-between text-base font-semibold text-text-primary">
            <dt>Amount</dt>
            <dd>{amount}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
