import { ChartCard, type ChartCardProps } from "@/components/composite/chart-card";

export type AreaChartCardProps = Omit<ChartCardProps, "type">;

/** AreaChartCard — preset of ChartCard for cumulative/volume trends. */
export function AreaChartCard(props: AreaChartCardProps) {
  return <ChartCard {...props} type="area" />;
}
