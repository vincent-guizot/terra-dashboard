import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const sizeMap = {
  xs: "size-6 text-[10px]",
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-14 text-lg",
};

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  name?: string;
  size?: keyof typeof sizeMap;
  status?: "online" | "offline" | "away";
}

function initials(name?: string) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Avatar({ className, src, name, size = "md", status, ...props }: AvatarProps) {
  return (
    <div className={cn("relative inline-flex shrink-0", sizeMap[size])} {...props}>
      {src ? (
        <img
          src={src}
          alt={name ?? "avatar"}
          className={cn("size-full rounded-full object-cover", className)}
        />
      ) : (
        <div
          className={cn(
            "flex size-full items-center justify-center rounded-full bg-primary-100 font-semibold text-primary-700",
            className
          )}
        >
          {initials(name)}
        </div>
      )}
      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 block size-2.5 rounded-full ring-2 ring-surface",
            status === "online" && "bg-success-500",
            status === "away" && "bg-warning-500",
            status === "offline" && "bg-neutral-500"
          )}
        />
      )}
    </div>
  );
}

export { AvatarGroup } from "@/components/ui/avatar-group";
