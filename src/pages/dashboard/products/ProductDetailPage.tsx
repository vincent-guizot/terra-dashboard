import { useParams } from "react-router-dom";
import { PageHeader } from "@/components/layout/page-header";
import { ContainerCard } from "@/components/layout/container-card";
import { Badge } from "@/components/ui/badge";
import { products } from "@/lib/mock-data";

export function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id) ?? products[0];

  return (
    <div>
      <PageHeader
        title={product.name}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Products", href: "/products" },
          { label: product.name },
        ]}
      />
      <ContainerCard className="max-w-xl">
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between"><dt className="text-text-muted">Category</dt><dd className="text-text-primary">{product.category}</dd></div>
          <div className="flex justify-between"><dt className="text-text-muted">Price</dt><dd className="text-text-primary">{product.price}</dd></div>
          <div className="flex justify-between"><dt className="text-text-muted">Stock</dt><dd className="text-text-primary">{product.stock} units</dd></div>
          <div className="flex justify-between items-center"><dt className="text-text-muted">Status</dt><dd><Badge variant="success">{product.status}</Badge></dd></div>
        </dl>
      </ContainerCard>
    </div>
  );
}
