import { Outlet } from "react-router-dom";
import { AppShell } from "@/components/layout/app-shell";
import { PageContainer } from "@/components/layout/page-container";
import { SidebarProvider } from "@/context/SidebarContext";

export function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppShell>
        <PageContainer>
          <Outlet />
        </PageContainer>
      </AppShell>
    </SidebarProvider>
  );
}
