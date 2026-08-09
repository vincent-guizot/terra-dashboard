import type { ReactNode } from "react";

/**
 * Standalone AvatarGroup — stacks a set of Avatar elements with overlap
 * and collapses overflow into a "+N" indicator. Kept as its own atomic
 * component (separate from Avatar) since it composes multiple avatars
 * rather than rendering a single one.
 */
export function AvatarGroup({ children, max = 4 }: { children: ReactNode[]; max?: number }) {
  const visible = children.slice(0, max);
  const remaining = children.length - visible.length;
  return (
    <div className="flex -space-x-2">
      {visible.map((child, i) => (
        <div key={i} className="rounded-full ring-2 ring-surface">
          {child}
        </div>
      ))}
      {remaining > 0 && (
        <div className="flex size-10 items-center justify-center rounded-full bg-surface-elevated text-xs font-medium text-text-secondary ring-2 ring-surface">
          +{remaining}
        </div>
      )}
    </div>
  );
}
