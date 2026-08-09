import { Link as RouterLink, type LinkProps as RouterLinkProps } from "react-router-dom";
import { cn } from "@/lib/utils";

export interface LinkProps extends RouterLinkProps {
  underline?: boolean;
}

export function Link({ className, underline = true, ...props }: LinkProps) {
  return (
    <RouterLink
      className={cn(
        "text-primary-700 hover:text-primary-800",
        underline && "underline underline-offset-2",
        className
      )}
      {...props}
    />
  );
}
