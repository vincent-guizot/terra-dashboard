import { useParams } from "react-router-dom";
import { PageHeader } from "@/components/layout/page-header";
import { InvoiceSummary } from "@/components/composite/invoice-summary";
import { Button } from "@/components/ui/button";
import { invoices } from "@/lib/mock-data";

const statusVariant = { Paid: "success", Unpaid: "warning", Overdue: "danger" } as const;

export function InvoiceDetailPage() {
  const { id } = useParams();
  const invoice = invoices.find((i) => i.id === id) ?? invoices[0];

  return (
    <div>
      <PageHeader
        title={invoice.id}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Invoices", href: "/invoices" },
          { label: invoice.id },
        ]}
        actions={<Button variant="outline">Download PDF</Button>}
      />
      <div className="max-w-xl">
        <InvoiceSummary
          invoiceId={invoice.id}
          customer={invoice.customer}
          issued={invoice.issued}
          due={invoice.due}
          amount={invoice.amount}
          status={invoice.status}
          statusVariant={statusVariant[invoice.status]}
        />
      </div>
    </div>
  );
}
