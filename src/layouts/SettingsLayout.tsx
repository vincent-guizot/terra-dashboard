import { NavLink, Outlet } from "react-router-dom";
import { PageHeader } from "@/components/layout/page-header";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "General", href: "/settings/general" },
  { label: "Security", href: "/settings/security" },
  { label: "Notifications", href: "/settings/notifications" },
  { label: "Billing", href: "/settings/billing" },
];

export function SettingsLayout() {
  return (
    <div>
      <PageHeader title="Settings" description="Manage your account and workspace preferences." />
      <div className="mb-6 flex items-center gap-1 border-b border-border-default">
        {tabs.map((tab) => (
          <NavLink
            key={tab.href}
            to={tab.href}
            className={({ isActive }) =>
              cn(
                "relative px-4 py-2.5 text-sm font-medium transition-colors",
                isActive ? "text-primary-700" : "text-text-muted hover:text-text-primary"
              )
            }
          >
            {({ isActive }) => (
              <>
                {tab.label}
                {isActive && <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary-700" />}
              </>
            )}
          </NavLink>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
