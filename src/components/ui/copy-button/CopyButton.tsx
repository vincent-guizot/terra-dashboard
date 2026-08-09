import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function CopyButton({ value, className }: { value: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className={cn(
        "inline-flex items-center justify-center rounded-md p-1.5 text-text-muted hover:bg-surface-elevated hover:text-text-primary",
        className
      )}
      aria-label="Copy"
    >
      {copied ? <Check className="size-4 text-success-500" /> : <Copy className="size-4" />}
    </button>
  );
}
