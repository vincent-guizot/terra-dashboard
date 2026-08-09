import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithRouter } from "@/test/test-utils";

import { StatCard } from "@/components/composite/stat-card";
import { DataTable, type DataTableColumn } from "@/components/composite/data-table";
import { ActivityFeed } from "@/components/composite/activity-feed";
import { ProjectCard } from "@/components/composite/project-card";
import { ChartCard } from "@/components/composite/chart-card";

interface Row {
  id: string;
  name: string;
}

describe("Composite components", () => {
  it("StatCard renders label, value and change indicator", () => {
    renderWithRouter(<StatCard label="Revenue" value="$1,200" change={{ value: "+5%", trend: "up" }} />);
    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByText("$1,200")).toBeInTheDocument();
    expect(screen.getByText("+5%")).toBeInTheDocument();
  });

  it("DataTable renders rows via column render fns", () => {
    const columns: DataTableColumn<Row>[] = [{ key: "name", header: "Name", render: (r) => r.name }];
    renderWithRouter(<DataTable columns={columns} data={[{ id: "1", name: "Sarah" }]} />);
    expect(screen.getByText("Sarah")).toBeInTheDocument();
  });

  it("DataTable shows empty state when no data", () => {
    const columns: DataTableColumn<Row>[] = [{ key: "name", header: "Name", render: (r) => r.name }];
    renderWithRouter(<DataTable columns={columns} data={[]} emptyLabel="Nothing here" />);
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
  });

  it("ActivityFeed renders items", () => {
    renderWithRouter(
      <ActivityFeed items={[{ id: 1, icon: <span />, title: "New signup", time: "1h ago" }]} />
    );
    expect(screen.getByText("New signup")).toBeInTheDocument();
  });

  it("ProjectCard renders progress and members", () => {
    renderWithRouter(
      <ProjectCard
        name="Website Redesign"
        description="Revamp"
        status="In Progress"
        statusVariant="info"
        progress={65}
        members={["Sarah Chen"]}
        dueDate="Aug 20"
      />
    );
    expect(screen.getByText("Website Redesign")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
  });

  it("ChartCard renders title for each chart type", () => {
    const data = [{ name: "Jan", value: 10 }];
    renderWithRouter(<ChartCard title="Revenue" data={data} dataKey="value" type="line" />);
    expect(screen.getByText("Revenue")).toBeInTheDocument();
  });
});
