import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { DataTable, type DataTableColumn } from "@/components/composite/data-table";
import { products, type Product } from "@/lib/mock-data";

const statusVariant = { "In Stock": "success", "Low Stock": "warning", "Out of Stock": "danger" } as const;

export function ProductsPage() {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const columns: DataTableColumn<Product>[] = [
    { key: "name", header: "Product", render: (row) => <span className="font-medium">{row.name}</span> },
    { key: "category", header: "Category", render: (row) => row.category },
    { key: "price", header: "Price", render: (row) => row.price },
    { key: "stock", header: "Stock", render: (row) => row.stock },
    { key: "status", header: "Status", render: (row) => <Badge variant={statusVariant[row.status]}>{row.status}</Badge> },
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
        title="Products"
        description="Manage your product catalog and inventory."
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Products" }]}
        actions={
          <Button onClick={() => navigate("/products/new")}>
            <Plus className="size-4" /> Add Product
          </Button>
        }
      />
      <div className="mb-4 max-w-xs">
        <SearchInput placeholder="Search products..." />
      </div>
      <DataTable columns={columns} data={products} />
      <div className="mt-4 flex justify-end">
        <Pagination page={page} totalPages={3} onPageChange={setPage} />
      </div>
    </div>
  );
}
