import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithRouter } from "@/test/test-utils";

import { KpiCard } from "@/components/composite/kpi-card";
import { MetricCard } from "@/components/composite/metric-card";
import { MetricComparison } from "@/components/composite/metric-comparison";
import { ActivityTimeline } from "@/components/composite/activity-timeline";
import { QuickActions } from "@/components/composite/quick-actions";
import { TableToolbar } from "@/components/composite/table-toolbar";
import { TableFilter } from "@/components/composite/table-filter";
import { TableColumnManager } from "@/components/composite/table-column-manager";
import { TableBulkActions } from "@/components/composite/table-bulk-actions";
import { ListCard } from "@/components/composite/list-card";
import { UserList } from "@/components/composite/user-list";
import { LineChartCard } from "@/components/composite/line-chart-card";
import { BarChartCard } from "@/components/composite/bar-chart-card";
import { AreaChartCard } from "@/components/composite/area-chart-card";
import { DonutChartCard } from "@/components/composite/donut-chart-card";
import { ProgressChartCard } from "@/components/composite/progress-chart-card";
import { ProfileCard } from "@/components/composite/profile-card";
import { CustomerCard } from "@/components/composite/customer-card";
import { InvoiceSummary } from "@/components/composite/invoice-summary";

describe("Composite components (extended, 19 newly added)", () => {
  it("KpiCard renders value, target and progress note", () => {
    renderWithRouter(<KpiCard label="Revenue" value="$48k" target="$60k" progress={80} />);
    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByText("$48k")).toBeInTheDocument();
    expect(screen.getByText("80% of target")).toBeInTheDocument();
  });

  it("MetricCard renders label and value", () => {
    renderWithRouter(<MetricCard label="Sessions" value="24,102" />);
    expect(screen.getByText("Sessions")).toBeInTheDocument();
    expect(screen.getByText("24,102")).toBeInTheDocument();
  });

  it("MetricComparison renders current, previous and delta", () => {
    renderWithRouter(
      <MetricComparison
        label="Signups"
        current={{ period: "This week", value: "128" }}
        previous={{ period: "Last week", value: "104" }}
        delta="+23%"
        trend="up"
      />
    );
    expect(screen.getByText("128")).toBeInTheDocument();
    expect(screen.getByText("+23%")).toBeInTheDocument();
  });

  it("ActivityTimeline renders every entry title", () => {
    renderWithRouter(
      <ActivityTimeline
        entries={[
          { title: "Design review approved", tone: "success" },
          { title: "New comment from Marco" },
        ]}
      />
    );
    expect(screen.getByText("Design review approved")).toBeInTheDocument();
    expect(screen.getByText("New comment from Marco")).toBeInTheDocument();
  });

  it("QuickActions fires the right action's onClick", () => {
    const onClick = vi.fn();
    renderWithRouter(<QuickActions actions={[{ label: "New Invoice", icon: <span />, onClick }]} />);
    fireEvent.click(screen.getByText("New Invoice"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("TableToolbar fires onSearchChange as the user types", () => {
    const onSearchChange = vi.fn();
    renderWithRouter(<TableToolbar searchPlaceholder="Search customers..." onSearchChange={onSearchChange} />);
    fireEvent.change(screen.getByPlaceholderText("Search customers..."), { target: { value: "sarah" } });
    expect(onSearchChange).toHaveBeenCalledWith("sarah");
  });

  it("TableFilter opens and updates a field value", () => {
    const onChange = vi.fn();
    renderWithRouter(
      <TableFilter
        fields={[{ key: "status", label: "Status", value: "all", onChange, options: [{ label: "All", value: "all" }, { label: "Active", value: "active" }] }]}
      />
    );
    fireEvent.click(screen.getByText("Filters"));
    fireEvent.change(screen.getByLabelText("Status"), { target: { value: "active" } });
    expect(onChange).toHaveBeenCalledWith("active");
  });

  it("TableColumnManager toggles a column via checkbox", () => {
    const onToggle = vi.fn();
    renderWithRouter(<TableColumnManager columns={[{ key: "company", label: "Company", visible: true }]} onToggle={onToggle} />);
    fireEvent.click(screen.getByText("Columns"));
    fireEvent.click(screen.getByLabelText("Company"));
    expect(onToggle).toHaveBeenCalledWith("company");
  });

  it("TableBulkActions hides itself when count is 0 and shows when selected", () => {
    const { rerender, container } = renderWithRouter(
      <TableBulkActions count={0} onClear={() => {}} actions={<button>Export</button>} />
    );
    expect(container.firstChild).toBeNull();
    rerender(<TableBulkActions count={3} onClear={() => {}} actions={<button>Export</button>} />);
    expect(screen.getByText("3 selected")).toBeInTheDocument();
  });

  it("ListCard renders each item's title and subtitle", () => {
    renderWithRouter(<ListCard title="Files" items={[{ id: 1, title: "spec.pdf", subtitle: "2.4 MB" }]} />);
    expect(screen.getByText("spec.pdf")).toBeInTheDocument();
    expect(screen.getByText("2.4 MB")).toBeInTheDocument();
  });

  it("UserList renders each user's name and role", () => {
    renderWithRouter(<UserList users={[{ id: 1, name: "Sarah Chen", role: "Designer", status: "online" }]} />);
    expect(screen.getByText("Sarah Chen")).toBeInTheDocument();
    expect(screen.getByText("Designer")).toBeInTheDocument();
  });

  it("LineChartCard / BarChartCard / AreaChartCard / DonutChartCard render their titles", () => {
    const data = [{ name: "Jan", value: 10 }];
    renderWithRouter(<LineChartCard title="Line" data={data} dataKey="value" />);
    renderWithRouter(<BarChartCard title="Bar" data={data} dataKey="value" />);
    renderWithRouter(<AreaChartCard title="Area" data={data} dataKey="value" />);
    renderWithRouter(<DonutChartCard title="Donut" data={data} dataKey="value" />);
    expect(screen.getByText("Line")).toBeInTheDocument();
    expect(screen.getByText("Bar")).toBeInTheDocument();
    expect(screen.getByText("Area")).toBeInTheDocument();
    expect(screen.getByText("Donut")).toBeInTheDocument();
  });

  it("ProgressChartCard renders one Progress row per entry", () => {
    renderWithRouter(
      <ProgressChartCard title="Goals" entries={[{ label: "Revenue goal", value: 80 }, { label: "Retention goal", value: 91 }]} />
    );
    expect(screen.getByText("Revenue goal")).toBeInTheDocument();
    expect(screen.getByText("Retention goal")).toBeInTheDocument();
  });

  it("ProfileCard renders name, role and stats", () => {
    renderWithRouter(
      <ProfileCard name="Vincent G." role="Administrator" stats={[{ label: "Projects", value: "12" }]} />
    );
    expect(screen.getByText("Vincent G.")).toBeInTheDocument();
    expect(screen.getByText("Administrator")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
  });

  it("CustomerCard renders and fires onClick", () => {
    const onClick = vi.fn();
    renderWithRouter(
      <CustomerCard name="Sarah Chen" email="sarah@acme.co" company="Acme Co" status="Active" statusVariant="success" spent="$4,230" onClick={onClick} />
    );
    fireEvent.click(screen.getByText("Sarah Chen"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("InvoiceSummary renders id, amount and status", () => {
    renderWithRouter(
      <InvoiceSummary invoiceId="INV-1001" customer="Acme Co" issued="Jul 20, 2026" due="Aug 20, 2026" amount="$1,240.00" status="Paid" statusVariant="success" />
    );
    expect(screen.getByText("INV-1001")).toBeInTheDocument();
    expect(screen.getByText("$1,240.00")).toBeInTheDocument();
    expect(screen.getByText("Paid")).toBeInTheDocument();
  });
});
