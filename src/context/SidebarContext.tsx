import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface SidebarContextValue {
  collapsed: boolean;
  toggleCollapsed: () => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const SidebarContext = createContext<SidebarContextValue | undefined>(undefined);

/**
 * Tablet range per the breakpoint spec (768px-1023px). At this width the
 * sidebar should be shown collapsed by default ("Adaptive") rather than
 * hidden behind the mobile drawer or fully expanded like Desktop.
 */
const TABLET_QUERY = "(min-width: 768px) and (max-width: 1023.98px)";

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(TABLET_QUERY);

    // Apply the adaptive default whenever the viewport crosses into or
    // out of the tablet range: collapsed on entry, expanded again once
    // we reach Desktop. The manual toggle button still works freely
    // within either range after this runs.
    const applyForRange = (isTablet: boolean) => setCollapsed(isTablet);

    applyForRange(mql.matches);
    const listener = (e: MediaQueryListEvent) => applyForRange(e.matches);
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        collapsed,
        toggleCollapsed: () => setCollapsed((c) => !c),
        mobileOpen,
        setMobileOpen,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within a SidebarProvider");
  return ctx;
}
