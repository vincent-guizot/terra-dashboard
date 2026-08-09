import { Outlet } from "react-router-dom";
import { siteConfig } from "@/config/site";
import { LogoBox } from "@/components/layout/logo-box";

export function AuthLayout() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 flex-col justify-between bg-primary-950 p-10 text-white lg:flex">
        <LogoBox size="lg" tone="dark" />
        <div>
          <p className="max-w-md text-3xl font-semibold leading-tight">{siteConfig.tagline}</p>
          <p className="mt-3 max-w-sm text-sm text-primary-200/70">{siteConfig.description}</p>
        </div>
        <p className="text-xs text-primary-300/50">{siteConfig.footer.copyright}</p>
      </div>
      <div className="flex w-full flex-col items-center justify-center bg-surface-sunken p-6 lg:w-1/2">
        <div className="w-full max-w-sm">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
