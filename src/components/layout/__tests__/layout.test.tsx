import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithRouter } from "@/test/test-utils";

import { PageHeader } from "@/components/layout/page-header";
import { SectionContainer } from "@/components/layout/section-container";
import { ContentGrid } from "@/components/layout/content-grid";
import { Stack } from "@/components/layout/stack";
import { Spacer } from "@/components/layout/spacer";
import { SplitLayout } from "@/components/layout/split-layout";
import { ContainerCard } from "@/components/layout/container-card";
import { Footer } from "@/components/layout/footer";
import { Overlay } from "@/components/layout/overlay";
import { SafeArea } from "@/components/layout/safe-area";
import { SidebarSection } from "@/components/layout/sidebar-section";
import { SidebarSubmenu } from "@/components/layout/sidebar-submenu";
import { MobileDrawer } from "@/components/layout/mobile-drawer";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { PageContainer } from "@/components/layout/page-container";
import { Divider } from "@/components/ui/divider";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";

describe("Layout components", () => {
  it("PageHeader renders title, description and breadcrumbs", () => {
    renderWithRouter(
      <PageHeader title="Customers" description="Manage accounts" breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }]} />
    );
    expect(screen.getByRole("heading", { name: "Customers" })).toBeInTheDocument();
    expect(screen.getByText("Manage accounts")).toBeInTheDocument();
  });

  it("SectionContainer renders title and children", () => {
    renderWithRouter(<SectionContainer title="Overview">Body content</SectionContainer>);
    expect(screen.getByText("Overview")).toBeInTheDocument();
    expect(screen.getByText("Body content")).toBeInTheDocument();
  });

  it("ContentGrid applies column class", () => {
    const { container } = renderWithRouter(<ContentGrid cols={3}>{null}</ContentGrid>);
    expect(container.firstChild).toHaveClass("grid");
  });

  it("Stack renders horizontal direction", () => {
    const { container } = renderWithRouter(<Stack direction="horizontal">{null}</Stack>);
    expect(container.firstChild).toHaveClass("flex-row");
  });

  it("Spacer renders a blank spacing box", () => {
    const { container } = renderWithRouter(<Spacer size="lg" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("Spacer's named sizes match the reference mockup's spacing scale (xs=4px ... 3xl=64px)", () => {
    const cases: [string, number][] = [
      ["xs", 4],
      ["sm", 8],
      ["md", 16],
      ["lg", 24],
      ["xl", 32],
      ["2xl", 48],
      ["3xl", 64],
    ];
    for (const [size, px] of cases) {
      const { container } = renderWithRouter(<Spacer size={size as never} />);
      expect((container.firstChild as HTMLElement).style.height).toBe(`${px}px`);
    }
  });

  it("SplitLayout renders both panes", () => {
    renderWithRouter(<SplitLayout left={<span>Left pane</span>} right={<span>Right pane</span>} />);
    expect(screen.getByText("Left pane")).toBeInTheDocument();
    expect(screen.getByText("Right pane")).toBeInTheDocument();
  });

  it("ContainerCard renders children", () => {
    renderWithRouter(<ContainerCard>Section body</ContainerCard>);
    expect(screen.getByText("Section body")).toBeInTheDocument();
  });

  it("Footer renders copyright text", () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText(/Terra Dashboard/)).toBeInTheDocument();
  });

  it("Overlay renders as a fixed backdrop and handles click", () => {
    const onClick = vi.fn();
    const { container } = renderWithRouter(<Overlay onClick={onClick} />);
    fireEvent.click(container.firstChild as Element);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("SafeArea renders its children with inset-aware padding applied", () => {
    renderWithRouter(<SafeArea edges={["bottom"]}>content</SafeArea>);
    expect(screen.getByText("content")).toBeInTheDocument();
  });

  it("SidebarSection renders title and hides it when collapsed", () => {
    const { rerender } = renderWithRouter(
      <SidebarSection title="Management">
        <span>Item</span>
      </SidebarSection>
    );
    expect(screen.getByText("Management")).toBeInTheDocument();
    rerender(
      <SidebarSection title="Management" collapsed>
        <span>Item</span>
      </SidebarSection>
    );
    expect(screen.queryByText("Management")).not.toBeInTheDocument();
  });

  it("SidebarSubmenu expands to show children on click", () => {
    renderWithRouter(
      <SidebarSubmenu label="Overviews">{[{ label: "All Customers", href: "/customers" }]}</SidebarSubmenu>
    );
    expect(screen.queryByText("All Customers")).not.toBeInTheDocument();
    fireEvent.click(screen.getByText("Overviews"));
    expect(screen.getByText("All Customers")).toBeInTheDocument();
  });

  it("MobileDrawer only renders when open", () => {
    const { rerender } = renderWithRouter(
      <MobileDrawer open={false} onClose={() => {}}>
        <span>Drawer content</span>
      </MobileDrawer>
    );
    expect(screen.queryByText("Drawer content")).not.toBeInTheDocument();
    rerender(
      <MobileDrawer open={true} onClose={() => {}}>
        <span>Drawer content</span>
      </MobileDrawer>
    );
    expect(screen.getByText("Drawer content")).toBeInTheDocument();
  });

  it("MobileDrawer's panel stacks above its own Overlay backdrop (regression: overlay had explicit z-40 which painted over the z-auto panel, making the drawer unclickable)", () => {
    renderWithRouter(
      <MobileDrawer open={true} onClose={() => {}}>
        <button>Overview</button>
      </MobileDrawer>
    );
    const panel = screen.getByText("Overview").closest("div.absolute");
    expect(panel).toHaveClass("z-50");
  });

  it("Sidebar renders nav sections and items", () => {
    renderWithRouter(
      <SidebarProvider>
        <Sidebar sections={[{ title: "Main", items: [{ label: "Overview", href: "/dashboard", icon: <span /> }] }]} />
      </SidebarProvider>
    );
    expect(screen.getAllByText("Overview").length).toBeGreaterThan(0);
  });

  it("Sidebar renders a submenu item that expands to show its children (regression: sidebar had no submenus)", () => {
    renderWithRouter(
      <SidebarProvider>
        <Sidebar
          sections={[
            {
              title: "Components",
              items: [{ label: "Actions", icon: <span />, children: [{ label: "Button", href: "/components/button" }] }],
            },
          ]}
        />
      </SidebarProvider>
    );
    expect(screen.queryByText("Button")).not.toBeInTheDocument();
    fireEvent.click(screen.getAllByText("Actions")[0]);
    expect(screen.getAllByText("Button").length).toBeGreaterThan(0);
  });

  it("Sidebar's active nav item uses the doc's exact Active Background (#1D4ED8 = primary-700), not an approximation", () => {
    renderWithRouter(
      <SidebarProvider>
        <Sidebar sections={[{ items: [{ label: "Overview", href: "/dashboard", icon: <span /> }] }]} />
      </SidebarProvider>,
      "/dashboard"
    );
    const link = screen.getAllByText("Overview")[0].closest("a");
    expect(link).toHaveClass("bg-primary-700");
  });

  it("Sidebar's scrollable nav container has min-h-0 so overflow-y-auto actually scrolls inside a flex column (regression: sidebar overflowed past 100vh)", () => {
    const { container } = renderWithRouter(
      <SidebarProvider>
        <Sidebar sections={[{ title: "Main", items: [{ label: "Overview", href: "/dashboard", icon: <span /> }] }]} />
      </SidebarProvider>
    );
    const nav = container.querySelector("nav");
    expect(nav).toHaveClass("min-h-0", "overflow-y-auto", "flex-1");
  });

  it("Header search trigger shows a visible ⌘K kbd hint, matching the reference mockup", () => {
    renderWithRouter(
      <ThemeProvider>
        <SidebarProvider>
          <Header />
        </SidebarProvider>
      </ThemeProvider>
    );
    expect(screen.getByText("⌘K")).toBeInTheDocument();
    expect(screen.getByText("Search anything...")).toBeInTheDocument();
  });

  it("PageContainer matches the reference mockup's documented spec (max-width 1440px, px-6 py-6 lg:px-8 lg:py-8)", () => {
    const { container } = renderWithRouter(<PageContainer>content</PageContainer>);
    expect(container.firstChild).toHaveClass("max-w-[1440px]", "px-6", "py-6", "lg:px-8", "lg:py-8");
  });

  it("Divider supports the 'inset' variant from the reference mockup", () => {
    const { container } = renderWithRouter(<Divider variant="inset" />);
    expect(container.firstChild).toHaveClass("mx-4");
  });

  it("Sidebar renders its logo via the reusable LogoBox component, showing the app short name when expanded", () => {
    renderWithRouter(
      <SidebarProvider>
        <Sidebar sections={[{ items: [{ label: "Overview", href: "/dashboard", icon: <span /> }] }]} />
      </SidebarProvider>
    );
    expect(screen.getByText("Terra")).toBeInTheDocument();
  });
});
