import { DollarSign, Users, ShoppingCart, TrendingUp, UserPlus, PackageCheck, CreditCard, FilePlus, Send, UserCog, Download } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { ContentGrid } from "@/components/layout/content-grid";
import { Stack } from "@/components/layout/stack";
import { StatCard } from "@/components/composite/stat-card";
import { ChartCard } from "@/components/composite/chart-card";
import { ActivityFeed } from "@/components/composite/activity-feed";
import { QuickActions } from "@/components/composite/quick-actions";
import { MetricComparison } from "@/components/composite/metric-comparison";
import { CustomerCard } from "@/components/composite/customer-card";
import { Button } from "@/components/ui/button";
import { revenueData, trafficSourceData, customers } from "@/lib/mock-data";
import { useNavigate } from "react-router-dom";

const activity = [
  { id: 1, icon: <UserPlus className="size-3.5" />, title: "New customer signed up", description: "Priya Nair joined Shiplane", time: "2 hours ago" },
  { id: 2, icon: <PackageCheck className="size-3.5" />, title: "Order #3023 fulfilled", description: "Shipped to Aiko Tanaka", time: "5 hours ago" },
  { id: 3, icon: <CreditCard className="size-3.5" />, title: "Invoice INV-1001 paid", description: "Acme Co — $1,240.00", time: "Yesterday" },
];

const quickActions = [
  { label: "New Invoice", icon: <FilePlus className="size-4" /> },
  { label: "Send Report", icon: <Send className="size-4" /> },
  { label: "Invite Member", icon: <UserCog className="size-4" /> },
  { label: "Export Data", icon: <Download className="size-4" /> },
];

const statusVariant = { Active: "success", Inactive: "neutral", Pending: "warning" } as const;

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <PageHeader
        title="Overview"
        description="Welcome back, here's what's happening across your workspace."
        actions={<Button>Create Report</Button>}
      />

      <ContentGrid cols={4} className="mb-6">
        <StatCard label="Total Revenue" value="$48,240" icon={<DollarSign className="size-5" />} change={{ value: "+12.5%", trend: "up" }} />
        <StatCard label="Active Customers" value="2,340" icon={<Users className="size-5" />} change={{ value: "+4.2%", trend: "up" }} />
        <StatCard label="Orders This Month" value="812" icon={<ShoppingCart className="size-5" />} change={{ value: "-1.8%", trend: "down" }} />
        <StatCard label="Conversion Rate" value="3.4%" icon={<TrendingUp className="size-5" />} change={{ value: "+0.6%", trend: "up" }} />
      </ContentGrid>

      <Stack direction="horizontal" gap={6} className="flex-col lg:flex-row items-stretch">
        <div className="w-full lg:w-2/3">
          <ChartCard title="Revenue" description="Monthly revenue for the last 7 months" data={revenueData} dataKey="value" type="area" />
        </div>
        <div className="w-full lg:w-1/3">
          <ChartCard title="Traffic Sources" description="Where visitors come from" data={trafficSourceData} dataKey="value" type="donut" />
        </div>
      </Stack>

      <ContentGrid cols={3} className="mt-6">
        <MetricComparison
          label="New Signups"
          current={{ period: "This week", value: "128" }}
          previous={{ period: "Last week", value: "104" }}
          delta="+23%"
          trend="up"
        />
        <MetricComparison
          label="Churn Rate"
          current={{ period: "This week", value: "1.8%" }}
          previous={{ period: "Last week", value: "2.4%" }}
          delta="-0.6pp"
          trend="up"
        />
        <div className="sm:col-span-2 lg:col-span-1">
          <QuickActions actions={quickActions} />
        </div>
      </ContentGrid>

      <div className="mt-6">
        <p className="mb-3 text-sm font-semibold text-text-primary">Top Customers</p>
        <ContentGrid cols={3}>
          {customers.slice(0, 3).map((c) => (
            <CustomerCard
              key={c.id}
              name={c.name}
              email={c.email}
              company={c.company}
              status={c.status}
              statusVariant={statusVariant[c.status]}
              spent={c.spent}
              onClick={() => navigate(`/customers/${c.id}`)}
            />
          ))}
        </ContentGrid>
      </div>

      <div className="mt-6">
        <ActivityFeed items={activity} />
      </div>
    </div>
  );
}
