import { useParams } from "react-router-dom";
import { Mail, Phone, Building2 } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { SplitLayout } from "@/components/layout/split-layout";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Divider } from "@/components/ui/divider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { StatCard } from "@/components/composite/stat-card";
import { ContentGrid } from "@/components/layout/content-grid";
import { EmptyState } from "@/components/ui/empty-state";
import { customers } from "@/lib/mock-data";

export function CustomerDetailPage() {
  const { id } = useParams();
  const customer = customers.find((c) => c.id === id) ?? customers[0];

  return (
    <div>
      <PageHeader
        title={customer.name}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Customers", href: "/customers" },
          { label: customer.name },
        ]}
      />

      <SplitLayout
        leftWidth="w-full lg:w-72"
        left={
          <div className="p-5">
            <div className="flex flex-col items-center text-center">
              <Avatar name={customer.name} size="lg" />
              <p className="mt-3 font-semibold text-text-primary">{customer.name}</p>
              <Badge variant="success" className="mt-1.5">
                {customer.status}
              </Badge>
            </div>
            <Divider className="my-4" />
            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-2 text-text-secondary">
                <Mail className="size-4 text-text-muted" /> {customer.email}
              </p>
              <p className="flex items-center gap-2 text-text-secondary">
                <Building2 className="size-4 text-text-muted" /> {customer.company}
              </p>
              <p className="flex items-center gap-2 text-text-secondary">
                <Phone className="size-4 text-text-muted" /> +1 (555) 012-3456
              </p>
            </div>
          </div>
        }
        right={
          <div className="p-5">
            <ContentGrid cols={3} gap="sm" className="mb-6">
              <StatCard label="Total Spent" value={customer.spent} />
              <StatCard label="Orders" value="14" />
              <StatCard label="Member Since" value={customer.joined} />
            </ContentGrid>
            <Tabs defaultValue="orders">
              <TabsList>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="invoices">Invoices</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>
              <TabsContent value="orders">
                <EmptyState title="No orders yet" description="Orders from this customer will appear here." />
              </TabsContent>
              <TabsContent value="invoices">
                <EmptyState title="No invoices yet" description="Invoices from this customer will appear here." />
              </TabsContent>
              <TabsContent value="notes">
                <EmptyState title="No notes yet" description="Internal notes about this customer will appear here." />
              </TabsContent>
            </Tabs>
          </div>
        }
        className="min-h-[500px] flex-col lg:flex-row"
      />
    </div>
  );
}
