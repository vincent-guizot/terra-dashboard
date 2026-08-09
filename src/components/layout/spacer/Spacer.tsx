export type SpacerSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

/**
 * Spacer — a fixed-size blank box for manual spacing between elements
 * when gap utilities on a parent Stack aren't available or convenient
 * (e.g. spacing inside a non-flex container).
 *
 * Sizes match the Terra spacing utility scale from the reference
 * design system: xs=4px, sm=8px, md=16px, lg=24px, xl=32px, 2xl=48px,
 * 3xl=64px.
 */
const sizeMap: Record<SpacerSize, number> = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  "2xl": 48,
  "3xl": 64,
};

export function Spacer({ size = "md", axis = "vertical" }: { size?: SpacerSize; axis?: "vertical" | "horizontal" }) {
  const px = sizeMap[size];
  return (
    <div
      aria-hidden
      style={axis === "vertical" ? { height: px, width: 1 } : { width: px, height: 1 }}
    />
  );
}
