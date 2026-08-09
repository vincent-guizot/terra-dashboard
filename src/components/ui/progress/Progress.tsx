import { cn } from "@/lib/utils";

export interface ProgressProps {
  value: number;
  label?: string;
  showValue?: boolean;
  className?: string;
}

export function Progress({ value, label, showValue = true, className }: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="mb-1.5 flex items-center justify-between text-xs text-text-secondary">
          <span>{label}</span>
          {showValue && <span>{clamped}%</span>}
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-surface-elevated">
        <div
          className="h-full rounded-full bg-primary-700 transition-[width] duration-300 ease-terra"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}

export function CircularProgress({ value, size = 64 }: { value: number; size?: number }) {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(100, value) / 100) * circumference;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} strokeWidth={6} className="stroke-surface-elevated fill-none" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={6}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="fill-none stroke-primary-700 transition-[stroke-dashoffset] duration-300 ease-terra"
      />
      <text
        x="50%"
        y="50%"
        className="rotate-90 fill-text-primary text-sm font-semibold"
        textAnchor="middle"
        dominantBaseline="middle"
        transform={`rotate(90 ${size / 2} ${size / 2})`}
      >
        {value}%
      </text>
    </svg>
  );
}
