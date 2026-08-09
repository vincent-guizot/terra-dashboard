import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Step {
  label: string;
  description?: string;
}

export function Stepper({ steps, current }: { steps: Step[]; current: number }) {
  return (
    <div className="flex flex-col gap-0">
      {steps.map((step, i) => {
        const status = i < current ? "done" : i === current ? "active" : "upcoming";
        const last = i === steps.length - 1;
        return (
          <div key={i} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                  status === "done" && "bg-primary-700 text-white",
                  status === "active" && "border-2 border-primary-700 text-primary-700",
                  status === "upcoming" && "border border-border-strong text-text-muted"
                )}
              >
                {status === "done" ? <Check className="size-4" /> : i + 1}
              </div>
              {!last && <div className={cn("w-px flex-1 my-1", status === "done" ? "bg-primary-700" : "bg-border-default")} />}
            </div>
            <div className={cn("pb-6", last && "pb-0")}>
              <p className={cn("text-sm font-medium", status === "upcoming" ? "text-text-muted" : "text-text-primary")}>
                {step.label}
              </p>
              {step.description && <p className="text-xs text-text-muted">{step.description}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
