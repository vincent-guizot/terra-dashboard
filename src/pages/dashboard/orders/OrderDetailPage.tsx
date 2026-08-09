import { useParams } from "react-router-dom";
import { PageHeader } from "@/components/layout/page-header";
import { ContainerCard } from "@/components/layout/container-card";
import { Stepper } from "@/components/ui/stepper";
import { Badge } from "@/components/ui/badge";
import { orders } from "@/lib/mock-data";

export function OrderDetailPage() {
  const { id } = useParams();
  const order = orders.find((o) => o.id === `#${id}`) ?? orders[0];

  return (
    <div>
      <PageHeader
        title={order.id}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Orders", href: "/orders" },
          { label: order.id },
        ]}
      />
      <div className="grid gap-6 lg:grid-cols-3">
        <ContainerCard className="lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold text-text-primary">Order Status</h3>
          <Stepper
            current={2}
            steps={[
              { label: "Order Placed", description: order.date },
              { label: "Processing", description: "Packed and ready to ship" },
              { label: "Shipped", description: "In transit" },
              { label: "Delivered" },
            ]}
          />
        </ContainerCard>
        <ContainerCard>
          <h3 className="mb-3 text-sm font-semibold text-text-primary">Summary</h3>
          <dl className="space-y-2.5 text-sm">
            <div className="flex justify-between"><dt className="text-text-muted">Customer</dt><dd>{order.customer}</dd></div>
            <div className="flex justify-between"><dt className="text-text-muted">Total</dt><dd>{order.total}</dd></div>
            <div className="flex justify-between items-center"><dt className="text-text-muted">Status</dt><dd><Badge variant="success">{order.status}</Badge></dd></div>
          </dl>
        </ContainerCard>
      </div>
    </div>
  );
}
