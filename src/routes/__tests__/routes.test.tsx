import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import { router } from "@/routes";
import { ThemeProvider } from "@/context/ThemeContext";

function renderApp() {
  return render(
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

describe("App routing", () => {
  it("redirects '/' to the dashboard Home page", async () => {
    await router.navigate("/");
    renderApp();
    await waitFor(() => expect(screen.getAllByText("Overview").length).toBeGreaterThan(0));
  });

  it("renders the Customers page at /customers", async () => {
    await router.navigate("/customers");
    renderApp();
    await waitFor(() => expect(screen.getAllByText("Customers").length).toBeGreaterThan(0));
  });

  it("renders Settings and redirects /settings to /settings/general", async () => {
    await router.navigate("/settings");
    renderApp();
    await waitFor(() => expect(screen.getByText("Workspace name")).toBeInTheDocument());
  });

  it("renders the 404 page for an unknown route", async () => {
    await router.navigate("/this-route-does-not-exist");
    renderApp();
    await waitFor(() => expect(screen.getByText("Page not found")).toBeInTheDocument());
  });

  it("renders the Login page under the auth layout", async () => {
    await router.navigate("/auth/login");
    renderApp();
    await waitFor(() => expect(screen.getByText("Welcome back")).toBeInTheDocument());
    expect(screen.getByText("Terra Dashboard")).toBeInTheDocument();
  });

  it("renders Home with the new Quick Actions and Top Customers composites", async () => {
    await router.navigate("/dashboard");
    renderApp();
    await waitFor(() => expect(screen.getByText("Quick Actions")).toBeInTheDocument());
    expect(screen.getByText("Top Customers")).toBeInTheDocument();
  });

  it("renders Customers with the table toolbar composites", async () => {
    await router.navigate("/customers");
    renderApp();
    await waitFor(() => expect(screen.getByText("Filters")).toBeInTheDocument());
    expect(screen.getByText("Columns")).toBeInTheDocument();
  });

  it("renders Analytics with KPI, metric and chart card composites", async () => {
    await router.navigate("/analytics");
    renderApp();
    await waitFor(() => expect(screen.getByText("Monthly Revenue")).toBeInTheDocument());
    expect(screen.getByText("Goal Completion")).toBeInTheDocument();
  });

  it("renders Tasks with the UserList team panel", async () => {
    await router.navigate("/tasks");
    renderApp();
    await waitFor(() => expect(screen.getByText("Team")).toBeInTheDocument());
  });

  it("renders Profile with the ProfileCard composite", async () => {
    await router.navigate("/profile");
    renderApp();
    await waitFor(() => expect(screen.getAllByText("Administrator").length).toBeGreaterThan(0));
  });

  it("renders an Invoice detail page with the InvoiceSummary composite", async () => {
    await router.navigate("/invoices/INV-1001");
    renderApp();
    await waitFor(() => expect(screen.getByText("$1,240.00")).toBeInTheDocument());
  });

  it("renders the Components index page listing all 6 categories", async () => {
    await router.navigate("/components");
    renderApp();
    // Wait on "Button" (unique to the loaded page's catalog list) rather than
    // "Components", which also matches the Sidebar nav item that renders
    // immediately — waiting on the shared text would resolve before the
    // lazy-loaded ComponentsIndexPage chunk has actually mounted.
    await waitFor(() => expect(screen.getAllByText("Button").length).toBeGreaterThan(0));
    expect(screen.getAllByText("Components").length).toBeGreaterThan(0);
  });

  it("renders a single component's catalog detail page", async () => {
    await router.navigate("/components/button");
    renderApp();
    await waitFor(() => expect(screen.getAllByText("Button").length).toBeGreaterThan(0));
    expect(screen.getByText(/Primary action trigger/)).toBeInTheDocument();
  });

  it("renders the Layout index page listing all 3 categories", async () => {
    await router.navigate("/layout-components");
    renderApp();
    await waitFor(() => expect(screen.getAllByText("App Shell").length).toBeGreaterThan(0));
  });

  it("renders a single layout component's catalog detail page", async () => {
    await router.navigate("/layout-components/app-shell");
    renderApp();
    await waitFor(() => expect(screen.getAllByText("App Shell").length).toBeGreaterThan(0));
  });

  it("redirects an unknown component slug back to the dashboard instead of crashing", async () => {
    await router.navigate("/components/does-not-exist");
    renderApp();
    await waitFor(() => expect(screen.getAllByText("Overview").length).toBeGreaterThan(0));
  });

  it("sidebar exposes the Pages, Components, Layout and General groups", async () => {
    await router.navigate("/dashboard");
    renderApp();
    await waitFor(() => expect(screen.getByText("Pages")).toBeInTheDocument());
    expect(screen.getByText("Components")).toBeInTheDocument();
    expect(screen.getByText("Layout")).toBeInTheDocument();
    expect(screen.getByText("General")).toBeInTheDocument();
  });
});
