import { ChartCard, type ChartCardProps } from "@/components/composite/chart-card";

export type LineChartCardProps = Omit<ChartCardProps, "type">;

/** LineChartCard — preset of ChartCard for trend-over-time data. */
export function LineChartCard(props: LineChartCardProps) {
  return <ChartCard {...props} type="line" />;
}
