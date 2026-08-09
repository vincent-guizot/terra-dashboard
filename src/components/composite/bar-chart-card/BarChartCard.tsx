import { ChartCard, type ChartCardProps } from "@/components/composite/chart-card";

export type BarChartCardProps = Omit<ChartCardProps, "type">;

/** BarChartCard — preset of ChartCard for categorical comparisons. */
export function BarChartCard(props: BarChartCardProps) {
  return <ChartCard {...props} type="bar" />;
}
