import {
  Bell,
  Menu,
  MessageSquare,
  Moon,
  Sun,
  Monitor,
  Search,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Kbd } from "@/components/ui/kbd";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { IconButton } from "@/components/ui/icon-button";
import { useSidebar } from "@/context/SidebarContext";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

export function Header({
  onOpenCommandMenu,
}: {
  onOpenCommandMenu?: () => void;
}) {
  const { setMobileOpen } = useSidebar();
  const { theme, setTheme } = useTheme();

  const themeIcons = { light: Sun, dark: Moon, system: Monitor };
  const ThemeIcon = themeIcons[theme];

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border-default bg-surface/90 px-4 backdrop-blur md:px-6">
      <button
        onClick={() => setMobileOpen(true)}
        className="text-text-secondary hover:text-text-primary md:hidden"
        aria-label="Open menu"
      >
        <Menu className="size-5" />
      </button>

      <div className="hidden max-w-sm flex-1 lg:block">
        <button
          onClick={onOpenCommandMenu}
          className="flex h-9 w-full items-center gap-2 rounded-md border border-border-strong bg-surface px-3 text-sm text-text-muted hover:border-primary-300"
        >
          <Search className="size-4 shrink-0" />
          <span className="flex-1 text-left">Search anything...</span>
          <Kbd className="shrink-0">⌘K</Kbd>
        </button>
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        <DropdownMenu
          align="end"
          trigger={
            <IconButton
              variant="ghost"
              icon={<ThemeIcon className="size-4" />}
              aria-label="Toggle theme"
            />
          }
          items={[
            {
              label: "Light",
              icon: <Sun className="size-4" />,
              onClick: () => setTheme("light"),
            },
            {
              label: "Dark",
              icon: <Moon className="size-4" />,
              onClick: () => setTheme("dark"),
            },
            {
              label: "System",
              icon: <Monitor className="size-4" />,
              onClick: () => setTheme("system"),
            },
          ]}
        />
        <IconButton
          variant="ghost"
          icon={
            <span className="relative">
              <Bell className="size-4" />
              <span
                className={cn(
                  "absolute -right-0.5 -top-0.5 size-2 rounded-full bg-danger-500",
                )}
              />
            </span>
          }
          aria-label="Notifications"
        />
        <IconButton
          variant="ghost"
          icon={<MessageSquare className="size-4" />}
          aria-label="Messages"
        />
        <div className="ml-1 hidden items-center gap-2 border-l border-border-default pl-3 sm:flex">
          <Avatar name="Vincent G." size="sm" />
          <div className="hidden text-left lg:block">
            <p className="text-sm font-medium leading-tight text-text-primary">
              Vincent G.
            </p>
            <p className="text-xs leading-tight text-text-muted">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
