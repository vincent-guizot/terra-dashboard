import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { SidebarProvider, useSidebar } from "@/context/SidebarContext";

function Probe() {
  const { collapsed } = useSidebar();
  return <span>{collapsed ? "collapsed" : "expanded"}</span>;
}

function mockMatchMedia(initialMatches: boolean) {
  let listener: ((e: MediaQueryListEvent) => void) | null = null;
  const mql = {
    matches: initialMatches,
    media: "",
    addEventListener: (_: string, cb: (e: MediaQueryListEvent) => void) => {
      listener = cb;
    },
    removeEventListener: () => {
      listener = null;
    },
  };
  window.matchMedia = vi.fn().mockReturnValue(mql);
  return {
    fireChange: (matches: boolean) => {
      mql.matches = matches;
      act(() => listener?.({ matches } as MediaQueryListEvent));
    },
  };
}

describe("SidebarContext tablet auto-collapse", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("starts collapsed when the viewport is already in the tablet range on mount", () => {
    mockMatchMedia(true);
    render(
      <SidebarProvider>
        <Probe />
      </SidebarProvider>
    );
    expect(screen.getByText("collapsed")).toBeInTheDocument();
  });

  it("starts expanded when the viewport is desktop-width on mount", () => {
    mockMatchMedia(false);
    render(
      <SidebarProvider>
        <Probe />
      </SidebarProvider>
    );
    expect(screen.getByText("expanded")).toBeInTheDocument();
  });

  it("collapses automatically when resizing into the tablet range, and expands again when leaving it", () => {
    const { fireChange } = mockMatchMedia(false);
    render(
      <SidebarProvider>
        <Probe />
      </SidebarProvider>
    );
    expect(screen.getByText("expanded")).toBeInTheDocument();

    fireChange(true);
    expect(screen.getByText("collapsed")).toBeInTheDocument();

    fireChange(false);
    expect(screen.getByText("expanded")).toBeInTheDocument();
  });
});
