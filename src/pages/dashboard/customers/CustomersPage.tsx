import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, MoreVertical, Pencil, Trash2, Download } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Pagination } from "@/components/ui/pagination";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { DataTable, type DataTableColumn } from "@/components/composite/data-table";
import { TableToolbar } from "@/components/composite/table-toolbar";
import { TableFilter } from "@/components/composite/table-filter";
import { TableColumnManager, type ColumnConfig } from "@/components/composite/table-column-manager";
import { TableBulkActions } from "@/components/composite/table-bulk-actions";
import { customers, type Customer } from "@/lib/mock-data";

const statusVariant = { Active: "success", Inactive: "neutral", Pending: "warning" } as const;

export function CustomersPage() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState<string[]>([]);
  const [columns, setColumns] = useState<ColumnConfig[]>([
    { key: "company", label: "Company", visible: true },
    { key: "status", label: "Status", visible: true },
    { key: "spent", label: "Total Spent", visible: true },
    { key: "joined", label: "Joined", visible: true },
  ]);
  const navigate = useNavigate();

  const isVisible = (key: string) => columns.find((c) => c.key === key)?.visible ?? true;
  const toggleAll = () => setSelected(selected.length === customers.length ? [] : customers.map((c) => c.id));

  const tableColumns: DataTableColumn<Customer>[] = [
    {
      key: "select",
      header: "",
      render: (row) => (
        <Checkbox
          checked={selected.includes(row.id)}
          onChange={() =>
            setSelected((prev) => (prev.includes(row.id) ? prev.filter((id) => id !== row.id) : [...prev, row.id]))
          }
        />
      ),
    },
    {
      key: "name",
      header: "Customer",
      render: (row) => (
        <button onClick={() => navigate(`/customers/${row.id}`)} className="flex items-center gap-3 text-left">
          <Avatar name={row.name} size="sm" />
          <div>
            <p className="font-medium text-text-primary hover:underline">{row.name}</p>
            <p className="text-xs text-text-muted">{row.email}</p>
          </div>
        </button>
      ),
    },
    ...(isVisible("company") ? [{ key: "company", header: "Company", render: (row: Customer) => row.company }] : []),
    ...(isVisible("status")
      ? [{ key: "status", header: "Status", render: (row: Customer) => <Badge variant={statusVariant[row.status]}>{row.status}</Badge> }]
      : []),
    ...(isVisible("spent") ? [{ key: "spent", header: "Total Spent", render: (row: Customer) => row.spent }] : []),
    ...(isVisible("joined") ? [{ key: "joined", header: "Joined", render: (row: Customer) => row.joined }] : []),
    {
      key: "actions",
      header: "",
      className: "text-right",
      render: () => (
        <DropdownMenu
          trigger={
            <button className="rounded-md p-1.5 hover:bg-surface-elevated" aria-label="Actions">
              <MoreVertical className="size-4 text-text-muted" />
            </button>
          }
          items={[
            { label: "Edit", icon: <Pencil className="size-4" /> },
            { label: "Delete", icon: <Trash2 className="size-4" />, destructive: true },
          ]}
        />
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Customers"
        description="Manage your customer relationships and accounts."
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Customers" }]}
        actions={
          <Button>
            <Plus className="size-4" /> Add Customer
          </Button>
        }
      />

      <TableToolbar
        searchPlaceholder="Search customers..."
        filters={
          <>
            <TableFilter
              activeCount={statusFilter === "all" ? 0 : 1}
              onClear={() => setStatusFilter("all")}
              fields={[
                {
                  key: "status",
                  label: "Status",
                  value: statusFilter,
                  onChange: setStatusFilter,
                  options: [
                    { label: "All statuses", value: "all" },
                    { label: "Active", value: "active" },
                    { label: "Inactive", value: "inactive" },
                    { label: "Pending", value: "pending" },
                  ],
                },
              ]}
            />
            <TableColumnManager
              columns={columns}
              onToggle={(key) => setColumns((prev) => prev.map((c) => (c.key === key ? { ...c, visible: !c.visible } : c)))}
            />
          </>
        }
        actions={
          <label className="flex items-center gap-2 text-xs text-text-muted">
            <Checkbox checked={selected.length === customers.length} onChange={toggleAll} /> Select all
          </label>
        }
      />

      <TableBulkActions
        count={selected.length}
        onClear={() => setSelected([])}
        actions={
          <Button size="sm" variant="outline">
            <Download className="size-4" /> Export
          </Button>
        }
      />

      <DataTable columns={tableColumns} data={customers} />

      <div className="mt-4 flex justify-end">
        <Pagination page={page} totalPages={5} onPageChange={setPage} />
      </div>
    </div>
  );
}
