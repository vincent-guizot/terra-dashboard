import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/layout/page-header";
import { ContentGrid } from "@/components/layout/content-grid";
import { StatCard } from "@/components/composite/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { DataTable, type DataTableColumn } from "@/components/composite/data-table";
import { invoices, type Invoice } from "@/lib/mock-data";
import { Receipt, CircleDollarSign, AlertTriangle, Plus } from "lucide-react";

const statusVariant = { Paid: "success", Unpaid: "warning", Overdue: "danger" } as const;

export function InvoicesPage() {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const columns: DataTableColumn<Invoice>[] = [
    {
      key: "id",
      header: "Invoice",
      render: (row) => (
        <button onClick={() => navigate(`/invoices/${row.id}`)} className="font-medium text-primary-700 hover:underline">
          {row.id}
        </button>
      ),
    },
    { key: "customer", header: "Customer", render: (row) => row.customer },
    { key: "issued", header: "Issued", render: (row) => row.issued },
    { key: "due", header: "Due", render: (row) => row.due },
    { key: "amount", header: "Amount", render: (row) => row.amount },
    { key: "status", header: "Status", render: (row) => <Badge variant={statusVariant[row.status]}>{row.status}</Badge> },
  ];

  return (
    <div>
      <PageHeader
        title="Invoices"
        description="Track billing and payment status."
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Invoices" }]}
        actions={
          <Button onClick={() => navigate("/invoices/new")}>
            <Plus className="size-4" /> Add Invoice
          </Button>
        }
      />
      <ContentGrid cols={3} className="mb-6">
        <StatCard label="Total Billed" value="$2,530.00" icon={<Receipt className="size-5" />} />
        <StatCard label="Collected" value="$1,240.00" icon={<CircleDollarSign className="size-5" />} />
        <StatCard label="Overdue" value="$430.00" icon={<AlertTriangle className="size-5" />} />
      </ContentGrid>
      <DataTable columns={columns} data={invoices} />
      <div className="mt-4 flex justify-end">
        <Pagination page={page} totalPages={2} onPageChange={setPage} />
      </div>
    </div>
  );
}
