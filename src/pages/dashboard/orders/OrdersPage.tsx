import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/layout/page-header";
import { DatePicker } from "@/components/ui/date-picker";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import { DataTable, type DataTableColumn } from "@/components/composite/data-table";
import { orders, type Order } from "@/lib/mock-data";

const statusVariant = { Paid: "success", Pending: "warning", Refunded: "info", Cancelled: "danger" } as const;

export function OrdersPage() {
  const [page, setPage] = useState(1);
  const [date, setDate] = useState<Date | null>(null);
  const navigate = useNavigate();

  const columns: DataTableColumn<Order>[] = [
    {
      key: "id",
      header: "Order",
      render: (row) => (
        <button onClick={() => navigate(`/orders/${row.id.replace("#", "")}`)} className="font-medium text-primary-700 hover:underline">
          {row.id}
        </button>
      ),
    },
    { key: "customer", header: "Customer", render: (row) => row.customer },
    { key: "date", header: "Date", render: (row) => row.date },
    { key: "total", header: "Total", render: (row) => row.total },
    { key: "status", header: "Status", render: (row) => <Badge variant={statusVariant[row.status]}>{row.status}</Badge> },
  ];

  return (
    <div>
      <PageHeader
        title="Orders"
        description="Track and manage customer orders."
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Orders" }]}
      />
      <div className="mb-4 max-w-xs">
        <DatePicker value={date} onChange={setDate} placeholder="Filter by date" />
      </div>
      <DataTable columns={columns} data={orders} />
      <div className="mt-4 flex justify-end">
        <Pagination page={page} totalPages={4} onPageChange={setPage} />
      </div>
    </div>
  );
}
