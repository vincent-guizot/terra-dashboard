import { ChartCard, type ChartCardProps } from "@/components/composite/chart-card";

export type DonutChartCardProps = Omit<ChartCardProps, "type">;

/** DonutChartCard — preset of ChartCard for part-to-whole breakdowns. */
export function DonutChartCard(props: DonutChartCardProps) {
  return <ChartCard {...props} type="donut" />;
}
