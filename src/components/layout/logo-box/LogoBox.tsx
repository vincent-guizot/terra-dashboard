import { Hexagon } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export interface LogoBoxProps {
  /** "full" shows the mark + app name side by side. "icon" shows just the mark (e.g. collapsed sidebar). */
  variant?: "full" | "icon";
  size?: "sm" | "md" | "lg";
  /** "dark" for use on the navy sidebar/auth panel, "light" for use on white surfaces. */
  tone?: "dark" | "light";
  className?: string;
  textClassName?: string;
}

const markSizeMap = { sm: "size-5", md: "size-6", lg: "size-8" };
const textSizeMap = { sm: "text-xs", md: "text-sm", lg: "text-lg" };

/**
 * LogoBox — the single place the app's logo mark is rendered.
 *
 * Swapping in a company logo takes one edit: set `siteConfig.logo.src`
 * in `src/config/site.ts` to an image path. LogoBox then renders that
 * image everywhere (Sidebar, AuthLayout, anywhere else it's used)
 * instead of the default Hexagon icon mark — no component code needs
 * to change.
 */
export function LogoBox({
  variant = "full",
  size = "md",
  tone = "dark",
  className,
  textClassName,
}: LogoBoxProps) {
  const { logo, appName, appShortName } = siteConfig;
  const markSize = markSizeMap[size];
  const textSize = textSizeMap[size];
  const textTone = tone === "dark" ? "text-white" : "text-text-primary";

  return (
    <div className={cn("flex items-center gap-2 overflow-hidden", className)}>
      {logo.src ? (
        <img
          src={logo.src}
          alt={logo.alt}
          className={cn(markSize, "shrink-0 object-contain")}
        />
      ) : (
        <Hexagon
          className={cn(markSize, "shrink-0 fill-primary-500 text-primary-300")}
        />
      )}
      {variant === "full" && (
        <span
          className={cn(
            "truncate font-semibold",
            textSize,
            textTone,
            textClassName,
          )}
        >
          {size === "lg" ? appName : appShortName}
        </span>
      )}
    </div>
  );
}
