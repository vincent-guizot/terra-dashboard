import { Outlet } from "react-router-dom";

export function BlankLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-sunken p-6">
      <Outlet />
    </div>
  );
}
