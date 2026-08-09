import type { ReactNode } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip as RTooltip,
} from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export interface ChartCardProps {
  title: string;
  description?: string;
  data: Record<string, number | string>[];
  dataKey: string;
  xKey?: string;
  type: "line" | "bar" | "area" | "donut";
  actions?: ReactNode;
  color?: string;
}

const DONUT_COLORS = ["#2a3f63", "#3d5a8a", "#6b8fc7", "#97add8", "#c3d1e8"];

export function ChartCard({ title, description, data, dataKey, xKey = "name", type, actions, color = "#2a3f63" }: ChartCardProps) {
  return (
    <Card>
      <CardHeader className="flex-row items-start justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {actions}
      </CardHeader>
      <CardContent>
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {type === "line" ? (
              <LineChart data={data}>
                <XAxis dataKey={xKey} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <RTooltip />
                <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={false} />
              </LineChart>
            ) : type === "bar" ? (
              <BarChart data={data}>
                <XAxis dataKey={xKey} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <RTooltip />
                <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
              </BarChart>
            ) : type === "area" ? (
              <AreaChart data={data}>
                <XAxis dataKey={xKey} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <RTooltip />
                <Area type="monotone" dataKey={dataKey} stroke={color} fill={color} fillOpacity={0.15} strokeWidth={2} />
              </AreaChart>
            ) : (
              <PieChart>
                <Pie data={data} dataKey={dataKey} nameKey={xKey} innerRadius={55} outerRadius={80} paddingAngle={2}>
                  {data.map((_, i) => (
                    <Cell key={i} fill={DONUT_COLORS[i % DONUT_COLORS.length]} />
                  ))}
                </Pie>
                <RTooltip />
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
