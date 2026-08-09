import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { ContentGrid } from "@/components/layout/content-grid";
import { LineChartCard } from "@/components/composite/line-chart-card";
import { BarChartCard } from "@/components/composite/bar-chart-card";
import { AreaChartCard } from "@/components/composite/area-chart-card";
import { DonutChartCard } from "@/components/composite/donut-chart-card";
import { ProgressChartCard } from "@/components/composite/progress-chart-card";
import { KpiCard } from "@/components/composite/kpi-card";
import { MetricCard } from "@/components/composite/metric-card";
import { DatePicker } from "@/components/ui/date-picker";
import { Target } from "lucide-react";
import { revenueData, trafficSourceData, orderVolumeData } from "@/lib/mock-data";

export function AnalyticsPage() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <div>
      <PageHeader
        title="Analytics"
        description="Deep dive into performance across your business."
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Analytics" }]}
        actions={<DatePicker value={date} onChange={setDate} placeholder="Select range" />}
      />

      <ContentGrid cols={4} className="mb-6">
        <KpiCard label="Monthly Revenue" value="$48.2k" target="$60k" progress={80} icon={<Target className="size-5" />} />
        <MetricCard label="Avg. Order Value" value="$68.40" />
        <MetricCard label="Sessions" value="24,102" />
        <MetricCard label="Bounce Rate" value="34.2%" />
      </ContentGrid>

      <ContentGrid cols={2} className="mb-6">
        <LineChartCard title="Revenue Trend" description="Last 7 months" data={revenueData} dataKey="value" />
        <BarChartCard title="Order Volume" description="This week" data={orderVolumeData} dataKey="value" color="#3d5a8a" />
        <AreaChartCard title="Growth" description="Cumulative revenue" data={revenueData} dataKey="value" />
        <DonutChartCard title="Traffic Sources" description="Acquisition breakdown" data={trafficSourceData} dataKey="value" />
      </ContentGrid>

      <ProgressChartCard
        title="Goal Completion"
        description="Progress toward this quarter's targets"
        entries={[
          { label: "Revenue goal", value: 80 },
          { label: "New customers goal", value: 62 },
          { label: "Retention goal", value: 91 },
        ]}
      />
    </div>
  );
}
