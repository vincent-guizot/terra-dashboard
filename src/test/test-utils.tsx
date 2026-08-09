import type { ReactElement } from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

/**
 * Render helper that wraps components needing router context
 * (Sidebar, NavigationItem, Breadcrumb, Link, etc use react-router hooks).
 */
export function renderWithRouter(ui: ReactElement, route = "/") {
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
}

export * from "@testing-library/react";
